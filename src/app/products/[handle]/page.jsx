import React, { Suspense } from 'react'
import { redirect } from 'next/navigation';

import { fetchProduct } from '@/shopify/products/fetchProducts';

import ProductImageGallery from '@/views/Products/ProductImageGallery';
import ProductDetails from '@/views/Products/ProductDetails';

const Product = async ({ params }) => {
    const product = await fetchProduct({ handle: params.handle });

    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 justify-items-center gap-10 sm:m-10 m-4'>
            <Suspense fallback={"Loading..."}>
                <ProductImageGallery product={product} />
                <ProductDetails product={product} />
            </Suspense>
        </div>
    )
}

export default Product;

export async function generateMetadata({ params }) {
    const product = await fetchProduct({ handle: params.handle });
    if (!product) redirect('/404');

    return {
        title: product.seo.title || product.title,
        description: product.seo.description || product.description,
    };
}
