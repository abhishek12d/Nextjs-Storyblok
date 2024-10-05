import ProductCard from '@/components/ecommerce/ProductCard';
import { fetchProducts } from '@/shopify/products/fetchProducts'
import React from 'react'

const Products = async () => {
    const { products } = await fetchProducts({ limit: 100 });

    return (
        <div className='w-full space-y-8'>
            <h2 className='subheading'>Casual Wear</h2>
            <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-6'>
                {products?.map((product) => {
                    return <ProductCard data={product} key={product.id} />
                })}
            </div>
        </div>
    )
}

export default Products
