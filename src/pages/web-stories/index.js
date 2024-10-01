import Ad300x250 from "@/src/components-old/ads-old/Ad300x250";
import Ad300x600 from "@/src/components-old/ads-old/Ad300x600";
import CategoryFilter from "@/src/components/web-stories/CategoryFilter";
import StoryCard from "@/src/components/web-stories/StoryCard";
import MainLayout from "@/src/layout/MainLayout";
import { getAllWebStories, getCategories } from "@/src/lib/api";
import Head from "next/head";

export default function WebStories({ stories, categories }) {
  return (
    <>
      <Head>
        <title>All Web Stories | Your Website</title>
        <meta
          name="description"
          content="Explore all web stories about car prices, buying tips, and more."
        />
        <meta property="og:title" content="All Web Stories | Your Website" />
      </Head>

      <MainLayout>
        <div className="tw-container tw-grid tw-grid-cols-12 tw-px-4 tw-py-8">
          <div className="md:tw-col-span-9 tw-col-span-12">
            {/* Story Listing */}
            <h1 className="tw-font-bold">Web Stories</h1>
            <div className="tw-grid md:tw-grid-cols-4 tw-grid-cols-2 tw-gap-6 tw-mt-4">
              {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </div>
          <div className="md:tw-col-span-3 tw-col-span-12">
            {/* Category Filter Component */}
            <Ad300x250 />
            <div className="tw-my-0 tw-p-2">
              {/* <CategoryFilter categories={categories} /> */}
            </div>

            <div className="sticky-sidebar">
              <div className="ad-container">
                <Ad300x600 dataAdSlot="3792539533" />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export async function getStaticProps() {
  const stories = await getAllWebStories();
  console.log(stories, "storieshhhhhhhh");

  const categories = await getCategories();

  return {
    props: { stories, categories },
    revalidate: 10,
  };
}
