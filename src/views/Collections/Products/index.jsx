"use client";

import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import ProductCard from '@/components/ecommerce/ProductCard';

const sortingOptions =
    ["Sorting Options", "Price: low to high", "Price: high to low", "Title: A to Z", "Title: Z to A"];

const Products = ({ products }) => {
    const [sortDropdown, setSortDropdown] = useState(false);

    const searchParams = useSearchParams();

    const filters = useMemo(() => {
        const params = {};
        searchParams.forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            return Object.entries(filters).every(([filterKey, filterValue]) => {
                filterValue = filterValue.toLowerCase();
                if (filterKey === "price") {
                    const productPrice = parseFloat(product.priceRange.minVariantPrice.amount);

                    const priceRanges = filterValue
                        .split(",")
                        .map(range => range.split("to")
                            .map(item => parseFloat(item.trim().replace("$", "").replace("under ", "")))
                        );

                    return priceRanges.some(([minPrice, maxPrice]) => {
                        if (isNaN(maxPrice)) {
                            return productPrice < minPrice;
                        }
                        return productPrice >= minPrice && productPrice <= maxPrice;
                    });
                }

                if (filterKey === "size" || filterKey === "color") {
                    return product.variants.edges.some((variant) =>
                        variant.node.selectedOptions.some((option) =>
                            option.name.toLowerCase() === filterKey && option.value.toLowerCase() === filterValue
                        )
                    );
                }

                return true;
            });
        });
    }, [filters, products]);

    return (
        <div className='w-full space-y-8'>
            <div className='w-full flex items-center justify-between'>
                <h2 className='subheading'>Casual Wear</h2>
                <div className='flex gap-10 items-center'>
                    <h3 className='text-secondary font-normal text-sm'>{filteredProducts?.length} items</h3>
                    <div class="relative z-10 min-w-[180px]">
                        <button class="border border-gray-300 text-[13px] font-semibold relative w-full py-2 px-3 bg-white rounded-lg focus:outline-none sm:text-sm cursor-pointer" id="sort" type="button" aria-haspopup="listbox" aria-expanded="false" onClick={() => setSortDropdown(!sortDropdown)}>
                            <span class="block truncate text-start">Sorting Options</span>
                            <span class="absolute inset-y-0 right-2 flex items-center">
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" class="w-5 h-5 text-gray-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">4
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                                </svg>
                            </span>
                        </button>
                        {sortDropdown &&
                            <ul className='absolute bg-white w-full z-10 p-3 rounded-md'>
                                {sortingOptions?.map((option) => {
                                    return (
                                        <li key={option}>
                                            <button onClick={() => setSortDropdown(!sortDropdown)} className='text-sm block text-left text-secondary hover:text-primary hover:bg-gray-50 p-2 rounded-md w-full'>{option}</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        }
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-6'>
                {filteredProducts?.map((product) => (
                    <ProductCard data={product} key={product.id} />
                ))}
            </div>
        </div>
    );
};

export default Products;
