import React, { Fragment } from 'react'

import ProductCard from '@/components/ecommerce/ProductCard';
import { fetchCollections } from '@/shopify/collections/fetchCollections'

const FeaturedProducts = async () => {

    const { products } = await fetchCollections({ limit: 10 });

    return (
        <Fragment>
            <h2 className='heading'>New Arrivals</h2>
            <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6'>
                {products?.map((product) => {
                    return <ProductCard data={product} key={product.id} />
                })}
            </div>
        </Fragment>
    )
}

export default FeaturedProducts
