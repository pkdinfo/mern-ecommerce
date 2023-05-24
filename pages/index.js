import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import data from '@/utils/data'
import Product from '@/models/Product';
import db from '@/utils/db';
import ProductItems from '@/components/ProductItems';
import { useContext } from 'react';
import { Store } from '@/utils/Store';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

export default function Home({products}) {

  const {state, dispatch} = useContext(Store);
  const {cart} = state;

  const addToCarthandller = async(product)=>{

    const existItem = cart.cartItems.find((x)=> x.slug === product.slug);
    const quantity = existItem ? existItem.quantity+1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock < 20)
    {
      toast.error('Out of Stock');
      return;
    }
dispatch({type : 'ADD_ITEM', payload: {...product, quantity}})
toast.success('Product Added to Cart');

  }


  return (
   
     <div>
    <Layout title=' Buy Womens Clothing' >

 
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      {products.map((products)=>(
        <ProductItems products={products} 
        key={products.slug}
        addToCarthandller ={addToCarthandller}
        ></ProductItems>
      ))}
      </div>
    </Layout>
        </div>
  )
}

export async function getServerSideProps(){
  await db.connect();
  const products = await Product.find().lean();
  return {
    props:{
      products : products.map(db.convertDocToObj),

    }
  }
}
