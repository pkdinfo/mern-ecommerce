import Layout from '@/components/Layout';
import React, { useEffect } from 'react';
import CheckoutWizard from '@/components/CheckoutWizard';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';

const shipping = () => {
const {handleSubmit,
   setValue, 
   register, 
   formState: {errors},
  }= useForm();

const {dispatch, state} = useContext(Store);
const {cart} = state;
const {shippingAddress} = cart;
const router = useRouter();


console.log("STATE",state)
console.log("shipping Address",{shippingAddress})
console.log("shipping Address",shippingAddress.fullName)


useEffect(() => {
  setValue('fullName', shippingAddress.fullName);
  setValue('address', shippingAddress.address);
  setValue('city', shippingAddress.city);
  setValue('postalCode', shippingAddress.postalCode);
  setValue('country', shippingAddress.country);
},[setValue, shippingAddress]);

console.log("POSTAL_CODE",shippingAddress.postalCode)

const submitHandler =({fullName, city,postalCode,address,country})=>{

  dispatch({
    type :'SAVE_SHIPPING_ADDRESS',
    payload: {fullName, address, postalCode, country, city},
  });

  Cookies.set(
  'cart', JSON.stringify({
    ...cart, 
    shippingAddress:{
      fullName,
      address,
      city,
      postalCode,
      country,
    },
  }),
  router.push('/payment')
);
  
  
}
  return (
    <Layout title="Shipping Address">
     <CheckoutWizard activeStep={1}/>
    <form className='mx-auto max-w-screen-md'
    onSubmit={handleSubmit(submitHandler)}>
      <h1 className='mb mb-4 text-xl'>Shipping Address</h1>

      <div className='mb-4'>
        <label>Full Name</label>
        <input className='w-full' id='fullName' autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}/>
      </div>

      <div className='mb-4'>
        <label>City</label>
        <input className='w-full' id='city' {...register('city', {required: "please enter city name"})}/>
      </div>
 

      <div className='mb-4'>
        <label>Address</label>
        <input className='w-full' id='address' {...register('address', {required: "please enter city name"})}/>
      </div>
      <div className='mb-4'>
        <label>Postal Code</label>
        <input className='w-full' id='postalCode' {...register('postalCode', {required: "please enter city name"})}/>
      </div>

      <div className='mb-4'>
        <label>Country</label>
        <input className='w-full' id='country' {...register('country', {required: "please enter city name"})}/>
      </div>

      <div className='flex justify-between mb-4'>
    <button className='primary_button'>Next</button>
      </div>
    </form>
  
    </Layout>
  )
}
export default shipping;
shipping.auth = true; 

 