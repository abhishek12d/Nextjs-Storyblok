import React, { Suspense } from 'react'

import Filters from '@/views/Collections/Filters'
import Products from '@/views/Collections/Products'
import { fetchProducts } from '@/shopify/products/fetchProducts';

const Collections = async () => {

    const organizeFilters = (products) => {
        const filters = {};
        const priceRanges = [
            { label: 'Under $50', min: 0, max: 50 },
            { label: '$50 to $100', min: 50, max: 100 },
            { label: '$100 to $150', min: 100, max: 150 },
            { label: '$150 to $200', min: 150, max: 200 },
            { label: '$200 to $300', min: 200, max: 300 },
            { label: '$300 to $500', min: 300, max: 500 },
            { label: '$500 to $1000', min: 500, max: 1000 },
            { label: 'Over $1000', min: 1000, max: Infinity }
        ];

        const priceFilterSet = new Set();

        products?.forEach(product => {
            product?.variants?.edges?.forEach(variant => {
                const price = parseFloat(variant.node.price.amount);

                const matchingRange = priceRanges.find(range => price >= range.min && price < range.max);
                if (matchingRange) {
                    priceFilterSet.add(matchingRange.label);
                }

                variant.node.selectedOptions.forEach(option => {
                    if (!filters[option.name]) {
                        filters[option.name] = new Set();
                    }
                    filters[option.name].add(option.value);
                });
            });
        });

        const priceFilterArray = priceRanges
            .filter(range => priceFilterSet.has(range.label))
            .map(range => range.label);

        const filtersArray = Object.keys(filters).map(optionName => ({
            name: optionName,
            values: Array.from(filters[optionName]),
        }));

        return [
            { name: 'Price', values: priceFilterArray },
            ...filtersArray,
        ];
    };

    const { products } = await fetchProducts({ limit: 100 });
    const filters = organizeFilters(products);

    return (
        <div className='flex gap-10 sm:m-10 m-4'>
            <Suspense fallback={"Loading..."}>
                <Filters filters={filters} />
                <Products products={products} />
            </Suspense>
        </div>
    )
}

export default Collections
