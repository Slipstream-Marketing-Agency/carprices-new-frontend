
import axios from "axios";
import { gql } from "@apollo/client";
import { createApolloClient } from "@/lib/apolloClient";

import ArticleDetailWrapper from "@/components/articles-component/ArticleDetailWrapper";
async function fetchData(slug) {
    const apolloClient = createApolloClient();

    try {
        const { data } = await apolloClient.query({
            query: gql`
        query {
          articles(filters: { slug: { eq: "${slug}" } }) {
            data {
              attributes {
                title
                slug
                content
                summary
                createdAt
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

        // Fetch recent blog posts, recent reviews, popular articles, and articles from this week
        const [recentBlog, recentReviews, popularArticles, articlesThisWeek] = await Promise.all([
            apolloClient.query({
                query: gql`
          query {
            articles(
              filters: { article_type: { type: { eq: "News" } } }
              pagination: { limit: 6 }
              sort: "createdAt:desc"
            ) {
              data {
                attributes {
                  title
                  slug
                  createdAt
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
            }),
            apolloClient.query({
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
                  createdAt
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
            }),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/listArticlesByEngagement?pageSize=11`),
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}articles/listlasttwoweeks?slug=news`),
        ]);

        return {
            detailData: data?.articles?.data[0]?.attributes || null,
            recentBlog: recentBlog?.data?.articles?.data || [],
            recentReviews: recentReviews?.data?.articles?.data || [],
            popularArticles: popularArticles.data.data || [],
            articlesThisWeek: articlesThisWeek.data.data || [],
        };
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}

export default async function BlogDetailsPage({ params }) {
    const slug = params.slug;
    const data = await fetchData(slug);


    return (
        <ArticleDetailWrapper data={data}/>
    );
}
