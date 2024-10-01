import Head from 'next/head';
import { getStoriesByCategory, getCategories } from '../../../lib/api';
import StoryCard from '../../../components/StoryCard';

export default function CategoryPage({ stories, category }) {
  return (
    <>
      <Head>
        <title>{category.name} Web Stories | Your Website</title>
        <meta name="description" content={`Explore web stories in the ${category.name} category`} />
      </Head>

      <div className="px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">{category.name} Web Stories</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </>
  );
}

// Fetch stories by category at build time
export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

// Fetch stories for a specific category
export async function getStaticProps({ params }) {
  const stories = await getStoriesByCategory(params.slug);
  const categories = await getCategories();
  const category = categories.find((cat) => cat.slug === params.slug);

  return {
    props: { stories, category },
    revalidate: 10, // Revalidate every 10 seconds
  };
}
