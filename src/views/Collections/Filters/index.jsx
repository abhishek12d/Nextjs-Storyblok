import React from 'react'

import Filter from './Filter'

const Filters = async ({ filters }) => {
    return (
        <div className='hidden md:block w-80 space-y-8'>
            <div className='w-full flex items-center justify-between border-b border-gray-200 pb-5'>
                <h2 className='subheading'>Filters</h2>
                <button className='text-xs text-secondary'>Clear All</button>
            </div>
            {filters?.map((value, i) => {
                return <Filter data={value} key={i} />
            })}
        </div>
    )
}

export default Filters
