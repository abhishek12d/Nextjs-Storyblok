"use client";

import React, { useState } from 'react';
import CustomCheckbox from '@/components/custom/CustomCheckbox';

const Filter = ({ data }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleCheckboxChange = (filter) => {
        setSelectedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((item) => item !== filter)
                : [...prev, filter]
        );
    };

    return (
        <div className='border-b border-gray-200 pb-5'>
            <h3 className='mb-5 text-[16px]'>{data.title}</h3>
            {data?.filters?.map((filter, i) => (
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
