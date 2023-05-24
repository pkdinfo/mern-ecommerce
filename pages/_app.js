import '@/styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react'
import { StoreProvider } from '@/utils/Store'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return( 
    <>
    <ToastContainer/>
  <SessionProvider session={session}>
  <StoreProvider>
    {Component.auth?(
      <Auth><Component {...pageProps} /></Auth>
      
    ): <Component {...pageProps} />}
    </StoreProvider>
    </SessionProvider>
    </>
    )
}

function Auth ({children}){
  const router = useRouter();
  const {status, data: session}= useSession({
    required : true,
    onUnauthenticated(){
      router.push('/U nauthorized?message=login required');
    },
  });
if (status=== 'loading'){

  return <div>Loading...</div>
}
return children;
}