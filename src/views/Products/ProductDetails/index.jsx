"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiMinus, FiPlus } from "react-icons/fi";
import cn from 'classnames';

const ProductDetails = ({ product }) => {
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const { title, description, priceRange, compareAtPriceRange, vendor, tags, options, variants } = product;

    const updateQuery = useCallback((updatedColor, updatedSize) => {
        const params = new URLSearchParams(window.location.search);

        if (updatedColor) {
            params.set('color', updatedColor);
        } else {
            params.delete('color');
        }

        if (updatedSize) {
            params.set('size', updatedSize);
        } else {
            params.delete('size');
        }

        router.replace(`?${params.toString()}`, undefined, { shallow: true });
    }, []);

    useEffect(() => {
        if (options) {
            const initialColor = options.find(option => option.name === 'Color')?.values[0];
            const initialSize = options.find(option => option.name === 'Size')?.values[0];

            const urlColor = searchParams.get('color');
            const urlSize = searchParams.get('size');

            if (initialColor && urlColor && color !== urlColor) {
                setColor(urlColor);
            }

            if (initialSize && urlSize && size !== urlSize) {
                setSize(urlSize);
            }
        }
    }, [options]);

    useEffect(() => {
        if (color && size) {
            updateQuery(color, size);
        }
    }, [color, size, updateQuery]);

    const handleCheckboxChange = (option, value) => {
        if (option.name === 'Color') {
            setColor(value);
        } else if (option.name === 'Size') {
            setSize(value);
        }
    };

    return (
        <div className='space-y-5'>
            <h2 className='heading'>{title}</h2>
            <p className='text-secondary leading-normal'>{description}</p>

            <div className='flex gap-4 items-center'>
                <p className='heading'>${priceRange.minVariantPrice.amount}</p>
                {compareAtPriceRange && (
                    <del className='text-secondary sm:text-lg'>
                        ${compareAtPriceRange.minVariantPrice.amount}
                    </del>
                )}
            </div>
            <hr />

            <div className='space-y-6'>
                {options?.map((option) => {
                    let isAvailable = [];
                    variants?.edges?.forEach((val) => {
                        let title = val?.node?.title?.split(" / ");
                        isAvailable.push({ title, available: val?.node?.availableForSale });
                    });

                    return (
                        <div key={option.id} className="mb-4">
                            <h3 className="font-medium">{option.name}</h3>
                            <div className="flex gap-3 mt-2">
                                {option.values.map((value) => {
                                    const isSelected = option.name === 'Color' ? color === value : size === value;

                                    let availableForThisOption = true;

                                    if (option.name === 'Size') {
                                        if (color) {
                                            const matchingVariant = isAvailable.find(
                                                val => val.title[0] === value && val.title[1] === color
                                            );
                                            availableForThisOption = matchingVariant ? matchingVariant.available : true;
                                        }
                                    }

                                    else if (option.name === 'Color') {
                                        if (size) {
                                            const matchingVariant = isAvailable.find(
                                                val => val.title[1] === value && val.title[0] === size
                                            );
                                            availableForThisOption = matchingVariant ? matchingVariant.available : true;
                                        }
                                    }

                                    return (
                                        <label
                                            key={value}
                                            className={cn(
                                                "border relative uppercase duration-200 rounded-md p-1 sm:w-10 sm:h-10 w-8 h-8 text-xs sm:text-sm text-center cursor-pointer",
                                                {
                                                    "border-primary": isSelected,
                                                    "hover:border-primary": !isSelected && availableForThisOption,
                                                    "border-gray-300": !isSelected,
                                                    "line-through": !availableForThisOption && (size || color),
                                                    "cursor-not-allowed opacity-80": !availableForThisOption && (size || color)
                                                }
                                            )}
                                        >
                                            <input
                                                type="checkbox"
                                                name={option.name}
                                                value={value}
                                                className="hidden"
                                                checked={isSelected}
                                                onChange={() => handleCheckboxChange(option, value)}
                                                aria-label={`${option.name} ${value}`}
                                                disabled={!availableForThisOption && (size || color)}
                                            />
                                            <span
                                                style={option.name === 'Color' ? { backgroundColor: value } : {}}
                                                className={cn('relative rounded w-full h-full flex items-center justify-center', {
                                                    'block': option.name === 'Color',
                                                })}
                                            >
                                                {option.name === 'Size' ? value : ''}
                                            </span>
                                            {!availableForThisOption && (size || color) && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50">
                                                    <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            )}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <hr />

            <div className="flex items-center space-x-6">
                <div className="flex items-center border rounded-md overflow-hidden">
                    <button className="w-11 h-10 flex items-center justify-center border-r" aria-label="Decrease quantity">
                        <FiMinus />
                    </button>
                    <span className="px-7 py-2">1</span>
                    <button className="w-11 h-10 flex items-center justify-center border-l" aria-label="Increase quantity">
                        <FiPlus />
                    </button>
                </div>
                <button className="bg-primary hover:bg-gray-700 duration-200 text-white px-10 py-2.5 rounded-md text-sm">
                    Add to cart
                </button>
            </div>
            <hr />

            <div className='space-y-3 text-sm'>
                <p className='font-semibold'>Vendor: <span className='font-normal'>{vendor}</span></p>
                {tags?.length > 0 && (
                    <div className='font-semibold flex gap-1 items-center'>
                        <p>Tags:</p>
                        <p>
                            {tags.map((tag, i) => (
                                <span key={i} className='font-normal text-secondary'>
                                    {tag}{i !== tags.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </p>
                    </div>
                )}
            </div>
            <hr />
        </div>
    );
};

export default ProductDetails;
