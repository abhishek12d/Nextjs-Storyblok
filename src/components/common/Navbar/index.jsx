"use client"

import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { IoIosArrowDown } from "react-icons/io";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import { CgMenuLeft } from "react-icons/cg";

import Drawer from '@mui/material/Drawer';

import Sidebar from './Sidebar';

const Navbar = ({ data }) => {
  const [dropdown, setDropdown] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [sidebarDropdwon, setSidebarDropdwon] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMouseEnter = (index) => {
    setDropdown(index);
  };

  const handleMouseLeave = () => {
    setDropdown(null);
  };

  const toggleMobileDropdown = (index) => {
    setSidebarDropdwon(sidebarDropdwon == index ? null : index);
  }

  return (
    <header className='w-full flex items-center sticky top-0 shadow-md sm:px-7 px-3 sm:gap-8 gap-4 z-10 bg-white'>
      <div className='sm:hidden flex'>
        <div className='cursor-pointer' onClick={toggleDrawer(true)}>
          <CgMenuLeft size={25} />
        </div>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Sidebar data={data} toggleDrawer={toggleDrawer} toggleMobileDropdown={toggleMobileDropdown} sidebarDropdwon={sidebarDropdwon} />
        </Drawer>
      </div>
      <Link href={data?.logoLink?.url}>
        <Image src={data?.logo?.filename} alt={data?.alt || "logo"} width={150} height={20} priority="low" />
      </Link>

      <div className='sm:flex items-center hidden sm:gap-6 gap-3'>
        {data?.navigationList?.map((navigation, index) => (
          <div
            className='relative border-b-4 border-transparent hover:border-b-black py-6 transition-all duration-500 cursor-pointer group'
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className='flex gap-1 items-center'>
              <Link href={navigation?.link?.url} className='text-gray-700 hover:text-gray-900 whitespace-nowrap'>
                {navigation?.name}
              </Link>
              <IoIosArrowDown className='group-hover:-rotate-180 duration-300' />
            </div>

            {dropdown === index && navigation?.subItems?.length > 0 && (
              <div className="absolute left-0 top-[70px] mt-2 w-40 bg-white shadow-lg rounded-md py-2">
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
      <div className='flex ml-auto sm:gap-8 gap-4 py-6'>
        {data?.actionItems?.map((item, index) => {
          return (
            <div key={index}>
              {item?.toLowerCase() == "search" &&
                <IoSearch className='xs:text-2xl text-xl' />
              }
              {item?.toLowerCase() == "cart" &&
                <IoCartOutline className='xs:text-2xl text-xl' />
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

export default Navbar;
