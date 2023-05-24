import { Store } from '@/utils/Store';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import DropDownItems  from './DropDownItems';

 const Layout = ({title, children}) => {
  const {status, data:session}= useSession();
  const {state, dispatch} = useContext(Store);
  console.log("state::-",state)
  const {cart} = state;
  const [cartItemCount, setCartItemCount] = useState(0);
  console.log("cartItems", cart)
  useEffect(()=>{
  setCartItemCount(cart.cartItems.reduce((a,c) => a + c.quantity, 0))
  }, [cart.cartItems])

  const logOutHandller =()=>{
    Cookies.remove('cart');
    dispatch({type: 'CART_RESET'});
    signOut({callbackUrl: '/login'});

  }

return (
<>
<div>
    <Head>
        <title>{title? title : 'Home Page '}</title>            
    </Head>
       <ToastContainer className='h-5 w-5' position='bottom-center' limit={1}/>
    <div className='flex min-h-screen flex-col justify-between text-lg'>
        <header>
       
          <nav className='flex h-15 justify-between shadow-md'>
            <Link href='/' className='font-serif p-2'>E-Commerece</Link>
          <div className=' flex justify-between px-7 py-2'>
            
              { status ===  'loading' ? ('loading')  : session?.user ? 
              (
                //session.user.name
                <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-blue-600">  { session.user.name} </Menu.Button>
                 
                   <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white">
                
                     <Menu.Item> 
                      <DropDownItems className="dropdown-link" href='/profile'>
                        Profile
                        </DropDownItems>                       
                         </Menu.Item>

                         <Menu.Item> 
                      <DropDownItems className="dropdown-link" href='/order'>
                        Order History
                        </DropDownItems>                       
                         </Menu.Item>

                         <Menu.Item> 
                      <DropDownItems className="dropdown-link" href='#' onClick={logOutHandller}>
                        Log Out
                        </DropDownItems>                       
                         </Menu.Item>
                   
                   
                      </Menu.Items>
                </Menu>
                ) 
              : (<Link className='p-2' href='/login'>Login</Link>)}
              
                <Link className='p-2' href='/Cart'>Cart
            {
              cartItemCount > 0 &&  (<span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                {cartItemCount}
                
                </span>)}
                </Link>
          </div>
          </nav>
        </header>
        <main className='container m-auto mt-4 px-4'>{children}
        </main>
        
        <footer className='flex justify-center shadow-inner h-14'> @2023 Copyright</footer>
        </div>
</div>
</>
  )
}
export default Layout;