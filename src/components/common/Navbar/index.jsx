import React from 'react'
import Link from 'next/link';

import storyblokApi from '@/model/storyBlokApi';
import WithStoryblok from '@/components/helpers/withStoryblok';

const Navbar = async () => {
  const data = await storyblokApi("config");

  return (
    <div className='w-full flex sticky top-0 shadow-sm p-7 gap-10'>
      {data?.story?.content?.header_menu?.map((item) => {
        return (
          <Link key={item._uid} href={item.link.url}>{item.name}</Link>
        )
      })}
    </div>
  )
}

export default WithStoryblok(Navbar);
