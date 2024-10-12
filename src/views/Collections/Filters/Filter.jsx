"use client";

import React, { useState, useEffect } from 'react';
import CustomCheckbox from '@/components/custom/CustomCheckbox';
import { useRouter, useSearchParams } from 'next/navigation';

const Filter = ({ data }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCheckboxChange = (filter) => {
        setSelectedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((item) => item !== filter)
                : [...prev, filter]
        );
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(searchParams);
        const filterKey = data.name.toLowerCase();

        const encodedFilters = queryParams.get(filterKey);

        const decodedFilters = encodedFilters
            ? encodedFilters.split(',').map(filter => decodeURIComponent(filter.replace(/\+/g, ' ')))
            : [];

        setSelectedFilters(decodedFilters);
    }, [searchParams]);

    useEffect(() => {
        const queryParams = new URLSearchParams(searchParams);
        const filterKey = data.name.toLowerCase();

        if (selectedFilters.length > 0) {
            queryParams.set(filterKey, selectedFilters.join(','));
        } else {
            queryParams.delete(filterKey);
        }

        router.push(`?${queryParams.toString()}`, undefined, { shallow: true });
    }, [selectedFilters]);

    return (
        <div className='border-b border-gray-200 pb-5'>
            <h3 className='mb-5 text-[16px]'>{data.name}</h3>
            {data?.values?.map((filter, i) => (
                <CustomCheckbox
                    key={i}
                    label={filter}
                    checked={selectedFilters.includes(filter)}
                    onChange={() => handleCheckboxChange(filter)}
                    id={`filter-${filter}`}
                />
            ))}
        </div>
    );
};

export default Filter;
