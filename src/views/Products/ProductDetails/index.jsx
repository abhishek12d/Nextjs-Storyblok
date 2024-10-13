"use client";

import React, { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { setSelectedColor, setSelectedSize } from '@/store/product/productSlice';

const ProductDetails = ({ product }) => {
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    const { title, description, priceRange, compareAtPriceRange, vendor, tags, options } = product;

    useEffect(() => {
        options?.forEach((option) => {
            const defaultValue = option.values[0];
            if (option.name === 'Color') {
                setColor(defaultValue);
                dispatch(setSelectedColor(defaultValue));
            } else if (option.name === 'Size') {
                setSize(defaultValue);
                dispatch(setSelectedSize(defaultValue));
            }
        });
    }, [options, dispatch]);

    const handleCheckboxChange = (option, value) => {
        if (option.name === 'Color') {
            setColor(value);
            dispatch(setSelectedColor(value));
        } else if (option.name === 'Size') {
            setSize(value);
            dispatch(setSelectedSize(value));
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
                {options?.map((option) => (
                    <div key={option.id} className="mb-4">
                        <h3 className="text-lg font-medium">{option.name}</h3>
                        <div className="flex gap-3 mt-2">
                            {option.values.map((value) => {
                                const isSelected = option.name === 'Color'
                                    ? color === value
                                    : size === value;

                                return (
                                    <label
                                        key={value}
                                        className={cn(
                                            "border uppercase duration-200 rounded-md p-1 sm:w-10 sm:h-10 w-8 h-8 text-xs sm:text-sm text-center cursor-pointer",
                                            {
                                                "border-primary": isSelected,
                                                "hover:border-primary": !isSelected,
                                                "border-gray-300": !isSelected
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
                                        />
                                        <span
                                            style={option.name === 'Color' ? { backgroundColor: value } : {}}
                                            className={cn('rounded w-full h-full flex items-center justify-center', {
                                                'block': option.name === 'Color',
                                            })}
                                        >
                                            {option.name === 'Size' ? value : ''}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
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
