import React from 'react'
import Link from 'next/link';

 const ProductItems = ({products}) => {
  return (
    <>
    <div className='card'>
        <Link href={`/product/${products.slug}`}>
        </Link>
        <a>
            <img src={products.image}
            alt={products.name}
            className='rounded shadow'
            >
            </img>
        </a>
    <div className='flex items-center justify-center flex-col'>
        <Link href= {`/product/${products.slug}`}>
    
                <h2 className='text-lg'>{products.name}</h2>
      

        </Link>
        <p>{products.brand}</p>
        <p>$ {products.price}</p>
    <button className='primary_button' type='button'>Add To Cart</button>
    </div>
    </div>
    </>
  )
}
export default ProductItems;