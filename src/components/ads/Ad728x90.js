import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Ad728x90(props) {
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

      <div className="Ad728x90 my-2 ">

          <ins className="adsbygoogle responsive_leaderboard_horizontal"
            style={{ display: "block" }}
            data-ad-client="ca-pub-4857144107996534"
            data-ad-slot={props?.dataAdSlot}
          >
          </ins>
      </div>
    </>

  );
}