import React from 'react';
import axios from 'axios';

export default function Redirection(news) {
    
    return (
        <></>
    );
}

export async function getServerSideProps({ req, res, params }) {
    const slug = params.slug;
    

    try {
        const resNews = await axios.get(
            process.env.NEXT_PUBLIC_API_URL_OLD + 'blog/' + slug
        );
        const news = resNews.data;

        
        
        if (resNews.status === 200) {
            if (news?.blog?.type === "news") {
                return {
                    redirect: {
                        permanent: true,
                        destination: `/news/${slug}`,
                    },
                    props: {},
                };
            } else if (news?.blog?.type === "review") {
                return {
                    redirect: {
                        permanent: true,
                        destination: `/reviews/${slug}`,
                    },
                    props: {},
                };
            } 
        }

        // Pass data to the page via props
        return {
            props: {
                news,
            },
        };
    } catch (error) {
        
        if (error.response) {
          return {
            notFound: true, // Treat non-200 responses as 404 errors
          };
        }
    }
}
