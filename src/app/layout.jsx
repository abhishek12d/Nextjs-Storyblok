import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import StoryblokProvider from "@/components/context/StoryblokProvider";
import Navbar from "@/components/common/Navbar";

import { StoryBlokComponents } from "@/utils/StoryBlokComponents";
import storyblokApi from "@/model/storyBlokApi";

import "./globals.css";

export const metadata = {
  title: "Headless Site",
  description: "Headless Site Using Hydrogen, Storyblok and Nextjs",
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_SB_PREVIEW_TOKEN,
  use: [apiPlugin],
  components: StoryBlokComponents,
  apiOptions: {
    region: "us"
  },
});

export default async function RootLayout({ children }) {
  const navbarStory = await storyblokApi('templates/global-templates/header');
  return (
    <StoryblokProvider>
      <html lang="en">
        <body className="2xl:mx-auto max-w-screen-2xl">
          {navbarStory[0] && <Navbar data={navbarStory[0]?.content?.body[0]} />}
          {children}
        </body>
      </html>
    </StoryblokProvider>
  );
}
