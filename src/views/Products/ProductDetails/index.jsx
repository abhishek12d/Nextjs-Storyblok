"use client"

import React from 'react'
import cn from 'classnames';

import { FiMinus, FiPlus } from "react-icons/fi";

const ProductDetails = ({ product }) => {
    return (
        <div className='w-[50%] space-y-5'>
            <h2 className='heading'>{product.title}</h2>
            <p className='text-secondary leading-normal'>{product.description}</p>
            <div className='flex gap-4 items-center'>
                <p className='heading'>${product.priceRange.minVariantPrice.amount}</p>
                <del className='text-secondary sm:text-lg'>${product.compareAtPriceRange.minVariantPrice.amount}</del>
            </div>
            <hr />
            <div className='space-y-6'>
                {product?.options?.map((option) => {
                    const colorMapping = {};
                    return (
                        <div key={option.id} className="mb-4">
                            <h3 className="text-lg font-medium">{option.name}</h3>
                            <div className="flex gap-3 mt-2">
                                {option.values.map((value) => {
                                    colorMapping[value] = `bg-${value}-600`;
                                    return (
                                        <button
                                            key={value}
                                            className="border uppercase hover:border hover:border-primary duration-200 rounded-md p-1 sm:w-10 sm:h-10 w-8 h-8 text-xs sm:text-sm text-center"
                                        >
                                            <span style={{ backgroundColor: value }} className={cn('rounded w-full h-full', {
                                                'block': option.name === 'Color',
                                            })}>
                                                {option.name === 'Size' ? value : ''}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <hr />
            <div class="flex items-center space-x-6">
                <div class="flex items-center border rounded-md overflow-hidden">
                    <button class="w-11 h-10 flex items-center justify-center border-r">
                        <FiMinus />
                    </button>
                    <span class="px-7 py-2">1</span>
                    <button class="w-11 h-10 flex items-center justify-center border-l">
                        <FiPlus />
                    </button>
                </div>
                <div>
                    <button class="bg-primary hover:bg-gray-700 duration-200 text-white px-10 py-2.5 rounded-md text-sm">Add to cart</button>
                </div>
            </div>
            <hr />
            <div className='space-y-3 text-sm'>
                <p className='font-semibold'>Vendor: <span className='font-normal'>{product.vendor}</span></p>
                <div className='font-semibold flex gap-1 items-center'>
                    <p>Tags:</p>
                    <p>
                        {product?.tags?.map((tag, i) =>
                            <span className='font-normal text-secondary'>
                                {tag}{i != product?.tags?.length - 1 ? ", " : ""}
                            </span>
                        )}
                    </p>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default ProductDetails
