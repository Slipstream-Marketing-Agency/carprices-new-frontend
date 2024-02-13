import Ad300x250 from "@/components/ads/Ad300x250";
import Ad300x600 from "@/components/ads/Ad300x600";
import Ad728x90 from "@/components/ads/Ad728x90";
import AdBlog from "@/components/ads/AdBlog";
import Breadcrumb from "@/components/common/BreadCrumb";
import FeaturedImage from "@/components/common/FeaturedImage";
import PopularCars from "@/components/common/detail-pages/PopularCars";
import Layout from "@/components/layout/Layout";
import LatestBlog from "@/components/news-or-reviews/LatestBlog";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import RelatedBlogs from "@/components/news-or-reviews/RelatedBlogs";

export default function NewsPage({ news, blogs }) {
  const [metaDescription, setMetaDescription] = useState("")
  const paragraphContent = news?.blog?.content;

  console.log(news?.blog?.coverImage,"ffffffffffffffff");

  useEffect(() => {
    if (paragraphContent) {
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(paragraphContent, 'text/html');
      const text = parsedHtml.documentElement.textContent;
      setMetaDescription(text.substring(0, 160));
    }
  }, [paragraphContent]);

  const truncatedMetaDescription = metaDescription.length > 160 ? metaDescription.substring(0, 160) + '...' : metaDescription;

  

  const renderContent = () => {
    const router = useRouter();

    const currentUrl = router.pathname; // Get the current URL of the website

    const content = news?.blog?.content.replace(/(<h1>[^<]*<\/h1>)<br\s*\/?>/g, '$1').replace(/(<h2>[^<]*<\/h2>)<br\s*\/?>/g, '$1').replace(/<div>\s*<br\s*\/?>/, '<div>');

    if (!content) return null;

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const paragraphs = content.split('<br>');

    
    const renderedContent = []

    paragraphs.forEach((paragraph, index) => {
      if (youtubeRegex.test(paragraph)) {
        const videoId = extractYouTubeVideoId(paragraph);
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        renderedContent.push(
          <div key={index}>
            <iframe
              width="100%"
              height="315"
              src={embedUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      }

      renderedContent.push(
        <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></div>
      );
      if (index === 1 || index === 4 || index === 7 || index === 10 || index === 13 || index === 15 || index === 18 ) {
        renderedContent.push(<AdBlog dataAdSlot="4742766924" />);
      }

    }
    );
    return renderedContent;
  };


  const extractYouTubeVideoId = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(.+)$/;
    const match = url.match(youtubeRegex);


    if (match) {
      const videoId = match[4];

      return videoId;
    }
    return null;
  };

  const [relBlog, setRelBlog] = useState()
  const idArray = news?.blog?.tags.map(blog => blog.id);

  useEffect(() => {
    axios
      .post(
        process?.env?.NEXT_PUBLIC_API_URL +
        `blog/by-tags?pageSize=4&currentPage=1&orderBy=title&type=news`, { tags: idArray }

      )
      .then((response) => {
        setRelBlog(response.data.blogs)

      })
      .catch((error) => {

      });
  }, [])

  return (
    <Layout pageMeta={{
      title: `${news.blog.title}`,
      description: `${truncatedMetaDescription}`,
      type: "Car Review Website",
    }}>
      <div className="container single_news">
        <div className="row mt-2 mb-4">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <Breadcrumb />

            <Ad728x90 dataAdSlot="9708099244" />
            <h1 className="fw-bold mt-3">{news.blog.title}</h1>
            <p>{news.blog.summary}</p>
            <div className="d-flex align-items-center mt-3">
              <div
                className="rounded-circle border d-flex justify-content-center align-items-center p-3"
                style={{ width: 30, height: 30 }}
              >
                {/* {news.blog.author?.firstName
                  ? `${news?.blog?.author?.firstName}`.charAt(0)
                  : "C"} */}
                C
                {/* {`${news.blog.author}`.charAt(0)} */}
              </div>
              <div className="d-flex flex-column ms-2">
                <small className="fw-bold">By Carprices Team
                  {/* {news?.blog?.author?.firstName
                  ? news?.blog?.author?.firstName
                  : "Carprices Team"} */}
                </small>
                <small>
                  {moment(news.blog.publishedAt).format("MMMM Do YYYY")}
                </small>
              </div>
            </div>
            <div className="article_images my-3">
              <FeaturedImage width={966} height={500}
                src={news?.blog?.coverImage}
                alt={news?.blog?.title}
                title={news?.blog?.title}
              />
            </div>
            <div className="article_content">
              {renderContent()}
            </div>

            <br />
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 right_section">
            {/* <Ad300x250 />
            <div className="mt-3">
              <PopularCars />
            </div> */}
            <LatestBlog type="news" blogs={blogs} search={news?.blog?.categories[0]?.title} />
            {idArray?.length <= 0 ? "" : <><div className="d-sm-block d-none mt-3"><Ad300x250 dataAdSlot="9138071843" /></div><RelatedBlogs type="reviews" blogs={relBlog} />
            </>}
            <div className="hide_mobile sticky_scroll">
              <div className="d-flex flex-column mt-3 ">
                <Ad300x600 dataAdSlot="4810995789" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, res, params }) {
  // Fetch data from external API
  try {
    const slug = params.slug;
    let resNews = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "blog/" + slug
    );

    if (resNews.data.blog.type == "review") {
      return {
        redirect: {
          permanent: true,
          destination: `/reviews/${slug}`,
        },
        props: {},
      }
    }

    let resBlogs = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "blog/min" + "?pageSize=5&type=news"
    );

    let blogs = resBlogs.data;
    // 

    let news = resNews.data;
    // Pass data to the page via props
    return {
      props: {
        news,
        blogs,
      },
    }
  } catch (error) {

    if (error.response && error.response.status !== 200) {
      return {
        notFound: true, // Treat non-200 responses as 404 errors
      }
    } else {
      return {
        notFound: true, // Treat non-200 responses as 404 errors
      };
    }
  }
}
