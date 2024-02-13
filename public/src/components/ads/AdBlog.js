import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

export default function AdBlog(props) {
  const router = useRouter()

  useEffect(() => {

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    catch (e) {

    }

  }, [router.query]);

  

  return (
    <>
      <div className="">
        {process.env.NEXT_PUBLIC_MODE == "production" ? (

          <ins className="adsbygoogle"
            style={{ display: "block", textAlign:"center"}}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-4857144107996534"
            data-ad-slot={props?.dataAdSlot}
          >
          </ins>
        ) : ""}
      </div>
    </>
  )
}
