import { StoryblokComponent } from "@storyblok/react";

import storyblokApi from "@/utils/storyblok/storyBlokApi";

import FeaturedProducts from "@/views/Home/FeaturedProducts";
import OnSellingProducts from "@/views/Home/OnSellingProducts";

export default async function Page() {
  const data = await storyblokApi("home");

  return (
    <div className="space-y-10">
      <StoryblokComponent blok={data[0]?.content?.body[0]} key={data[0]?.content?.body[0]._uid} />
      <div className="sm:m-10 m-4 space-y-8">
        <FeaturedProducts />
        <StoryblokComponent blok={data[0]?.content?.body[1]} key={data[0]?.content?.body[1]._uid} />
        <OnSellingProducts />
        <StoryblokComponent blok={data[0]?.content?.body[2]} key={data[0]?.content?.body[2]._uid} />
      </div>
    </div>
  );
}
