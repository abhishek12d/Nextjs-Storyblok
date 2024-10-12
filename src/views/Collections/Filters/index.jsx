"use client"

import React from 'react'
import { useParams, useRouter } from 'next/navigation';

import Filter from './Filter'

const Filters = ({ filters }) => {

    const router = useRouter();
    const { handle } = useParams();

    const clearFilters = () => {
        router.replace(`/collections/${handle}`, undefined, { shallow: true });
    }

    return (
        <div className='hidden md:block w-80 space-y-8'>
            <div className='w-full flex items-center justify-between border-b border-gray-200 pb-5'>
                <h2 className='subheading'>Filters</h2>
                <button className='text-xs text-secondary' onClick={clearFilters}>Clear All</button>
            </div>
            {filters?.map((value, i) => {
                return <Filter data={value} key={i} />
            })}
        </div>
    )
}

export default Filters
