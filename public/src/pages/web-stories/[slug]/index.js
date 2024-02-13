import axios from 'axios';
import Head from 'next/head'
import { useAmp } from "next/amp";
import { useEffect, useState } from 'react';
import moment from "moment";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';


export const config = { amp: true }


export default function Webstory({ story }) {
    const router = useRouter();
    return (
        <>

            <Head>
                <title>{story.webstory.metaTitle}</title>
                <meta name="description" content={story.webstory.metaDescription} />
                <meta property="og:url" content={`https://carprices.ae${router.asPath}`} />
                <meta property="og:site_name" content="Carprices.ae" />
                <meta property="og:title" content={story.webstory.metaTitle} />
                <meta property="og:description" content={story.webstory.metaDescription} />
                <style amp-custom="">
                    {`
        .letterbox {
          color: white;
          text-align: center;
        }

        .letterbox h1 {
          font-size: 22px
        }

        .first-logo {
          width: 80px;
          height: 80px;
        }

        .first-logo amp-img {
          height: 100%;
          width: 100%;
          border-radius: 10px;
        }

        h1,
        h2,
        .author {
          -webkit-text-stroke: 0;
          bottom: 40px;
          color: #fafafa;
          font-size: 1.21em;
          left: 9.17%;
          letter-spacing: 0;
          margin: 0;
          padding: 0;
          position: absolute;
          text-align: center;
          width: 81.67%;
          word-break: break-word;
        }

        .author {
          bottom: 10px;
          color: hsla(0, 0%, 98%, .7);
          font-size: 14px;
        }

        .bg_grad {
          background: linear-gradient(0deg, #000, transparent 25%);
        }

        .last-logo {
          position: absolute;
          width: 180px;
          height: 30px;
          left: 49.03%;
          top: 63%;
          transform: translateX(-50%);
        }

        .last-logo amp-img {
          width: 100%;
          height: 100%;
        }

        .cta_sumry {
          -webkit-text-stroke: 0;
          bottom: 15%;
          color: #fdfafa;
          color: #fafafa;
          font-size: 1.1em;
          font-weight: 600;
          left: 9.17%;
          letter-spacing: 0;
          margin: 0;
          padding: 0;
          text-align: center;
          width: 81.67%;
          word-break: break-word;
          position: absolute;
        }

        #last {
          background: linear-gradient(0deg, #000, rgba(0, 0, 0, .44) 75.625%);
        }

        #cover_overlay {
            background: linear-gradient(0deg, #000, rgba(0, 0, 0, .3) 30.625%);    }

        `}
                </style>

                <Script async custom-element="amp-story-auto-ads" src="https://cdn.ampproject.org/v0/amp-story-auto-ads-0.1.js"/>
                
            </Head>

            <amp-story standalone="" title={story.webstory.mainTitle} publisher={story.webstory.author}
                publisher-logo-src="/assets/images/logo/cp_logo_stories.jpg" poster-portrait-src={process.env.NEXT_PUBLIC_S3_URL +
                    story.webstory.slides[0].image1}>

                <amp-story-auto-ads src="/examples/amp-story/ads/remote.json" ></amp-story-auto-ads>

                <amp-story-page id="cover">
                    <amp-story-grid-layer template="fill" >
                        <amp-img src={process.env.NEXT_PUBLIC_S3_URL + story.webstory.slides[0].image1} width="720" height="1280"
                            layout="responsive" alt="Cover" >
                        </amp-img>
                    </amp-story-grid-layer>
                    <amp-story-grid-layer template="thirds" className="bg_grad" id="cover_overlay">
                        <div className="letterbox">
                            <div className="first-logo pa">
                                <amp-img width="96" height="96" layout="responsive" src="/assets/images/logo/cp_logo_stories.jpg"
                                    alt={story.webstory.slides[0].title}>
                                </amp-img>
                            </div>
                            <h1 className="h1text" animate-in="fly-in-bottom">{story.webstory.slides[0].title}</h1><span
                                className="author"> {moment(story.webstory.publishedAt).format("MMMM Do YYYY")}</span>
                        </div>
                    </amp-story-grid-layer>
                </amp-story-page>

                {story.webstory.slides.slice(1, -1).map((item, index) => (
                    <amp-story-page id="story">
                        <amp-story-grid-layer template="fill">
                            <amp-img src={process.env.NEXT_PUBLIC_S3_URL + item.image1} width="720" height="1280" layout="responsive"
                                alt="Cover" id="stid-pg-bg">
                            </amp-img>
                        </amp-story-grid-layer>
                        <amp-story-grid-layer template="thirds" className="bg_grad">
                            <div className="letterbox">
                                <h2 className="h1text" animate-in="fly-in-bottom">{item.title}</h2>
                                <span className="author">{moment(story.webstory.publishedAt).format("MMMM Do YYYY")}</span>
                            </div>
                        </amp-story-grid-layer>
                    </amp-story-page>
                ))}

                <amp-story-page id="summary">
                    <amp-story-grid-layer template="fill">
                        <amp-img width="720" height="1280" layout="responsive" src={process.env.NEXT_PUBLIC_S3_URL +
                            story.webstory.slides[story.webstory.slides.length - 1].image1} id="stid-pg-bg"
                            alt={story.webstory.slides[story.webstory.slides.length - 1].title}>
                        </amp-img>
                    </amp-story-grid-layer>
                    <amp-story-grid-layer template="vertical" id="last">
                        <div className="letterbox">
                            <div className="last-logo">
                                <Link href="https://carprices.ae/">
                                    <amp-img width={97} height={97} layout="responsive" src="/assets/images/logo/carprices.png"
                                        alt="Carprices Logo">
                                    </amp-img>
                                </Link>
                            </div>
                            <h2 className="cta_sumry pa">{story.webstory.slides[story.webstory.slides.length - 1].title}</h2>
                        </div>
                    </amp-story-grid-layer>

                    <amp-story-page-outlink layout="nodisplay" >
                        <Link href={`${story.webstory.url}`} title={story.webstory.urlName}>{story.webstory.urlName}</Link>
                    </amp-story-page-outlink>
                </amp-story-page>

            </amp-story>
        </>
    )
}

export async function getServerSideProps({ req, res, params }) {
    // Fetch data from external API
    try {
        const slug = params.slug;
        let resStory = await axios.get(
            process.env.NEXT_PUBLIC_API_URL + "webstory/by-slug/" + slug
        );
        // Fetch other data as needed

        // Pass data to the page via props
        let story = await resStory.data
        let slidestory = await resStory.data.webstory.slides
        console.log(story, "newsnews");
        console.log(slidestory, "slidestory");
        return {
            props: {
                story,
                // Other data like blogs
            },
        };
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