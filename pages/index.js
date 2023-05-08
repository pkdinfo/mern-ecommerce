import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import data from '@/utils/data'
import ProductItems from '@/components/ProductItems'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   
     <div>
    <Layout title=' Buy Womens Clothing' >

 
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      {data.products.map((products)=>(
        <ProductItems products={products} key={products.slug}></ProductItems>
      ))}
      </div>
    </Layout>
        </div>

  )
}
