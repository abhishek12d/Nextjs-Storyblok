import React from 'react'

import Image from 'next/image';
import Link from 'next/link';

const HorizontalProductCard = ({ data }) => {
    return (
        <Link href={`/products/${data.handle}`} className='flex gap-2 bg-white hover:shadow-md rounded-md duration-500 product-card-animation border border-gray-100'>
            <Image src={data?.featuredImage?.url} alt={data?.featuredImage?.altText || "product"} width={150} height={150} className='w-[150px] h-[150px] object-cover rounded-tl-md rounded-bl-md' />
            <div className='flex flex-col justify-center p-2'>
                <h2 className='truncate mb-1 text-sm md:text-base font-semibold text-primary'>{data?.title}</h2>
                <p className='text-secondary text-xs lg:text-sm leading-normal xl:leading-relaxed text-wrap truncate'>{data?.description}</p>
                <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-primary">
                    <span className="inline-block">${data?.priceRange?.minVariantPrice?.amount}</span>
                    {data?.compareAtPriceRange?.minVariantPrice?.amount > 0 &&
                        <del className="sm:text-base font-normal text-secondary">${data?.compareAtPriceRange?.minVariantPrice?.amount}</del>
                    }
                </div>
            </div>
        </Link>
    )
}

export default HorizontalProductCard
