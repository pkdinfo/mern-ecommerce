import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import React from 'react'

const Unauthorized = () => {
  const router = useRouter();
  const {message}= router.query;
  return (
    <Layout title="UnAuthorised">
        <h1>Acess Denied</h1>
        {message && <div>{message}</div>}
    </Layout>
)}

export default Unauthorized;