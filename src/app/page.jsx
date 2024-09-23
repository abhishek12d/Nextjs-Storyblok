import storyblokApi from "@/utils/storyblok/storyBlokApi";
import { StoryblokComponent } from "@storyblok/react";

export default async function Page() {
  const data = await storyblokApi("home");

  return (
    <div className="flex flex-grow">
      {data[0]?.content?.body?.map((blok) => {
        return <StoryblokComponent blok={blok} key={blok._uid} />
      })}
    </div>
  );
}
