import { getAllWebStories, getWebStoryData } from '@/src/lib/api';
import Head from 'next/head';

export default function WebStory({ story }) {
  return (
    <>
      <Head>
        <title>{story.title} | Your Website</title>
        <meta name="description" content={story.metaDescription} />
      </Head>

      <div className="min-h-screen flex flex-col">
        <div className="relative h-screen bg-gray-100">
          <img src={story.coverImage} alt={story.title} className="object-cover w-full h-full" />
          <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
            <h1 className="text-4xl font-bold">{story.title}</h1>
          </div>
        </div>

        {/* Story Pages */}
        <div className="flex flex-col space-y-4 p-4">
          {story.pages.map((page, index) => (
            <div key={index} className="bg-white shadow-md p-4 rounded-lg">
              <img src={page.image} alt={`Story Page ${index + 1}`} className="w-full h-64 object-cover rounded-lg mb-4" />
              <p className="text-gray-800">{page.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


export async function getStaticPaths() {
  const stories = await getAllWebStories();
  const paths = stories.map((story) => ({
    params: { slug: story.slug },
  }));
  return { paths, fallback: true };
}


export async function getStaticProps({ params }) {
  const story = await getWebStoryData(params.slug);
  return {
    props: { story },
    revalidate: 10, 
  };
}
