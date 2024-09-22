import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Hero = ({ blok }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-9 gap-2 md:gap-2.5 mx-auto">
            {blok?.hero?.map((hero, i) => {
                const colSpanClass =
                    i === 0
                        ? 'mx-auto col-span-full sm:col-span-5'
                        : i >= 1 && i <= blok.hero.length - 2
                            ? 'mx-auto col-span-1 sm:col-span-2'
                            : 'mx-auto col-span-full sm:col-span-5';
                return (
                    <Link href={hero.link.url || "/"} key={hero._uid} className={colSpanClass}>
                        <Image src={hero?.media?.filename} width={1000} height={1000} alt={hero?.media?.alt || `hero-${i + 1}`} className='h-full w-full' />
                    </Link>
                )
            })}
        </div>
    )
}

export default Hero
