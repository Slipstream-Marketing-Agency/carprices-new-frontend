import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Cards({title,subTitle,image,link}) {
  return (
    <div className="col-md-3 mb-3 text-white">
    <Link href={`/electric-charging-stations/${link}`} className="position-relative text-white">
      <Image
        src={image}
        className="img-fluid rounded"
        alt="Image"
        style={{ height: '130px', objectFit: 'cover' }}
      />
      <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center ">
        <h4 className='text-white'>{title}</h4>
        <p >{subTitle}</p>
      </div>
    </Link>
  </div>
  )
}
