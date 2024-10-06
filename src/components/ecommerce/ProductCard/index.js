import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ data }) => {
    return (
        <Link href={`/products/${data.handle}`} className='bg-white hover:shadow-xl rounded-md duration-500 group product-card-animation'>
            <div>
                <Image src={data?.featuredImage?.url} alt={data?.featuredImage?.altText || "product"} width={400} height={400} className='w-[400px] xs:h-[200px] sm:h-[220px] 2xl:h-[250px] 3xl:h-[280px] object-cover rounded-md group-hover:rounded-br-none group-hover:rounded-bl-none' />
            </div>
            <div className='p-4'>
                <h2 className='truncate mb-1 text-sm md:text-base font-semibold text-primary'>{data?.title}</h2>
                <p className='text-secondary text-xs lg:text-sm leading-normal xl:leading-relaxed truncate'>{data?.description}</p>
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

export default ProductCard
