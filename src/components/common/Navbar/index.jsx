"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { IoIosArrowDown } from "react-icons/io";
import { IoSearch, IoCartOutline } from "react-icons/io5";

import storyblokApi from '@/model/storyBlokApi';
import WithStoryblok from '@/components/helpers/withStoryblok';

const Navbar = () => {
  const [dropdown, setDropdown] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const navbar = await storyblokApi("config");
      setData(navbar.story.content.header_menu[0]);
    };

    fetchData();
  }, []);

  const handleMouseEnter = (index) => {
    setDropdown(index);
  };

  const handleMouseLeave = () => {
    setDropdown(null);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <header className='w-full flex items-center sticky top-0 shadow-md px-7 gap-10'>
      <Link href={data?.logoLink?.url}>
        <Image src={data?.logo?.filename} alt={data?.alt || "logo"} width={90} height={20} />
      </Link>

      <div className='flex gap-6'>
        {data?.navigationList?.map((navigation, index) => (
          <div
            className='relative border-b-4 border-transparent hover:border-b-black py-6 transition-all duration-500 cursor-pointer group'
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className='flex gap-1 items-center'>
              <Link href={navigation?.link?.url} className='text-gray-700 hover:text-gray-900'>
                {navigation?.name}
              </Link>
              <IoIosArrowDown className='group-hover:-rotate-180 duration-300' />
            </div>

            {navigation?.subItems?.length > 0 && (
              <div
                className={`absolute left-0 top-[70px] mt-2 w-40 bg-white shadow-lg rounded-md py-2 ${dropdown === index ? 'block' : 'hidden'}`}
              >
                {navigation.subItems.map((subItem, subIndex) => (
                  <Link
                    href={subItem?.link?.url}
                    key={subIndex}
                    className='block px-4 py-2 text-gray-600 hover:bg-gray-100'>
                    {subItem?.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='flex ml-auto gap-10'>
        {data?.actionItems?.map((item, index) => {
          return (
            <div key={index}>
              {item?.toLowerCase() == "search" &&
                <IoSearch size={24} />
              }
              {item?.toLowerCase() == "cart" &&
                <IoCartOutline size={24} />
              }
              {item?.toLowerCase() == "account" &&
                <p>Sign In</p>
              }
            </div>
          )
        })}
      </div>
    </header>
  )
}

export default WithStoryblok(Navbar);
