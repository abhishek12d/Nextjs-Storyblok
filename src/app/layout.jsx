import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import Navbar from "@/components/common/Navbar";

import { StoryBlokComponents } from "@/utils/storyblok/StoryBlokComponents";
import storyblokApi from "@/utils/storyblok/storyBlokApi";

import StoreProvider from "@/components/context/StoreProvider";
import StoryblokProvider from "@/components/context/StoryblokProvider";

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
      <StoreProvider>
        <html lang="en">
          <body>
            {navbarStory[0] && <Navbar data={navbarStory[0]?.content?.body[0]} />}
            {children}
          </body>
        </html>
      </StoreProvider>
    </StoryblokProvider>
  );
}
