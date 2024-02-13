import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import FeaturedImage from '../common/FeaturedImage';

export default function RelatedBlogs(props) {
    const router = useRouter()


    const currentPage = router.pathname.split("/")[1]
    const blogs = props?.blogs
    
    return (
        <>
            {props?.blogs === undefined?
                "" : <div className='white_bg_wrapper mt-4'>
                    <h2>Related {currentPage === "news" ? "News" : "Reviews"}</h2>
                    <ol class="list-group list-group-numbered">
                        {blogs?.map((item, index) => (
                            <Link href={`/${props.type}/${item?.slug}`}>
                                <div className='fs-6 white_bg_wrapper mb-2 p-2'>
                                    <div className='d-flex align-items-center'>
                                        <div className='w-25 latest_listing'>
                                            <FeaturedImage src={item?.coverImage} width={100} height={100} className="h-100" />
                                        </div>
                                        <div className='w-60 ms-4'>

                                            <b>{item?.title}</b>

                                        </div>
                                    </div>


                                </div>
                            </Link>

                        ))}
                    </ol>
                </div>
            }
        </>

    )
}
