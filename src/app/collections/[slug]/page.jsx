import React from 'react'

import Filters from '@/views/Collections/Filters'
import Products from '@/views/Collections/Products'

const Collections = () => {
    return (
        <div className='flex gap-10 sm:m-10 m-4'>
            <Filters />
            <Products />
        </div>
    )
}

export default Collections
