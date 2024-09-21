import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { BsDashLg } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Sidebar = ({ data, toggleDrawer, toggleMobileDropdown, sidebarDropdwon }) => {
    return (
        <Box role="presentation" className="w-80">
            <List>
                <ListItem disablePadding>
                    <div className='w-full'>
                        <div className='flex items-center px-4 py-2 border-b border-gray-200'>
                            <Link href={data?.logoLink?.url}>
                                <Image src={data?.logo?.filename} alt={data?.alt || "logo"} width={180} height={20} priority="low" />
                            </Link>

                            <IoClose size={25} className='ml-auto cursor-pointer' onClick={toggleDrawer(false)} />
                        </div>
                        <div className='p-4'>
                            {data?.navigationList?.map((navigation, index) => (
                                <div
                                    className='py-3 transition-all duration-500 cursor-pointer'
                                    key={index}
                                    onClick={() => toggleMobileDropdown(index)}
                                >
                                    <div className='flex gap-1 items-center'>
                                        <Link href={navigation?.link?.url}>
                                            {navigation?.name}
                                        </Link>
                                        <IoIosArrowDown className={`${sidebarDropdwon === index ? '-rotate-180' : ''} duration-300 ml-auto`} />
                                    </div>

                                    {sidebarDropdwon === index && navigation?.subItems?.length > 0 && (
                                        <div className='py-3'>
                                            {navigation.subItems.map((subItem, subIndex) => {
                                                return (
                                                    <div key={subIndex} className='flex gap-2 items-center hover:font-semibold rounded-md px-4 py-1.5 text-gray-600'>
                                                        <BsDashLg />
                                                        <Link href={subItem?.link?.url}>
                                                            {subItem?.name}
                                                        </Link>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </ListItem>
            </List>
        </Box>
    )
}

export default Sidebar
