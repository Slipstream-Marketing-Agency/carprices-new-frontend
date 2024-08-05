import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Ad970x180(props) {
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

      <div className="Ad970x180">

          <ins className="adsbygoogle fixed_top_banner_bill_board"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4857144107996534"
            data-ad-slot={props?.dataAdSlot}
          >
          </ins>
       
      </div>
    </>

  );
}