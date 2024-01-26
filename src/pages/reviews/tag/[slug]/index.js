import Ad160x600 from '@/src/components/ads/Ad160x600';
import Ad728x90 from '@/src/components/ads/Ad728x90';
import MainLayout from '@/src/layout/MainLayout';
import { createApolloClient } from '@/src/lib/apolloClient';
import Pagination from '@/src/utils/Pagination';
import { gql } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import altImage from '../../../../../public/assets/images/blog-alt-image.png'
import { useRouter } from 'next/router';
import BlogDropDown from '@/src/components/BlogDropDown';

function index({ tags, fullData, totalNews, totalPages, currentPage,pageSlug }) {
    console.log("full tags",tags);
    console.log("Page slug",pageSlug);
    const router = useRouter();
    const client = createApolloClient();



    return (
        <MainLayout pageMeta={{
            title: "Latest Car Reviews UAE: New Models, Launches, and Industry Insights - Carprices.ae",
            description: "Stay informed with the latest car news in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
            type: "Car Review Website",
        }}>
            <Ad728x90 dataAdSlot="5962627056" />
            <div className="container mb-4">
                <BlogHeader />
                <BlogDropDown searchSlug={pageSlug}/>


                <div className="row g-4 mt-3">
                    <div className="col-lg-10">
                        <div className="row g-4 ">
                             {tags?.attributes?.articles?.data?.map((newsItem, index) => (

                                <>
                                    <div key={`news-${index}`} className="col-lg-4 col-md-4 wow fadeInUp" data-wow-delay="200ms">
                                        <div className="news-card">
                                            <div className="news-img">
                                                <Link legacyBehavior href={`/reviews/${newsItem?.attributes?.slug}`}><a>
                                                    <div className="position-relative imageContainer">
                                                        <Image
                                                            src={newsItem?.attributes?.coverImage?.data?.attributes?.url ? newsItem?.attributes?.coverImage?.data?.attributes?.url : altImage}
                                                            alt="Car"
                                                            layout="responsive"
                                                            width={300}
                                                            height={205}
                                                            objectFit="cover"
                                                        />
                                                    </div>
                                                </a></Link>
                                                <div className="date">
                                                    <Link legacyBehavior href={`/reviews/${newsItem?.attributes?.slug}`} ><a></a></Link>
                                                </div>
                                            </div>
                                            <div className="content ">
                                                <h5 className="mt-3 BlogCardHeadingTxt">
                                                    <Link legacyBehavior href={`/reviews/${newsItem?.attributes?.slug}`}><a>{`${newsItem.attributes.title.length > 50 ? `${newsItem.attributes.title.slice(0, 60)} ...` : `${newsItem.attributes.title}`}  `}</a></Link>
                                                </h5>
                                                <div className="author-area">
                                                    <div className="author-content d-flex justify-content-between">
                                                         {/* <h6>{newsItem.attributes.author.data.attributes.name}</h6>  */}
                                                        {/* <Link legacyBehavior href={`/reviews/${newsItem?.attributes?.slug}`}><a>Posted on: {newsItem.attributes.createdAt.slice(0, 10)}</a></Link> */}
                                                    </div>
                                                </div>
                                                <div className="text-center mt-2 ">
                                                    <button className="readMoreBtn" onClick={() => { router.push(`/reviews/${newsItem?.attributes?.slug}`) }}>Read More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {(index + 1) % 6 === 0 && index !== tags.length - 1 && (
                                        <div className="col-lg-12 ad-container" key={`ad-${index}`}>

                                            <Ad728x90 dataAdSlot="5962627056" />
                                        </div>

                                    )}

                                </>
                            ))} 
                        </div>
                        {(tags?.length == 0) && <div>No result found</div>}


                    </div>
                    <div className="col-lg-2 hideOnMobile">
                        <div className="sticky-sidebar">
                            <div className="ad-container">
                                {/* Add your skyscraper advertisement component or content here */}
                                {/* For example: */}
                                <Ad160x600 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <Ad728x90 dataAdSlot="5962627056" />
            <br />
            {tags?.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
            <br />
            <br />
        </MainLayout>
    )
}




export async function getServerSideProps(context) {
    const { slug } = context.params;
    const apolloClient = createApolloClient();

    const pageSize = 24; // Set the number of items per page
    const page = context.query.page || 1; // Get the current page from the query, defaulting to 1

    try {

        const { data } = await apolloClient.query({
            query: gql`
        query{
            articleCategories(pagination:{page:${page} ,pageSize:${pageSize}},filters:{slug:{eq:"${slug}"}}){
                meta{
                    pagination{
                      total,
                      pageCount,
                    }
                  }
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
          }
        `,
            variables: { page, pageSize },
        });

        return {
            props: {
                tags: data.articleCategories.data[0] || {},
                // totalNews: data.articles.meta.pagination.total,
                // totalPages: data.articles.meta.pagination.pageCount,
                currentPage: page,
                pageSlug:slug
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

export default index