"use client";

import React, { useMemo } from 'react';
import ProductCard from '@/components/ecommerce/ProductCard';
import { useSearchParams } from 'next/navigation';

const Products = ({ products }) => {
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
            <h2 className='subheading'>Casual Wear</h2>
            <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-6'>
                {filteredProducts?.map((product) => (
                    <ProductCard data={product} key={product.id} />
                ))}
            </div>
        </div>
    );
};

export default Products;
