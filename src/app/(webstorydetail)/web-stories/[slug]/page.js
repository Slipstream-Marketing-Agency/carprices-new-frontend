import { getWebStoryData } from "@/lib/api";
import moment from "moment";
import React from "react";
export async function generateMetadata({ params }) {
    const { slug } = params;

    // Fetch the story data based on the slug
    const story = await getWebStoryData(slug);

    const seo = story.seo || {};


    return {
        title: seo?.metaTitle ? seo?.metaTitle : "Carprices.ae",
        description: seo.metaDescription ? seo.metaDescription : "Read the latest story on Carprices.ae.",
        charset: "UTF-8",
        alternates: {
            canonical: seo.canonicalURL || `https://carprices.ae/web-stories/${story.slug}`,
        },
        keywords: seo.keyword || "cars, carprices, automotive, stories",
        robots: {
            index: seo.metaRobots?.index !== false,
            follow: seo.metaRobots?.follow !== false,
        },
        structuredData: seo.structuredData || {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: seo.metaTitle || story.title || "Carprices.ae",
            description: seo.metaDescription || story.description || "Read the latest story on Carprices.ae.",
            url: seo.canonicalURL || `https://carprices.ae/${story.slug}`,
        },
        author: "Carprices.ae Team",
        icon: "/favicon.ico",
    };
}

export default async function Webstory({ params }) {
    const { slug } = params;

    // Fetch the story data based on the slug
    const story = await getWebStoryData(slug);


    // If the story is not found, throw an error or handle the case
    if (!story) {
        return <p>Story not found</p>;
    }

    return (
        <>

            <head>
                <style
                    amp-boilerplate=""
                    dangerouslySetInnerHTML={{
                        __html:
                            "body{-webkit - animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}"
                    }}
                />
                <noscript>
                    &lt;style amp-boilerplate&gt;body{"{"}-webkit -
                    animation:none;-moz-animation:none;-ms-animation:none;animation:none{"}"}
                    &lt;/style&gt;
                </noscript>                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <script async custom-element="amp-video"
                    src="https://cdn.ampproject.org/v0/amp-video-0.1.js"></script>
                <script async custom-element="amp-story"
                    src="https://cdn.ampproject.org/v0/amp-story-1.0.js"></script>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap" rel="stylesheet" />
                <style amp-custom="">
                    {`
      amp-story {
        font-family: 'Oswald',sans-serif;
        color: #fff;
      }
      amp-story-page {
        background-color: #000;
      }
      h1 {
        font-weight: bold;
        font-size: 2.875em;
        font-weight: normal;
        line-height: 1.174;
      }
      p {
        font-weight: normal;
        font-size: 1.3em;
        line-height: 1.5em;
        color: #fff;
      }
      q {
        font-weight: 300;
        font-size: 1.1em;
      }
      amp-story-grid-layer.bottom {
        align-content:end;
      }
      amp-story-grid-layer.noedge {
        padding: 0px;
      }
      amp-story-grid-layer.center-text {
        align-content: center;
      }
      .wrapper {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: 50% 50%;
      }
      .banner-text {
        text-align: center;
        background-color: #000;
        line-height: 2em;
      }
        .last-logo {
          position: absolute;
          width: 270px;
          height: 45px;
          left: 49.03%;
          bottom: 140px;
          transform: translateX(-50%);
        }

        .last-logo amp-img {
          width: 100%;
          height: 100%;
        }`}
                </style>
            </head>


            {/* AMP Story */}
            <amp-story
                standalone=""
                title={story.title}
                publisher="Carprices.ae"
                publisher-logo-src="/assets/img/car-prices-logo.png"
                poster-portrait-src={story.coverImage.url}
            >
                {/* AMP Story Auto Ads */}
                <amp-story-auto-ads>
                    <script
                        type="application/json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "ad-attributes": {
                                    type: "doubleclick",
                                    "data-slot": "/123456789/carprices_story",
                                },
                            }),
                        }}
                    />
                </amp-story-auto-ads>

                {/* Cover Page */}
                <amp-story-page id="cover">
                    <amp-story-grid-layer template="fill">
                        <amp-img
                            src={story.coverImage.url}
                            width="720"
                            height="1280"
                            layout="responsive"
                            alt="Cover"
                        ></amp-img>
                    </amp-story-grid-layer>
                    <amp-story-grid-layer
                        template="thirds"
                        style={{
                            background:
                                "linear-gradient(0deg, #000, rgba(0, 0, 0, .3) 30.625%)",
                        }}
                        id="cover_overlay"
                    >
                        <div
                            className="letterbox"
                            style={{
                                bottom: "40px",
                                color: "white",
                                textAlign: "center",
                                position: "absolute",
                                padding: "0px 15px",
                            }}
                        >
                            <h1
                                className="h1text"
                                animate-in="fly-in-bottom"
                                style={{
                                    fontSize: "22px",
                                    color: "#fafafa",
                                    wordBreak: "break-word",
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                            >
                                {story.title}
                            </h1>
                            <span
                                className="author"
                                style={{
                                    bottom: "10px",
                                    color: "hsla(0, 0%, 98%, .7)",
                                    fontSize: "14px",
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                            >
                                {moment(story.publishedAt).format("MMMM Do YYYY")}
                            </span>
                        </div>
                    </amp-story-grid-layer>
                </amp-story-page>

                {/* Story Pages */}
                {story.storyPage.map((item, index) => (
                    <amp-story-page id={`story-page-${index}`} key={`item-${index}`}>
                        <amp-story-grid-layer template="fill">
                            <amp-img
                                src={item.image.url}
                                width="720"
                                height="1280"
                                layout="responsive"
                                alt={`Story Page ${index + 1}`}
                            ></amp-img>
                        </amp-story-grid-layer>
                        <amp-story-grid-layer
                            template="thirds"
                            style={{
                                background: "linear-gradient(0deg, #000, transparent 25%)",
                            }}
                        >
                            <div
                                className="letterbox"
                                style={{
                                    bottom: "40px",
                                    color: "white",
                                    textAlign: "center",
                                    position: "absolute",
                                    padding: "0px 15px",
                                }}
                            >
                                <h2
                                    className="h1text"
                                    animate-in="fly-in-bottom"
                                    style={{
                                        fontSize: "22px",
                                        color: "#fafafa",
                                        wordBreak: "break-word",
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    {item.caption}
                                </h2>
                                <span
                                    className="author"
                                    style={{
                                        bottom: "10px",
                                        color: "hsla(0, 0%, 98%, .7)",
                                        fontSize: "14px",
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    {moment(story.publishedAt).format("MMMM Do YYYY")}
                                </span>
                            </div>
                        </amp-story-grid-layer>
                    </amp-story-page>
                ))}

                {/* Summary Page */}
                <amp-story-page id="summary">
                    <amp-story-grid-layer template="fill">
                        <amp-img
                            width="720"
                            height="1280"
                            layout="responsive"
                            src={story.storyPage[story.storyPage.length - 1].image.url}
                            alt={story.storyPage[story.storyPage.length - 1].caption}
                        ></amp-img>
                    </amp-story-grid-layer>
                    <amp-story-grid-layer
                        template="vertical"
                        style={{
                            background:
                                "linear-gradient(0deg, #000, rgba(0, 0, 0, .44) 75.625%)",
                        }}
                        id="last"
                    >
                        <div
                            className="letterbox"
                            style={{
                                bottom: "40px",
                                color: "white",
                                textAlign: "center",
                                position: "absolute",
                                padding: "0px 15px",
                            }}
                        >
                            <span className="last-logo">
                                <a href="https://carprices.ae/">
                                    <amp-img
                                        width="50"
                                        height="50"
                                        layout="responsive"
                                        src="/assets/img/car-prices-logo.png"
                                        alt="Carprices Logo"
                                    ></amp-img>
                                </a>
                            </span>
                            <h2
                                className="cta_sumry"
                                style={{
                                    fontSize: "1.1em",
                                    color: "#fafafa",
                                    fontWeight: 600,
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                            >
                                {story.storyPage[story.storyPage.length - 1].caption}
                            </h2>
                        </div>
                    </amp-story-grid-layer>
                </amp-story-page>
            </amp-story>
        </>
    );
}
