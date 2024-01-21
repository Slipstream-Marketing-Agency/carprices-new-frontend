import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MainLayout from "@/src/layout/MainLayout";
import Ad728x90 from "@/src/components/ads/Ad728x90";
import Ad300x250 from "@/src/components/ads/Ad300x250";
import { createApolloClient } from "@/src/lib/apolloClient";
import { gql } from "@apollo/client";
import Image from "next/image";
import altImage from '../../../../public/assets/images/blog-alt-image.png'
import Ad160x600 from "@/src/components/ads/Ad160x600";
import Script from 'next/script'

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
} from 'next-share';
import moment, { isMoment } from "moment/moment";
import Ad970x250 from "@/src/components/ads/Ad970x250";
import { useRouter } from "next/router";
import Error from "../../error";
import BlogRelated from "@/src/components/BlogRelated";
import BlogRecent from "@/src/components/BlogRecent";

const adCode = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle text-center" style="display:inline-block;width:728px;height:90px;background-color:rosybrown" data-ad-client="ca-pub-1234567890123456" data-ad-slot="1234567890"><span class="text-white">728*90</span></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>'
const myAdCode = <Ad728x90 dataAdSlot="5962627056" />
// Assume this is the function that modifies the dynamicHTML

SwiperCore.use([Pagination, Autoplay, EffectFade, Navigation]);

function BlogDetailsPage({ detailData, recentBlog, fullURL, recentNews }) {
    const router = useRouter()
    const [initialScreening, setInitialScreening] = useState(true)

    if (!detailData) {
        return <div>
            <Error />
        </div>;
    }

    // console.log("detailData ",detailData.article_categories.data);
    const [dynamicHTML, setDynamicHTML] = useState('');
    const [isModified, setIsModified] = useState(false);

    // Assume detailData.content contains the provided HTML content
    // This is your initial state
    const initialHTML = detailData.content;



    useEffect(() => {
        setDynamicHTML(initialHTML);
    }, [initialHTML]);

    useEffect(() => {
        if (dynamicHTML && !isModified) {
            const modifiedHTML = dynamicHTML
                .replace(/<h1([^>]*)>/g, '<h2$1 style="margin-top: 20px;">')
                .replace(/<h2([^>]*)>/g, '<h2$1 style="margin-top: 20px;">')
                .replace(/<p><br\s*\/?><\/p>/g, '<p$1 style="margin-top: 30px;">')
                .replace(/<img([^>]*)>/g, '<img$1 style="width: 100%;border-radius: 10px;">')
                .replace(/<p>&nbsp;<\/p>/g, '<p style="margin-top: 30px;"></p>')
                .replace(
                    /<a href="(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})[^<]*<\/a>/g,
                    'https://www.youtube.com/watch?v=$1'
                )
                .replace(
                    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/g,
                    '<a href="https://www.youtube.com/watch?v=$1">https://www.youtube.com/watch?v=$1</a>'
                )
                .replace(/&lt;GoogleAd&gt;/g, `<div class="w-100  my-2"><div dangerouslySetInnerHTML={{ __html: '${adCode}</h2></div>`)

                .replace(
                    /<a href="(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/(?:[^\/\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|\.be\/)([^"&?\/\s]{11})[^<]*<\/a>/g,
                    `<iframe class="my-3" width="100%" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                )
                .replace(/<p>&nbsp;\s*\/?<\/p>/g, '<p$1 style="margin-top: 20px;">')

            setDynamicHTML(modifiedHTML);
            setIsModified(true); // Set the flag to true to avoid further modification
        }
    }, [dynamicHTML, isModified]);

    console.log(detailData);
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
        }
    })
    return (
        <MainLayout pageMeta={{
            title: `${detailData?.metaTitle}`,
            description: ``,
            type: "Car review Website",
        }}>

            <br />
            <Ad728x90 dataAdSlot="5962627056" />


            <div className="blog-details-page pt-5 mb-100">
                <div className="container">
                    <div className="row g-lg-4 gy-5">
                        <div className="col-lg-8">
                            <div className="post-thumb">
                                {/* <img className="" src={detailData.coverImage.data.attributes.url}  alt="blog image" /> */}
                                <div className="position-relative ">
                                    <Image
                                        src={detailData?.coverImage?.data?.attributes?.url ? detailData.coverImage.data?.attributes.url : altImage}
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
                            <h5 className="post-title">{detailData?.title}</h5>
                            <div className="author-area">
                                <div className="author-img">
                                    {/* <img src={detailData.coverImage.data.attributes.url} alt="blog image" /> */}
                                    <span className="border rounded-circle px-2 py-1">C</span>
                                </div>
                                <div className="author-content">
                                    <h6>{detailData?.author?.data?.attributes?.name}</h6>
                                    <span>Posted on -  {moment(detailData?.author?.data?.attributes?.createdAt).format("MMMM Do YYYY")}</span>
                                </div>
                            </div>
                            <p>{detailData?.summary}</p>
                            <div dangerouslySetInnerHTML={{ __html: dynamicHTML }} />
                            {/* <blockquote> 
                    <div className="quoat-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width={27} height={18} viewBox="0 0 27 18">
                        <path d="M21.6832 6.05443L21.4534 6.62147L22.0549 6.73371C24.6453 7.21714 26.5 9.46982 26.5 12.0337C26.5 13.573 25.8343 15.0529 24.6667 16.09C23.4982 17.1192 21.9207 17.6286 20.3329 17.4722C17.4907 17.1844 15.2846 14.6588 15.3404 11.7032C15.4201 7.67759 16.8945 5.07458 18.6289 3.38578C20.3761 1.68459 22.4158 0.884497 23.6452 0.531618L23.6591 0.527628L23.6728 0.52284C23.7152 0.507954 23.7704 0.5 23.8713 0.5C24.1425 0.5 24.3799 0.624329 24.5265 0.85037L24.5277 0.852289C24.7128 1.13485 24.6857 1.4981 24.4524 1.75822L24.4523 1.75827C23.2163 3.13698 22.2806 4.57999 21.6832 6.05443Z" />
                        <path d="M7.84136 6.05442L7.61159 6.62147L8.21303 6.73371C10.8035 7.21714 12.6582 9.46983 12.6582 12.0337C12.6582 13.573 11.9925 15.0529 10.8249 16.09C9.65615 17.1194 8.07865 17.6285 6.50008 17.4722C3.67976 17.1842 1.49865 14.7207 1.49865 11.8126V11.6985C1.57946 7.67556 3.05336 5.07393 4.7871 3.38579C6.53424 1.6846 8.574 0.884504 9.8034 0.531628L9.81731 0.527636L9.83096 0.522848C9.8734 0.507959 9.92859 0.500008 10.0294 0.500008C10.3007 0.500008 10.5381 0.624359 10.6846 0.850338L10.6859 0.852327C10.871 1.13488 10.8439 1.49811 10.6106 1.75823L10.6105 1.75828C9.37446 3.13698 8.43881 4.57999 7.84136 6.05442Z" />
                        </svg>
                    </div>
                    <svg className="vector" xmlns="http://www.w3.org/2000/svg" height={95} viewBox="0 0 15 95">
                        <path d="M0 26.0484V21.4517L15 36.7742V41.3709L0 26.0484Z" />
                        <path d="M0 36.774V32.1772L15 47.4998V52.0965L0 36.774Z" />
                        <path d="M0 4.59676V0L15 15.3225V19.9193L0 4.59676Z" />
                        <path d="M0 15.3223V10.7256L15 26.0481V30.6449L0 15.3223Z" />
                        <path d="M0 47.5001V42.9033L15 58.2258V62.8226L0 47.5001Z" />
                        <path d="M0 58.2247V53.6279L15 68.9504V73.5472L0 58.2247Z" />
                        <path d="M0 68.9512V64.3545L15 79.677V84.2738L0 68.9512Z" />
                        <path d="M0 79.6773V75.0806L15 90.4031V94.9998L0 79.6773Z" />
                    </svg>
                    <p>We denounce with righteous indignation and dislike men who are so great  demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot . <span>Rakhab Uddin</span></p>
                    </blockquote> */}

                            <div className="blog-tag-social-area">
                                <div className="bolg-tag">
                                    {/* <h6>Tag:</h6>
                        <ul>
                        <li>Brand Car,</li>
                        <li>Driving,</li>
                        <li>Car Service,</li>
                        <li>Car Advice</li>
                        </ul> */}
                                </div>
                                <div className="social-area">
                                    <h6>Share:</h6>
                                    <ul className="social-link d-flex align-items-center">
                                        <FacebookShareButton
                                            url={fullURL} >
                                            <FacebookIcon size={26} round />
                                        </FacebookShareButton>
                                        <WhatsappShareButton
                                            url={fullURL} >
                                            <WhatsappIcon size={26} round />
                                        </WhatsappShareButton>

                                        <LinkedinShareButton
                                            url={fullURL} >
                                            <LinkedinIcon size={26} round />
                                        </LinkedinShareButton>

                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog-sidebar mb-50" style={{ position: 'sticky', top: '-1155px' }}>

                                <BlogRelated blogs={detailData?.article_categories?.data} heading={'Related News'} />
                                <BlogRecent blogs={recentNews} heading={'Recent News'} />
                                <BlogRecent blogs={recentBlog} heading={'Recent Reviews'} />




                                <div className="single-widgets widget_egns_tag hideOnMobile">
                                    <div className="sticky-sidebar">
                                        <div className="ad">
                                            {/* Add your skyscraper advertisement component or content here */}
                                            {/* For example: */}
                                            <Ad160x600 />
                                        </div>
                                    </div>

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
            <Ad728x90 dataAdSlot="5962627056" />

        </MainLayout>
    )
}


export async function getServerSideProps(context) {
    const { slug } = context.params; // Access the slug parameter from context.params

    const { req } = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const fullURL = `${protocol}://${host}${req.url}`;

    const apolloClient = createApolloClient();
    // Fetch data based on the slug (e.g., from a database)
    // console.log(newsData, "my slug"); // Log the slug value


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
          `
        });
        const recentBlog = await apolloClient.query({
            query: gql`
            query{
                articles(filters:{article_type:{type:{eq:"Review"}}},pagination:{limit:6},sort:"createdAt:desc"){
                  data{
                    attributes{
                      title
                      slug
                      content
                      createdAt
                      author{
                        data{
                          attributes{
                            name
                            publishedAt
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
            `
        });

        const recentNewsData = await apolloClient.query({
            query: gql`
            query{
                articles(filters:{article_type:{type:{eq:"News"}}},pagination:{limit:6},sort:"createdAt:desc"){
                  data{
                    attributes{
                      title
                      slug
                      content
                      createdAt
                      author{
                        data{
                          attributes{
                            name
                            publishedAt
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
            `
        });

        return {
            props: {
                detailData: data?.articles?.data[0]?.attributes || null,
                recentBlog: recentBlog?.data?.articles?.data,
                fullURL,
                recentNews: recentNewsData?.data?.articles?.data,

            },
        };
    }
    catch (error) {
        console.error("Server-side Data Fetching Error:", error.message);
        return {
            props: {
                error: true,
                errorMessage: error.message,
            },
        };
    }
}
export default BlogDetailsPage