import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import FeaturedImage from '../common/FeaturedImage';
import Image from 'next/image';

export default function LatestBlog(props) {
    const router = useRouter()
    const currentPage = router.pathname.split("/")[1]
    const blogs = props?.blogs?.blogs
    return (
        <div className='white_bg_wrapper mt-4'>
            <h2>Latest {currentPage === "news" ? "News" : "Reviews"}</h2>
            <div class="">
                {blogs.filter(item => item.slug !== router.query.slug).slice(0, blogs.some(item => item.slug === router.query.slug) ? 5 : 4).map((item, index) => (
                    <Link href = {`/${props.type}/${item?.slug}`}>
                <div className='fs-6 white_bg_wrapper mb-2 p-2'>
                    <div className='d-flex align-items-center'>
                        <div className='w-25 latest_listing'>
                            <Image src={process.env.NEXT_PUBLIC_S3_URL + item?.coverImage} width={100} height={100} className="h-100" />
                        </div>
                        <div className='w-60 ms-4'>

                            <b>{item?.title}</b>

                        </div>
                    </div>


                </div>
            </Link>
                ))}
        </div>
        </div >
    )
}
