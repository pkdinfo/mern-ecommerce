import { Store } from '@/utils/Store'
import React, { useContext } from 'react'
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { DeleteFilled } from '@ant-design/icons/lib/icons';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';


const CartScreen = () => {
const {state, dispatch}= useContext(Store)
 const { cart : {cartItems},} = state;
const router = useRouter();
 
const removeCartHandller =(item)=>{
dispatch({ type : 'REMOVE_ITEM', payload : item});
 }

const updateCartHandler =(item, qty)=>{
  const quantity =Number(qty);
  dispatch ({type : 'ADD_ITEM', payload: {...item, quantity}})

}
  return (
<Layout title="Shopping Cart">
    <h1 className='text lg:'>Shopping Cart</h1>
    {
      cartItems.length === 0 ? (<div>Cart is Empty, <Link href="/">Go to Shopping </Link> </div>)
      : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <table className='min-h-full'>
              <thead className='border-b'>
                <tr>
                  <th className='px-5 text-left'>Item</th>
                  <th className='px-5 text-right'>Quantity</th>
                  <th className='px-5 text-right'>Price</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                  {
                    cartItems.map((item)=>(
                      <tr key={item.slug} className='border-b'>
                        <td>
                        <Link  href={`/product/${item.slug}`} legacyBehavior={true}>
                          <a className='flex items-center'>
                            <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}>
                           
                            </Image>
                     
                            {item.name} 
                          </a>
                        </Link>
                        </td>
                        <td className='px-5 text-right'>
                          {/* {item.quantity} */}
                        <select 
                        value={item.quantity} 
                        onChange={(e)=> 
                        updateCartHandler(item, e.target.value)
                        }>
                        {[...Array(item.countInStock).keys()].map((x)=>(
                        <option key={x + 1} value={x + 1}> 
                        {x+1}
                        </option>
                        ))}
                        </select>
                        </td>
                        <td className='px-5 text-center'>{item.price}</td>
                        <td className='px-5 text-center'><button onClick={()=>removeCartHandller(item)}><DeleteFilled /></button></td>
                      </tr>
                    ))
                  }
              </tbody>
            </table>
          </div>
                    <div>
                      <ul>
                        <li><div className='text-lg7'>SubTotal({cartItems.reduce((a,c)=> a+c.quantity, 0)}) : $
                        {cartItems.reduce((a,c) => a+c.quantity * c.price, 0)}</div></li>
                        <li><button className='primary_button w-full' onClick={()=>router.push('/shipping')}>Check Out</button></li>
                      </ul>
                    </div>
          
        </div>
      )
    }
</Layout>  )
}

export default dynamic(()=> Promise.resolve(CartScreen), {ssr:false});