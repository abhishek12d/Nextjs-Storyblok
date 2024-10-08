import React, { Fragment } from 'react'

import HorizontalProductCard from '@/components/ecommerce/HorizontalProductCard';
import { fetchProducts } from '@/shopify/products/fetchProducts'
import Link from 'next/link';

const OnSellingProducts = async () => {

    const { products } = await fetchProducts({ limit: 9 });

    return (
        <Fragment>
            <div className='flex justify-between items-center'>
                <h2 className='heading'>On Selling Products</h2>
                <Link href="/collections/all" className='hover:underline'>See All product</Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:gap-x-6 gap-x-4 gap-y-8'>
                {products?.map((product) => {
                    return <HorizontalProductCard data={product} key={product.id} />
                })}
            </div>
        </Fragment>
    )
}

export default OnSellingProducts
