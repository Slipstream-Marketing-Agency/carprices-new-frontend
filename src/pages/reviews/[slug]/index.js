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
import Image from "next/image";
import Ad728x90 from "@/src/components/ads/Ad728x90";
SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);
import altImage from "../../../../public/assets/images/blog-alt-image.png";
import Ad160x600 from "@/src/components/ads/Ad160x600";
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
import BlogRecent from "@/src/components/BlogRecent";
import BlogRelated from "@/src/components/BlogRelated";
import TabNavigation from "@/src/components/TabNavigation";
import MoreBrands from "@/src/components/MoreBrands";
import SocialButtons from "@/src/components/common/SocialButtons";
import useTranslate from "@/src/utils/useTranslate";
import Ad970x250 from "@/src/components/ads/Ad970x250";
import Ad300x600 from "@/src/components/ads/Ad300x600";
import Ad300x250 from "@/src/components/ads/Ad300x250";
import AdBlog from "@/src/components/ads/AdBlog";

const adCode =
  '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle text-center" style="display:inline-block;width:728px;height:90px;background-color:rosybrown" data-ad-client="ca-pub-1234567890123456" data-ad-slot="1234567890"><span class="text-white">728*90</span></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';

function BlogDetailsPage({
  detailData,
  recentBlog,
  fullURL,
  recentReviews,
  popularBrands,
}) {
  const [activeTab, setActiveTab] = useState("tab1");
  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const handleTabChange = (selectedTab) => {
    setActiveTab(selectedTab);
  };

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
  // const paragraphContent = Review?.blog?.content;

  const [metaDescription, setMetaDescription] = useState("");
  const paragraphContent = detailData.content;

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
    const router = useRouter();

    const currentUrl = router.pathname; // Get the current URL of the website

    const content = detailData.content
      .replace(/(<h1>[^<]*<\/h1>)<br\s*\/?>/g, "$1")
      .replace(/(<h2>[^<]*<\/h2>)<br\s*\/?>/g, "$1")
      .replace(/<div>\s*<br\s*\/?>/, "<div>");

    if (!content) return null;

    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const paragraphs = content.split("<br>");

    const renderedContent = [];

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

  console.log(detailData);
  // console.log(recentBlog);

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
        title: `${detailData?.metaTitle}`,
        description: ``,
        type: "Car Review Website",
      }}
    >
      <div className="hidemobile">
        <Ad970x250 dataAdSlot="5962627056" />
      </div>
      <div className="hidedesktop">
        <Ad300x250 dataAdSlot="9351332409" />
      </div>

      <div className="blog-details-page mt-3">
        <div className="container">
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-8">
              <h1 className="post-title mb-3">{detailData?.title}</h1>
              <div className="post-thumb">
                {/* <img className="" src={detailData.coverImage.data.attributes.url}  alt="blog image" /> */}
                <div className="position-relative ">
                  <Image
                    src={
                      detailData?.coverImage?.data?.attributes?.url
                        ? detailData?.coverImage.data?.attributes?.url
                        : altImage
                    }
                    alt="blog image"
                    layout="responsive"
                    width={300}
                    height={205}
                    objectFit="cover"
                    className="blogImage"
                  />
                </div>
                {/* <div className="date">
                        <span className="text-white p-1">Buying Advice</span>
                    </div> */}
              </div>

              {/* <div className="author-area"> */}
              <div className="row mb-3">
                <div className="col-xl-6">
                  <div className="d-flex align-items-center gap-3">
                    {/* <div className="author-img">
                      <span className="border rounded-circle px-2 py-1">C</span>
                    </div> */}

                    <div className="author-content">
                      <h6 className="mt-0">
                        {detailData?.author?.data?.attributes?.name} /{" "}
                        <span className="postedOnStyle">
                          {isRtl && " - "}
                          {t.postedOn}
                          {!isRtl && " - "}
                        </span>{" "}
                        <span className="postedOnStyle">
                          {moment(detailData?.publishedAt).format(
                            "MMMM Do YYYY"
                          )}
                        </span>
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 m-auto mt-2 mt-md-0">
                  <div className="d-flex justify-content-md-end align-items-center">
                    {" "}
                    <SocialButtons fullURL={currentURL} />{" "}
                  </div>
                </div>
                {/* </div> */}
              </div>

              <p>{detailData?.summary}</p>
              {/* <div dangerouslySetInnerHTML={{ __html: detailData?.content }} /> */}
              <div
                // dangerouslySetInnerHTML={{ __html: dynamicHTML }}
                className="article-content"
              >
                {" "}
                {renderContent()}
              </div>

              <div className="d-flex justify-content-md-end align-items-center">
                <SocialButtons fullURL={currentURL} />
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 my-3 hideOnSmallScreen">
              <div className="blog-sidebar mb-50">
                <div className="white_bg_wrapper mt-3 px-1 py-3">
                  <h4 className="px-2">
                    Latest Review <hr className="my-2" />
                  </h4>

                  <div>
                    {" "}
                    <BlogRecent
                      disableMarginTop={true}
                      disableBorder={true}
                      blogs={recentBlog}
                      heading={"Related Review"}
                      disableHeading={true}
                    />
                  </div>
                  {/* {activeTab === "tab2" && (
                    <div>
                      {" "}
                      <BlogRecent
                        disableMarginTop={true}
                        disableBorder={true}
                        blogs={recentBlog}
                        heading={"Recent Review"}
                        disableHeading={true}
                      />
                    </div>
                  )} */}
                </div>
                {detailData?.article_categories?.data.length > 0 && (
                  <div className="white_bg_wrapper mt-3 px-1 py-3">
                    <h4 className="px-2">
                      Related Review <hr className="my-2" />
                    </h4>
                    <div>
                      <BlogRelated
                        disableMarginTop={true}
                        disableBorder={true}
                        blogs={detailData?.article_categories?.data}
                        heading={"Related Review"}
                        tab1={"Trending"}
                        tab2={"Recent"}
                      />
                    </div>
                  </div>
                )}

                {/* <MoreBrands /> */}
                <div className="my-3">
                  <Ad300x250 dataAdSlot="3792539533" />
                </div>
                <div className="my-3 sticky_scroll">
                  <Ad300x600 dataAdSlot="3792539533" />
                </div>
              </div>

              {/* <div className="single-widgets sidebar-banner">
                                <div className="product-content">
                                    <div className="text">
                                    <h4><a href="#">Mercedes-Benz <span>( Model-S13)</span></a></h4>
                                    <h6>For Summer Offer</h6>
                                    </div>
                                    <div className="offer-batch">
                                    <h3>30%</h3>
                                    <span>Discount</span>
                                    </div>
                                </div>
                                <div className="product-img">
                                    <img src="assets/img/inner-page/sb-banner-img.png" alt="" />
                                </div>
                                </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <Ad728x90 dataAdSlot="5962627056" /> */}
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
  // console.log(ReviewData, "my slug"); // Log the slug value
  console.log("jh");

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

    return {
      props: {
        detailData: data?.articles?.data[0]?.attributes || null,
        recentBlog: recentBlog?.data?.articles?.data,
        fullURL,
        recentReviews: recentReviewsData?.data?.articles?.data,
      },
    };
  } catch (error) {
    console.error("Server-side Data Fetching Error:", error.message);
    return {
      props: {
        error: true,
        errorMessage: error.message,
      },
    };
  }
}
export default BlogDetailsPage;
