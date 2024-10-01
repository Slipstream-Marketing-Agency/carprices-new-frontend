import { getWebStoryData } from "@/src/lib/api";
import Head from "next/head";
import moment from "moment";

// Enable AMP
export const config = { amp: true };

export default function Webstory({ story }) {
  return (
    <>
      <Head>
        {/* Required AMP Script */}
        <script
          async
          custom-element="amp-story-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-story-auto-ads-0.1.js"
        ></script>

        {/* Load AMP-compatible font: Poppins */}
        
      </Head>

      {/* AMP Story directly inside body */}
      <amp-story
        standalone=""
        title={story.title}
        publisher="Carprices.ae"
        publisher-logo-src="/assets/img/carprices-logo.png"
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
          <amp-story-page id={`story-page-${index}`} key={index}>
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

// Fetching the web story data
export async function getServerSideProps({ params }) {
  try {
    const slug = params.slug;
    const story = await getWebStoryData(slug);

    return { props: { story } };
  } catch (error) {
    return { notFound: true };
  }
}
