import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

const Exclusive = ({ blok }) => {
    return (
        <div className='sm:flex justify-center items-center'>
            {blok?.exclusive?.map((data, i) => {
                const containerClass = cn(
                    'w-full group flex items-center justify-center relative',
                    { 'bg-gray-100': i === 0, 'bg-[#ECE7E3]': i !== 0 }
                );

                const contentClass = cn(
                    'sm:block hidden absolute uppercase text-sm md:text-lg lg:text-xl xl:text-2xl tracking-wider opacity-10 top-8',
                    { 'right-5': i === 0, 'left-5': i !== 0 }
                );

                const yearClass = cn(
                    'sm:block hidden absolute uppercase text-6xl md:text-7xl lg:text-9xl xl:text-[10rem] font-bold tracking-wider opacity-[0.03] top-16',
                    { 'right-5': i === 0, 'left-5': i !== 0 }
                );

                const buttonClass = cn(
                    'bg-white hover:bg-black hover:text-white sm:text-base text-xs duration-200 sm:py-3 py-2.5 sm:px-7 px-5 rounded-md absolute bottom-4 shadow-lg',
                    { 'right-5': i === 0, 'left-5': i !== 0 }
                );

                return (
                    <div className={containerClass} key={i}>
                        <div className="overflow-hidden">
                            <Image
                                className="transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                                width={500}
                                height={500}
                                src={data?.image?.filename}
                                alt={data?.image?.alt || "Exclusive section"}
                            />
                        </div>

                        <p className={contentClass}>{data?.content}</p>
                        <p className={yearClass}>{data?.year}</p>
                        {data?.button?.map((btn) => (
                            <Link key={btn._uid} href={btn?.link?.url || "/"} className={buttonClass}>
                                {btn?.label}
                            </Link>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default Exclusive;
