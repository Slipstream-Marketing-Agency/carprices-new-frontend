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

function index({searchSlug,news,fullData,totalNews,totalPages,currentPage}) {
    const router = useRouter();
    const client = createApolloClient();

    const [brandInput, setBrandInput] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [searchLoading,setSearchLoading]=useState(false)
    const [inputFieldTouched, setInputFieldTouched] = useState(false)
    const [initialScreening,setInitialScreening]=useState(true)



    const fetchBrands = async (brandInput)=>{
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
    const fetchTags= async (tagInput)=>{
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
    
        console.log("tags",tags);
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
      else{
      setSearchLoading(false)

      }
    }
  

    const inputFieldReset=()=>{
      setInputFieldTouched(false);setInitialScreening(true)
    }

    const handleInputFieldBlur = () => {
      setInputFieldTouched(false)
    }



    useEffect(()=>{
      if(initialScreening){
          setInputFieldTouched(false)
      }
      if(searchSlug){
        setBrandInput(searchSlug)
      }
  },[])
    useEffect(() => {
      setInputFieldTouched(true)
      if (brandInput.trim() === '') {
        fetchAllBrands()
      }

      if (brandInput.trim() === '' ) {
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
        title: "Latest Car News UAE: New Models, Launches, and Industry Insights - Carprices.ae",
        description: "Stay informed with the latest car news in UAE. Explore upcoming car model prices, specifications, and features. Get the inside scoop on the automotive industry and stay ahead of the curve.",
        type: "Car Review Website",
      }}>
        <Ad728x90 dataAdSlot="5962627056" />
        <div className="container mb-4">
          <h1 className="my-4">Latest Car Reviews</h1>
          <p>Get the latest news, updates, and insights on the UAE car industry, covering new launches, events, price updates, discounts, recalls, and more for a comprehensive understanding of the automotive scene.</p>
          <div className="inputSearchContainer mt-4 position-relative">
            <i class="bi bi-search searchIcon"></i>
            <input type="text"
              className="newsInputSearch"
              placeholder="Enter brand name..."
              value={brandInput}
              onClick={InputFieldClicked}
              onChange={(e) => setBrandInput(e.target.value)}
            
          />    

{((brandOptions.length > 0 || tagOptions.length>0) && inputFieldTouched) && <ul className="relatedDataList">
                {(inputFieldTouched && brandInput == '') && <li className="allBrandsTxt p-2">All brands</li>}
                {(inputFieldTouched && brandOptions.length>0 && brandInput != '') && <li className="allBrandsTxt p-2">Brand(s)</li>}
                {brandOptions?.map((brand, index) => (
                  <Link legacyBehavior href={`/reviews/brand/${brand?.attributes?.slug}`}><li className="border-bottom p-2 searchResultItem cursor_pointer" key={index}  onClick={()=>{setBrandInput(brand?.attributes?.name);inputFieldReset();}}>{brand?.attributes?.name}</li></Link>
                ))}
                {(inputFieldTouched && tagOptions.length>0 && brandInput != '') && <li className="allBrandsTxt p-2">Tag(s)</li>}
                {tagOptions?.map((tag, index) => (
                  <Link legacyBehavior href={`/reviews/tag/${tagOptions[index]?.slug}`}><li className="border-bottom p-2 searchResultItem cursor_pointer" key={index}  >{tag?.name}</li></Link>
                ))}
                {/* {(inputFieldTouched && brandOptions.length==0) && <li className="allBrandsTxt p-2">No result found</li>} */}
    
              </ul>}
              
    
    
              {(inputFieldTouched && !searchLoading ) && <span aria-hidden="true" className="fs-2 cursor_pointer" onClick={() => {setBrandInput('');setInputFieldTouched(false)}}>&times;</span>}
             {(searchLoading) && <div className="spinnerItem"></div>}
            </div>
    
  
  
          <div className="row g-4 mt-3">
            <div className="col-lg-10">
              <div className="row g-4 ">
                {news?.map((newsItem, index) => (
  
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
                              {/* <h6>{newsItem.attributes.author.data.attributes.name}</h6> */}
                              {/* <Link legacyBehavior href={`/reviews/${newsItem?.attributes?.slug}`}><a>Posted on: {newsItem.attributes.createdAt.slice(0, 10)}</a></Link> */}
                            </div>
                          </div>
                          <div className="text-center mt-2 ">
                            <button className="readMoreBtn" onClick={()=>{router.push(`/reviews/${newsItem?.attributes?.slug}`)}}>Read More</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {(index + 1) % 6 === 0 && index !== news.length - 1 && (
                      <div className="col-lg-12 ad-container" key={`ad-${index}`}>
                        {/* Add your advertisement component or content here */}
                        {/* For example: */}
                        <Ad728x90 dataAdSlot="5962627056" />
                      </div>
  
                    )}
  
                  </>
                ))}
              </div>
              {( news.length==0) && <div>No result found</div> }  
  
  
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
       {news.length>0 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
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
          articles(filters: {
            and: [
              { title: { containsi: "${slug}" } },
              { article_type: { type: {eq:"Review"}} }
            ]
          },pagination:{page:${page},pageSize: ${pageSize}},sort:"createdAt:desc"){
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
                title
                slug
                createdAt
                metaTitle
                content
                summary
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
        variables: { page, pageSize },
      });
  
      return {
        props: {
          news: data.articles.data || {},
          fullData: data,
          totalNews: data.articles.meta.pagination.total,
          totalPages: data.articles.meta.pagination.pageCount,
          currentPage: page,
          searchSlug:slug
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