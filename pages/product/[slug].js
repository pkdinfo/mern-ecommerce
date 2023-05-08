import Layout from "@/components/Layout";
import data from "@/utils/data";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useContext } from "react";
import Image from "next/image";
import { Store } from "@/utils/Store";

const ProductScreen = () => {
  const {state, dispatch} = useContext(Store);
  const { query } = useRouter();
  const { slug } = query;
  console.log("slug ", slug);

  const product = data.products.find((x) => x.slug === slug);
  console.log("Product Name ", product);
  if (!product) {
    <div>product Not Found</div>;
  }
  const addToCarthandller =()=>{
    console.log("addtoCart",state.cart.cartItems)
    const existItem = state.cart.cartItems.find((x)=> x.slug === slug);
    const quantity = existItem ? existItem.quantity+1 : 1;
    if(product.countInStock < 20)
    {
      alert("Product of Stock");
      return;
    }
dispatch({type : 'ADD_ITEM', payload: {...product, quantity}})
  }
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to Home Page</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            Layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg ">{product.name}</h1>
            </li>
            <li>Product : {product.category}</li>
            <li>Brand : {product.brand}</li>
            <li>{product.rating} of {product.numReviews} Reviews</li>
            <li>Description  :   {product.description}</li>
          </ul>
       
        </div>
        <div>
        <div className="card p-5">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div> ${product.price}</div>
          </div>
          <div>
          <div className="mb-2 flex justify-between">
            <div>Stock</div>
            <div>{product.countInStock>0 ? 'In Stock':'Unavilable'} </div>
          </div>
          <div className="h-full"><button className="primary_button" onClick={addToCarthandller}>Add To Cart</button></div>
          </div>
          </div>
          </div>
      </div>
    </Layout>
  );
};
export default ProductScreen;
