import storyblokApi from "@/model/storyBlokApi";
import { StoryblokComponent } from "@storyblok/react";

export default async function Page() {
  const data = await storyblokApi("home");

  return (
    <div>
      <h1>Story: {data[0]?.name}</h1>
      {data?.story?.content?.body?.map((blok) => {
        return <StoryblokComponent blok={blok} key={blok._uid} />
      })}
    </div>
  );
}
