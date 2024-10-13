"use client";

import React, { useRef, useMemo } from "react";
import Image from "next/image";

import { useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";

const ProductImageGallery = ({ product }) => {
    const mainCarouselRef = useRef(null);
    const thumbCarouselRef = useRef(null);
    const { size, color } = useSelector((state) => state.product);

    const filteredImages = useMemo(() => {
        return product?.images?.edges?.filter((image) => {
            const altText = image?.node?.altText?.toLowerCase().trim().split(" / ");
            const matchesColor = color ? altText?.includes(color.toLowerCase()) : true;
            const matchesSize = size ? altText?.includes(size.toLowerCase()) : true;
            return matchesColor && matchesSize;
        });
    }, [product, color, size]);

    const handleThumbnailClick = (index) => {
        if (mainCarouselRef.current) {
            mainCarouselRef.current.slideTo(index);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{ delay: 3000 }}
                className="w-full xs:max-w-md max-w-sm sm:max-w-lg mb-5 mainCarousel"
                onSwiper={(swiper) => {
                    mainCarouselRef.current = swiper;
                }}
            >
                {filteredImages?.map((image) => (
                    <SwiperSlide key={image?.node?.id}>
                        <div className="relative w-full h-[300px] sm:h-[500px]">
                            <Image
                                alt={image?.node?.altText || "Product"}
                                src={image?.node?.url}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 500px, (min-width: 641px) 500px"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                modules={[Navigation]}
                spaceBetween={2}
                slidesPerView="auto"
                className="xs:max-w-md max-w-sm sm:max-w-lg thumbCarousel"
                onSwiper={(swiper) => {
                    thumbCarouselRef.current = swiper;
                }}
            >
                {filteredImages?.length > 0 ? filteredImages?.map((image, index) => (
                    <SwiperSlide key={image?.node?.id} style={{ width: "100px", height: "100px" }}>
                        <div className="relative w-full h-full">
                            <Image
                                alt={image?.node?.altText || "Product Thumbnail"}
                                src={image?.node?.url}
                                fill
                                className="object-cover cursor-pointer"
                                onClick={() => handleThumbnailClick(index)}
                            />
                        </div>
                    </SwiperSlide>
                )) : <SwiperSlide>No Image Found</SwiperSlide>}
            </Swiper>
        </div>
    );
};

export default ProductImageGallery;
