import Layout from '@/components/Layout';
import React, { useEffect } from 'react'
import {signIn, useSession} from 'next-auth/react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { getError } from '@/utils/error';
import { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';
import { toast } from 'react-toastify';

const loginScreen = () => {
const { data : session} = useSession();
const router = useRouter();
const { redirect}=router.query;
useEffect(()=>{
if(session?.user){
  router.push(redirect || '/');
}
},[router, session, redirect])

  const {handleSubmit, 
  register,
  formState :{errors},
 } = useForm();
const submitHandller =async ({email, password})=>{
  console.log('login clicked');
try {
  const result = await signIn ( 'credentials', {
    redirect : false,
    email,
    password,
  });
  if(result.error){
    console.log("result",result, email, password)
    toast.error(result.error);
  }
  
} catch (error) {
  toast.error(getError(error));
}
}

  return (
    <Layout title="Login">

        <form className='mx-auto max-w-screen-md' onSubmit={handleSubmit(submitHandller)}>
         <h1 className='mb-4 text-xl'>Login Page</h1>
         <div className='mb-4'>
          <label>Email</label>
          <input 
          type="email" 
          {...register  ('email', {required: 'Enter Your Email',pattern: /[A-Za-z]{3}/ })}
          id="email" className='w-full'></input>
          {errors.email && <div className='text-red-600'>{errors.email.message}</div>}
         </div>
         <div className='mb-4'>
          <label>Password</label>
          <input 
          {...register ('password', {required: 'Please Enter your Password'})}
          type="password" id="password" className='w-full'></input>

    {errors.password && <div className='text-red-600'>{errors.password.message}</div>}
         </div>
         <div className='mb-4'>
          <button className='primary_button'>Login</button>
         </div>
         <div className=''>
          <h1>Don't Have an Account</h1>
          <Link href="/Register">Register</Link>
         </div>
        </form>
    </Layout>
  )
}
export default loginScreen;