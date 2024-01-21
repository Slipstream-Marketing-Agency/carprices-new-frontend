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

function index({ tags, fullData, totalNews, totalPages, currentPage,pageSlug }) {
    console.log("full tags",tags);
    console.log("Page slug",pageSlug);
    const router = useRouter();
    const client = createApolloClient();

    const [brandInput, setBrandInput] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false)
    const [inputFieldTouched, setInputFieldTouched] = useState(false)
    const [initialScreening,setInitialScreening]=useState(true)

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
    const fetchBrands = async (brandInput) => {
        try {
            const { data } = await client.query({
                query: gql`
            query {
              carBrands(filters:{name:{containsi:"${brandInput}"}}) {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
            `,
            });


            const brands = data.carBrands.data;
            setBrandOptions(brands)

        } catch (error) {
            console.error('Error fetching brands:', error);
        }
        setSearchLoading(false)
    }
    const fetchTags = async (tagInput) => {
        try {
            const { data } = await client.query({
                query: gql`
            query{
              articleCategories(filters:{name:{containsi:"${tagInput}"}}){
                data{
                  attributes{
                    name
                    slug
                    articles{
                      data{
                        attributes{
                          title
                          slug
                          
                        }
                      }
                    }
                  }
                }
              }
            }
            `,
            });
            const tags = data.articleCategories.data.map((brand) => brand.attributes);
            setTagOptions(tags)

            console.log("tags", tags);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }

        setSearchLoading(false)
    }

    const fetchAllBrands = async () => {

        try {
            const { data } = await client.query({
                query: gql`
            query SearchBrands {
              carBrands(pagination: { limit:-1 },sort:"name:asc") {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
            `,
            });

            setBrandOptions(data.carBrands.data);
            // console.log("all brands",data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
        setSearchLoading(false)
    }


    const InputFieldClicked = () => {
        setInputFieldTouched(true)
        setSearchLoading(true)
       


        if (!brandInput) {
            fetchAllBrands()
        }
        else {
            setSearchLoading(false) 
        }
        if(!initialScreening && brandInput){
            setBrandInput(brandInput)
            fetchTags(brandInput)
            fetchBrands(brandInput)
        }
        
    }
    const inputFieldReset=()=>{
        setInputFieldTouched(false);setInitialScreening(true)
      }
    const handleInputFieldBlur = () => {
        setInputFieldTouched(false)
    }



    useEffect(() => {
        setInputFieldTouched(true)
        if (brandInput.trim() === '') {
            fetchAllBrands()
        }

        if (brandInput.trim() === '') {
            return;
        }
        if(!initialScreening){
        fetchBrands(brandInput)
        fetchTags(brandInput)
        }else{
            setInputFieldTouched(false)
        }
        setInitialScreening(false)
    

    }, [brandInput]);

    useEffect(()=>{
        if(initialScreening){
            setInputFieldTouched(false)
            setBrandInput(tags.attributes.name)
        }
    },[])

    return (
        <MainLayout pageMeta={{
            title: "Latest Car News UAE: New Models, Launches, and Industry Insights - Carprices.ae",
            description: "Stay informed with the latest car news in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
            type: "Car Review Website",
        }}>
            <Ad728x90 dataAdSlot="5962627056" />
            <div className="container mb-4">
                <h1 className="my-4">Latest Car Reviews</h1>
                <p>Stay up-to-date with the latest reviews and updates on the UAE car industry, including new car launches, launch dates, car images, expos and events, price updates, latest discounts, facelifts, recalls, and more. Get all the insights you need to know about the happenings in the UAE automotive industry..</p>
                <div className="inputSearchContainer mt-4 position-relative">
                    <i class="bi bi-search searchIcon"></i>
                    <input type="text"
                        className="newsInputSearch"
                        placeholder="Enter brand name..."
                        value={brandInput}
                        onClick={InputFieldClicked}
                        onChange={(e) => setBrandInput(e.target.value)}

                    />

                    {((brandOptions.length > 0 || tagOptions.length > 0) && inputFieldTouched) && <ul className="relatedDataList">
                        {(inputFieldTouched && brandInput == '') && <li className="allBrandsTxt p-2">All brands</li>}
                        {(inputFieldTouched && brandOptions.length > 0 && brandInput != '') && <li className="allBrandsTxt p-2">Brand(s)</li>}
                        
                        {brandOptions?.map((brand, index) => (
                            <Link legacyBehavior href={`/news/brand/${brand?.attributes?.slug}`}><li className="border-bottom p-2 searchResultItem cursor_pointer" key={index}  >{brand?.attributes?.name}</li></Link>
                        ))}
                        {(inputFieldTouched && tagOptions.length > 0 && brandInput != '') && <li className="allBrandsTxt p-2">Tag(s)</li>}
                        {tagOptions?.map((tag, index) => (
                            <Link legacyBehavior href={`/news/tag/${tagOptions[index]?.slug}`}><li  className="border-bottom p-2 searchResultItem cursor_pointer" key={index}  onClick={()=>{setBrandInput(tag?.name);inputFieldReset();}}>{tag?.name}</li></Link>
                        ))}
                        {(tagOptions.length===0) && <li className="allBrandsTxt p-2">No result found</li>}

                    </ul>}



                    {(inputFieldTouched && !searchLoading) && <span aria-hidden="true" className="fs-2 cursor_pointer" onClick={() => { setBrandInput(''); setInputFieldTouched(false) }}>&times;</span>}
                    {(searchLoading) && <div className="spinnerItem"></div>}
                </div>


                <div className="row g-4 mt-3">
                    <div className="col-lg-10">
                        <div className="row g-4 ">
                             {tags?.attributes?.articles?.data?.map((newsItem, index) => (

                                <>
                                    <div key={`news-${index}`} className="col-lg-4 col-md-4 wow fadeInUp" data-wow-delay="200ms">
                                        <div className="news-card">
                                            <div className="news-img">
                                                <Link legacyBehavior href={`/news/${newsItem?.attributes?.slug}`}><a>
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
                                                    <Link legacyBehavior href={`/news/${newsItem?.attributes?.slug}`} ><a></a></Link>
                                                </div>
                                            </div>
                                            <div className="content ">
                                                <h5 className="mt-3 BlogCardHeadingTxt">
                                                    <Link legacyBehavior href={`/news/${newsItem?.attributes?.slug}`}><a>{`${newsItem.attributes.title.length > 50 ? `${newsItem.attributes.title.slice(0, 60)} ...` : `${newsItem.attributes.title}`}  `}</a></Link>
                                                </h5>
                                                <div className="author-area">
                                                    <div className="author-content d-flex justify-content-between">
                                                         {/* <h6>{newsItem.attributes.author.data.attributes.name}</h6>  */}
                                                        {/* <Link legacyBehavior href={`/reviews/${newsItem?.attributes?.slug}`}><a>Posted on: {newsItem.attributes.createdAt.slice(0, 10)}</a></Link> */}
                                                    </div>
                                                </div>
                                                <div className="text-center mt-2 ">
                                                    <button className="readMoreBtn" onClick={() => { router.push(`/news/${newsItem?.attributes?.slug}`) }}>Read More</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {(index + 1) % 6 === 0 && index !== tags.length - 1 && (
                                        <div className="col-lg-12 ad-container" key={`ad-${index}`}>
                                            {/* For example: */}
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