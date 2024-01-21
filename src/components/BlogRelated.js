import React from 'react'
import Link from 'next/link'
import altImage from '../../public/assets/images/blog-alt-image.png'
import Image from 'next/image'
export default function BlogRelated({blogs,heading}) {
    return (
      <>
           { blogs.length>0 &&
             <div className='blog_wrapper mt-4 border'>
                <h5 className="text-bold mb-4">{heading}</h5>
                <div className="cursorPointer">
                    {blogs?.map((blog) => (
                        <Link legacyBehavior href={`/news/${blog?.attributes?.articles?.data[0]?.attributes?.slug}`}>
                            <div className='fs-6 blog_wrapper mb-2 p-2'>
                                <div className='d-flex align-items-center'>
                                    <div className='w-25 latest_listing'>
                                        <Image src={blog?.attributes?.articles?.data[0]?.attributes?.coverImage?.data?.attributes?.url ? blog?.attributes?.articles?.data[0]?.attributes?.coverImage?.data?.attributes?.url : altImage} width={100} height={100} className="h-100 img-no-max-width" />
                                    </div>
                                    <div className='w-60 ms-4 '>
                                        <span className="text-bold blogFont">{`${blog?.attributes?.articles?.data[0]?.attributes?.title?.length > 40 ? `${blog?.attributes?.articles?.data[0]?.attributes?.title?.slice(0, 63)} ...` : `${blog?.attributes?.articles?.data[0]?.attributes?.title}`}`}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
    
            </div>
        }
      </>
    )
}
