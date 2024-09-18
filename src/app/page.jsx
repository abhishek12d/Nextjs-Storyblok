import storyblokApi from "@/model/storyBlokApi";

export default async function Home() {
  const data = await storyblokApi("home");

  return (
    <div>
      <h1>Story: {data?.story?.name}</h1>
    </div>
  );
}
