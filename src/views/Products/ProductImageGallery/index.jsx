"use client"

import React from 'react'
import Image from 'next/image';

import Fancybox from '@/components/ecommerce/FancyBox';

const ProductImageGallery = ({ product }) => {
    return (
        <div className='w-[50%]'>
            <Fancybox
                options={{
                    Carousel: {
                        infinite: false,
                    },
                }}
            >
                <div className={`grid ${product?.images?.edges?.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-5`}>
                    {product?.images?.edges?.map((image) => {
                        return (
                            <Image key={image?.node?.id} data-fancybox="gallery" src={image?.node?.url} alt={image?.node?.altText || "Product"} width={image?.node?.width} height={image?.node?.height} className='cursor-pointer' />
                        )
                    })}
                </div>
            </Fancybox>
        </div>
    )
}

export default ProductImageGallery
