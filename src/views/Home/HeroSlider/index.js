"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const HeroSlider = ({ blok }) => {
    return (
        <div className="w-full">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={30}
                slidesPerView={1.4}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                loop={true}
            >
                {blok?.HeroSlider?.map((hero, i) => (
                    <SwiperSlide key={hero._uid}>
                        <Link href={hero.link.url || "/"}>
                            <Image
                                src={hero?.media?.filename}
                                width={1000}
                                height={500}
                                alt={hero?.media?.alt || `hero-${i + 1}`}
                                className="object-contain h-full w-full rounded-md"
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;
