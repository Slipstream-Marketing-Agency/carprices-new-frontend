import CategoryFilter from '@/src/components/web-stories/CategoryFilter';
import StoryCard from '@/src/components/web-stories/StoryCard';
import { getAllWebStories, getCategories } from '@/src/lib/api';
import Head from 'next/head';

export default function WebStories({ stories, categories }) {
  return (
    <>
      <Head>
        <title>All Web Stories | Your Website</title>
        <meta name="description" content="Explore all web stories about car prices, buying tips, and more." />
        <meta property="og:title" content="All Web Stories | Your Website" />
      </Head>

      <div className="px-4 py-8">
        {/* Category Filter Component */}
        <CategoryFilter categories={categories} />

        {/* Story Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </>
  );
}


export async function getStaticProps() {
  const stories = await getAllWebStories();
  const categories = await getCategories();

  return {
    props: { stories, categories },
    revalidate: 10, 
  };
}
