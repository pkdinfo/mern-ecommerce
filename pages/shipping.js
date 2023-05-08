import Layout from '@/components/Layout';
import React from 'react';
import CheckoutWizard from '@/components/CheckoutWizard';
const shipping = () => {
  return (
    <Layout title="Shipping Address">
    
    <CheckoutWizard></CheckoutWizard>
  
    </Layout>
  )
}
export default shipping;