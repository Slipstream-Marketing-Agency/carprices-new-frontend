import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MainLayout from "@/src/layout/MainLayout";
import { gql } from "@apollo/client";
import { createApolloClient } from "@/src/lib/apolloClient";
import { useRouter } from "next/router";
import EmailIcon from '@mui/icons-material/Email';
import InstagramIconMui from '@mui/icons-material/Instagram';
import TwitterIconMui from '@mui/icons-material/Twitter';
import LinkedInIconMui from '@mui/icons-material/LinkedIn';
import Image from "next/image";
import Ad728x90 from "@/src/components-old/ads/Ad728x90";
SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);
import altImage from "../../../../public/assets/images/blog-alt-image.png";
import Ad160x600 from "@/src/components-old/ads/Ad160x600";
import EastIcon from "@mui/icons-material/East";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  InstagramShareButton,
  InstagramIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";
import moment from "moment/moment";
import BlogRecent from "@/src/components-old/BlogRecent";
import BlogRelated from "@/src/components-old/BlogRelated";
import TabNavigation from "@/src/components-old/TabNavigation";
import MoreBrands from "@/src/components-old/MoreBrands";
import SocialButtons from "@/src/components-old/common/SocialButtons";
import useTranslate from "@/src/utils/useTranslate";
import Ad970x250 from "@/src/components-old/ads/Ad970x250";
import Ad300x600 from "@/src/components-old/ads/Ad300x600";
import Ad300x250 from "@/src/components-old/ads/Ad300x250";
import AdBlog from "@/src/components-old/ads/AdBlog";
import axios from "axios";
import ShareButton from "@/src/components/common/ShareButton";
import SeoLinksFilter from "@/src/components/common/SeoLinksFilter";
import OptimizedImage from "@/src/components/common/image/OptimisedImage";

const adCode =
  '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle text-center" style="display:inline-block;width:728px;height:90px;background-color:rosybrown" data-ad-client="ca-pub-1234567890123456" data-ad-slot="1234567890"><span class="text-white">728*90</span></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';

function BlogDetailsPage({
  detailData,
  recentBlog,
  fullURL,
  recentReviews,
  popularBrands,
  popularArticles,
  articlesThisWeek,
  article,
}) {
  console.log(recentBlog, "articlesThisWeek");
  const [activeTab, setActiveTab] = useState("tab1");
  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const handleTabChange = (selectedTab) => {
    setActiveTab(selectedTab);
  };
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the threshold as needed
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML =
      "@media (min-width: 768px) { p img { height: 421px !important; } }";
    document.head.appendChild(styleTag);
  }, []);

  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === "ar";

  // const [isMobile, setIsMobile] = useState(false);

  // const [dynamicHTML, setDynamicHTML] = useState("");
  // const [isModified, setIsModified] = useState(false);

  // if (!detailData) {
  //   return (
  //     <div>
  //       <Error />
  //     </div>
  //   );
  // }

  // // Assume detailData.content contains the provided HTML content
  // // This is your initial state
  // const initialHTML = detailData?.content;

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 767);
  //   };

  //   handleResize();

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  // useEffect(() => {
  //   // Fetch dynamic HTML content when component mounts
  //   setDynamicHTML(initialHTML);
  // }, [initialHTML]);

  // useEffect(() => {
  //   if (dynamicHTML && !isModified) {
  //     let modifiedHTML = dynamicHTML
  //       .replace(/<h1([^>]*)>/g, '<h2   $1 style="margin-top: 20px;">')
  //       .replace(/<h2([^>]*)>/g, '<h2$1 style="margin-top: 20px;">')
  //       .replace(/<p><br\s*\/?><\/p>/g, '<p$1 style="margin-top: 30px;">')
  //       .replace(
  //         /<img([^>]*)>/g,
  //         '<img$1 style="width: 100%;border-radius: 10px;">'
  //       )

  //       .replace(
  //         /<h3([^>]*)>\s*<strong([^>]*)>(.*?)<\/strong>\s*<\/h3>/g,
  //         "<h3$1>$3</h3>"
  //       )

  //       .replace(/<p>&nbsp;<\/p>/g, '<p style="margin-top: 30px;"></p>')

  //       .replace(
  //         /<a href="(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})[^<]*<\/a>/g,
  //         "https://www.youtube.com/watch?v=$1"
  //       )
  //       .replace(
  //         /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/g,
  //         '<a href="https://www.youtube.com/watch?v=$1">https://www.youtube.com/watch?v=$1</a>'
  //       )
  //       //  .replace(/&lt;GoogleAd&gt;/g, `<div class="w-100  my-2"><div dangerouslySetInnerHTML={{ __html: '${adCode}</h2></div>`)

  //       .replace(
  //         /<a href="(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/(?:[^\/\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|\.be\/)([^"&?\/\s]{11})[^<]*<\/a>/g,
  //         `<iframe class="my-3" width="100%" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  //       )
  //       .replace(/<p>\s*<br\s*\/?>\s*&nbsp;\s*<\/p>/g, "");
  //     if (!isMobile) {
  //       modifiedHTML = modifiedHTML.replace(
  //         /&lt;GoogleAd&gt;/g,
  //         `<div class="w-100 my-2"><div dangerouslySetInnerHTML={{ __html: '${adCode}'</div></div>`
  //       );
  //     } else {
  //       modifiedHTML = modifiedHTML.replace(/&lt;GoogleAd&gt;/g, ``);
  //     }

  //     setDynamicHTML(modifiedHTML);
  //     setIsModified(true); // Set the flag to true to avoid further modification
  //   }
  // }, [dynamicHTML, isModified]);

  // const [metaDescription, setMetaDescription] = useState("");
  // const paragraphContent = review?.blog?.content;

  const [metaDescription, setMetaDescription] = useState("");
  const paragraphContent = article?.content;

  useEffect(() => {
    if (paragraphContent) {
      const parser = new DOMParser();
      const parsedHtml = parser.parseFromString(paragraphContent, "text/html");
      const text = parsedHtml.documentElement.textContent;
      setMetaDescription(text.substring(0, 160));
    }
  }, [paragraphContent]);

  const truncatedMetaDescription =
    metaDescription.length > 160
      ? metaDescription.substring(0, 160) + "..."
      : metaDescription;

  const renderContent = () => {
    let content = article?.content;
    if (!content) return null;

    // Replace all <p>&nbsp;</p> with <br> tags
    content = content.replace(/<p>(&nbsp;|\s*)<\/p>/g, '<br />');

    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const paragraphs = content.split("<br>");

    const renderedContent = [];

    paragraphs.forEach((paragraph, index) => {
      // Handle YouTube links
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
      } else {
        // Add the paragraph to the content
        renderedContent.push(
          <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }}></div>
        );
      }

      // Optionally, inject ads after certain paragraphs
      if (
        index === 1 ||
        index === 4 ||
        index === 7 ||
        index === 10 ||
        index === 13 ||
        index === 15 ||
        index === 18
      ) {
        renderedContent.push(<AdBlog dataAdSlot="4742766924" />);
      }
    });

    return renderedContent;
  };

  function stripHtmlTags(htmlContent) {
    return htmlContent.replace(/<\/?[^>]+>/gi, '');
  }

  function countWords(htmlContent) {
    const textContent = stripHtmlTags(htmlContent);
    const words = textContent.split(/\s+/);
    return words.length;
  }

  function countCharacters(htmlContent) {
    const textContent = stripHtmlTags(htmlContent);
    return textContent.length;
  }

  // Example usage
  const articleContent = article?.content;

  function estimateReadTime(htmlContent) {
    const wordCount = countWords(htmlContent);
    const wordsPerMinute = 200; // Average reading speed
    const minutes = wordCount / wordsPerMinute;
    return Math.ceil(minutes);
  }

  const readTime = estimateReadTime(article?.content);


  const extractYouTubeVideoId = (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(.+)$/;
    const match = url.match(youtubeRegex);

    if (match) {
      const videoId = match[4];

      return videoId;
    }
    return null;
  };

  const settings = useMemo(() => {
    return {
      speed: 1500,
      spaceBetween: 24,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".next-51",
        prevEl: ".prev-51",
      },
    };
  });

  return (
    <MainLayout
      pageMeta={{
        title: `${article?.metaTitle}`,
        description: `${article?.summary}`,
        type: "Car review Website",
      }}
    >
      {/* <div className="hidemobile">
        <Ad970x250 dataAdSlot="5962627056" />
      </div>
      <div className="hidedesktop">
        <Ad300x250 dataAdSlot="9351332409" />
      </div> */}

      <section className="tw-container">
        <div className="sm:tw-grid tw-gap-10 tw-grid-cols-12 tw-my-6 ">
          <div className="sm:tw-col-span-9 tw-space-y-6">
            <div className="tw-mb-20">
              <div className="tw-capitalize tw-font-bold tw-text-2xl sm:tw-text-5xl">
                {article?.title}
              </div>
              <div className="tw-flex tw-justify-between tw-items-center tw-my-2 sm:tw-my-4  tw-text-xs sm:tw-text-sm">
                <span className="tw-text-gray-400  tw-space-x-3">
                  <span>{article?.author}</span>
                  <span>|</span>
                  <span>
                    {moment(article?.publishedAt).format("MMMM Do YYYY")}
                  </span>
                  <span>|</span>
                  <span>{readTime} minute(s) read</span>
                </span>
                <div className="sm:tw-mr-6">
                  <ShareButton
                    url={fullURL}
                    title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
                  />
                </div>
              </div>
              <div className="tw-my-4 sm:tw-my-4">
                {article?.summary !== "" && (
                  <p className="tw-font-semibold tw-my-4">{article?.summary}</p>
                )}
                <div className="tw-flex tw-gap-4">
                  <Image
                    src={
                      article?.coverImage
                        ? article?.coverImage
                        : "/assets/img/car-placeholder.png"
                    }
                    alt="Cover Image"
                    width={300}
                    height={205}
                    layout="responsive"  // Ensure the image is responsive to container size
                    quality={100}  // Increase image quality to avoid pixelation
                    className="tw-object-contain tw-w-full"
                  />
                </div>
                <p className="tw-mt-4  article-content">{renderContent()}</p>
              </div>
            </div>

            <div className="tw-my-6">
              <h6 className="tw-text-blue-600 tw-font-semibold tw-text-xs tw-uppercase tw-leading-5 tw-tracking-wider">
                Trending automotive review
              </h6>
              <div className="tw-flex tw-items-center tw-justify-between tw-font-semibold tw-mt-1">
                <h2 className="tw-capitalize tw-text-lg sm:tw-text-xl">
                  Latest Automotive Reviews
                </h2>
                <div className="sm:tw-mr-6 tw-text-xs sm:tw-text-sm">
                  View more
                </div>
              </div>
            </div>
            <div className="tw-grid tw-gap-4 tw-grid-cols-12">
              {recentBlog.map((blog, index) => (
                <Link
                  legacyBehavior
                  href={`/review/${blog?.attributes?.slug}`}
                  key={blog?.id}
                >
                  <div
                    key={index}
                    className="tw-relative tw-col-span-6 md:tw-col-span-4 tw-rounded-[14px] tw-shadow-lg"
                  >
                    {/* <div className="tw-bg-button-bg tw-text-white tw-rounded-e-xl tw-absolute tw-top-2 sm:tw-top-3 tw-left-0 tw-px-1 sm:tw-px-4 tw-py-1 tw-font-thin tw-text-xs sm:tw-text-sm">
                    Trending
                  </div> */}
                    <OptimizedImage
                      src={
                        blog?.attributes?.coverImage?.data?.attributes?.url ||
                        altImage
                      }
                      alt="image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      layout="fixed"
                      className="tw-w-full md:tw-h-[200px] tw-h-[100px] tw-object-cover tw-rounded-t-[14px] "
                    // style={{ width: "100%", height: "60%" }}
                    />
                    <div className="tw-p-2">
                      <div className="sm:tw-text-base 4xl:tw-text-2xl tw-text-sm tw-truncate md:tw-whitespace-normal tw-font-semibold">
                        {`${blog?.attributes?.title?.length > 20
                            ? `${blog?.attributes?.title?.slice(0, 50)}... `
                            : `${blog?.attributes?.title}`
                          }`}
                      </div>
                      <div className="tw-flex tw-flex-col tw-justify-between">
                        <div>
                          <div className="tw-text-xs tw-leading-9 tw-text-gray-700">
                            <span className="tw-hidden sm:tw-inline">
                              {blog?.attributes?.author?.data?.attributes?.name}{" "}
                              &mdash;
                            </span>{" "}
                            {moment(
                              blog?.attributes?.author?.data?.attributes
                                ?.publishedAt
                            ).format("MMMM Do YYYY")}
                          </div>
                          <div className="tw-line-clamp-3 tw-text-xs tw-text-gray-500 ">
                            {blog?.attributes?.summary}
                          </div>
                        </div>{" "}
                        <Link
                          legacyBehavior
                          href={`/review/${blog?.attributes?.slug}`}
                          key={blog?.id}
                        >
                          <button className="tw-bg-transparent tw-text-xs 4xl:tw-text-sm tw-my-4 tw-hidden sm:tw-flex tw-items-center">
                            Know More
                            <EastIcon className="tw-text-lg tw-ml-2" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className=" sm:tw-col-span-3 tw-space-y-6">
            <div className="tw-my-6 tw-border-solid tw-border tw-p-4 tw-rounded-[15px] tw-border-gray-300">
              <div className="tw-flex tw-place-items-center tw-space-x-3 tw-mb-4">
                <Image
                  src={"https://cdn.carprices.ae/assets/Martin_Alva_7e01cef081.jpg"}
                  width={80}
                  height={80}
                  alt="author-martin"
                  className="tw-object-cover tw-rounded-full tw-w-[70px] tw-h-[70px]"
                />
                <div>
                  <h6 className="tw-text-blue-600 tw-font-semibold tw-text-xs tw-uppercase tw-mb-0">
                    Author
                  </h6>
                  <h1 className="tw-text-lg !tw-text-[1.2rem] sm:tw-text-xl tw-font-bold">
                    Martin V Alva
                  </h1>
                </div>
              </div>

              <div className="tw-space-y-4">
                <div className="tw-text-sm">
                  I began my writing career in 2007 with Overdrive, India’s largest automotive magazine, where I worked as a photojournalist covering motorsports events and conducting car and motorcycle reviews. My expertise in content creation later led me to corporate roles as a marketing specialist for renowned brands such as Royal Enfield, General Motors, Toyota, Mercedes-Benz, Lexus, and Jeep. Driven by my passion for both writing and the automotive industry, I have also contributed to prominent local and regional publications, including Silodrome, Top Gear, Drive Arabia, Auto Middle East, Motorcycle UAE, Bike Nation, Gulf News, and more.
                </div>

                {/* Social Links */}
                <div className="tw-flex tw-space-x-2">
                  <a
                    href="mailto:martin@slipstream.agency"
                    className="tw-flex tw-items-center tw-text-blue-600 tw-font-semibold tw-border tw-border-blue-600 tw-rounded-full tw-py-1 tw-px-2 tw-text-sm tw-transition-all hover:tw-bg-blue-600 hover:tw-text-white"
                  >
                    <EmailIcon className=" tw-h-5 tw-w-5" />
                  </a>
                  <a
                    href="https://instagram.com/motorbikeman"
                    target="_blank"
                    className="tw-flex tw-items-center tw-text-pink-500 tw-font-semibold tw-border tw-border-pink-500 tw-rounded-full tw-py-1 tw-px-2 tw-text-sm tw-transition-all hover:tw-bg-pink-500 hover:tw-text-white"
                  >
                    <InstagramIconMui className=" tw-h-5 tw-w-5" />
                  </a>
                  <a
                    href="https://twitter.com/motorbikeman"
                    target="_blank"
                    className="tw-flex tw-items-center tw-text-blue-400 tw-font-semibold tw-border tw-border-blue-400 tw-rounded-full tw-py-1 tw-px-2 tw-text-sm tw-transition-all hover:tw-bg-blue-400 hover:tw-text-white"
                  >
                    <TwitterIconMui className=" tw-h-5 tw-w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/martin-victor-alva"
                    target="_blank"
                    className="tw-flex tw-items-center tw-text-blue-400 tw-font-semibold tw-border tw-border-blue-400 tw-rounded-full tw-py-1 tw-px-2 tw-text-sm tw-transition-all hover:tw-bg-blue-400 hover:tw-text-white"
                  >
                    <LinkedInIconMui className=" tw-h-5 tw-w-5" />
                  </a>
                </div>
              </div>
            </div>
            {articlesThisWeek?.length > 0 && (
              <div>
                <h4 className="tw-font-bold">From This week</h4>
                <hr className="tw-my-2" />
                {articlesThisWeek?.map((blog) => (
                  <Link
                    legacyBehavior
                    href={`/review/${blog?.slug}`}
                    key={blog?.id}
                  >
                    <div className="tw-w-full">
                      <div className="tw-flex tw-my-2">
                        <Image
                          src={blog?.coverImage}
                          alt={blog?.title}
                          width={40}
                          height={40}
                          className="tw-object-cover"
                        />
                        <p className="tw-text-sm tw-mx-2  tw-text-gray-600 tw-line-clamp-2">
                          {`${blog?.title}`}
                        </p>
                      </div>
                      <hr className="my-0" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <Ad300x600 dataAdSlot="3792539533" />

            <div>
              <h4 className="tw-font-bold">Latest Reviews</h4>
              <hr className="tw-my-2" />
              <BlogRecent blogs={recentBlog} disableHeading={true} />
            </div>

            {/* <div>
              <h4 className="tw-font-bold">Related News</h4>
              <hr className="tw-my-2" />
              <BlogRecent
                blogs={detailData?.article_categories?.data}
                disableHeading={true}
              />
            </div> */}
          </div>
        </div>

        {/* <NewsFeeds /> */}
      </section>

      {/* <div className="container">
        <div className="row g-2 mt-3 white_bg_wrapper ">
          <h4 className="fw-bold mt-2 box_header mb-3">Popular News</h4>

          {popularArticles?.map((reviewItem, index) => {

            return (
              <React.Fragment key={`review`}>
                <div
                  className="col-xl-3 col-lg-6 col-md-6 col-6 wow fadeInUp mt-0 mb-2"
                  data-wow-delay="200ms"
                >
                  <div className="review-card">
                    <div className="review-img list-article">
                      <Link legacyBehavior href={`/review/${reviewItem.slug}`}>
                        <a>
                          <div className="position-relative imageContainer">
                            <Image
                              src={
                                reviewItem.coverImage
                                  ? reviewItem.coverImage
                                  : altImage
                              }
                              alt="Article Image"
                              layout="responsive"
                              width={300}
                              height={205}
                              objectFit="cover"
                            />
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="content">
                      <h6 className="mt-2 mb-1 blog_title_list_truncate">
                        {reviewItem.title}
                      </h6>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div> */}
      {/* <Ad728x90 dataAdSlot="5962627056" /> */}
      <div className="tw-container tw-mx-auto">
        {" "}
        <SeoLinksFilter />
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.params; // Access the slug parameter from context.params

  const { req } = context;
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const fullURL = `${protocol}://${host}${req.url}`;

  const apolloClient = createApolloClient();
  // Fetch data based on the slug (e.g., from a database)

  try {
    const { data } = await apolloClient.query({
      query: gql`
            query{
                articles(filters:{slug:{eq:"${slug}"}}){
                  meta{
                    pagination{
                      total
                      page
                      pageSize
                      pageCount
                    }
                  }
                  data{
                    attributes{
                        article_categories{
                            data{
                              attributes{
                                name
                                slug
                                articles{
                                  data{
                                    attributes{
                                        title
                                        slug
                                      coverImage{
                                        data{
                                          attributes{
                                            url
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                        }
                      title
                      slug
                      metaTitle
                      content
                      summary
                      createdAt
                      author{
                        data{
                          attributes{
                            name
                            createdAt
                          }
                        }
                      }
                      coverImage{
                        data{
                          attributes{
                            url
                            width
                            height
                          }
                        }
                      }
                    }
                  }
                }
        }
          `,
    });

    const recentBlog = await apolloClient.query({
      query: gql`
        query {
          articles(
            filters: { article_type: { type: { eq: "Review" } } }
            pagination: { limit: 6 }
            sort: "createdAt:desc"
          ) {
            data {
              attributes {
                title
                slug
                content
                summary
                createdAt
                author {
                  data {
                    attributes {
                      name
                      publishedAt
                    }
                  }
                }
                coverImage {
                  data {
                    attributes {
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });
    const recentReviewsData = await apolloClient.query({
      query: gql`
        query {
          articles(
            filters: { article_type: { type: { eq: "Review" } } }
            pagination: { limit: 6 }
            sort: "createdAt:desc"
          ) {
            data {
              attributes {
                title
                slug
                content
                createdAt
                author {
                  data {
                    attributes {
                      name
                      publishedAt
                    }
                  }
                }
                coverImage {
                  data {
                    attributes {
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

    const popularArticles = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}articles/listArticlesByEngagement?pageSize=11`
    );

    const articlesThisWeek = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}articles/listlasttwoweeks?slug=review`
    );

    const article = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}articles/findone/${slug}/review`
    );

    if (article?.data?.current?.content === undefined) {
      // If no articles are found, trigger a 404 response
      return { notFound: true };
    }

    return {
      props: {
        detailData: data?.articles?.data[0]?.attributes || null,
        recentBlog: recentBlog?.data?.articles?.data,
        fullURL,
        recentReviews: recentReviewsData?.data?.articles?.data,
        popularArticles: popularArticles.data.data,
        articlesThisWeek: articlesThisWeek.data.data,
        article: article.data.current,
      },
    };
  } catch (error) {
    console.error("Server-side Data Fetching Error:", error.message);
    // If an error occurs (e.g., network error, data fetching error), trigger a 404 response
    return { notFound: true };
  }
}
export default BlogDetailsPage;
