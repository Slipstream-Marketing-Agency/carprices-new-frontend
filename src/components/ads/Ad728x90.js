import { useEffect } from "react";
import { useRouter } from "next/router";

const Ad728x90 = (props) => {
  const shouldDisplayAds = process.env.NEXT_PUBLIC_MODE === "production";
  
  const router = useRouter();

  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("Error pushing ads:", error);
    }
  }, [router.query]);


  return (
    <div className="Ad728x90 hideOnSmallScreen">
      {shouldDisplayAds && (
        <ins
          className="adsbygoogle responsive_leaderboard_horizontal "
          style={{ display: "block" }}
          data-ad-client="ca-pub-4857144107996534"
          data-ad-slot={props?.dataAdSlot}
        ></ins>
      )}
      <h2 className="text-center p-3 text-white" style={{backgroundColor:'rosybrown'}}>728*90</h2>
    </div>
  );
};

export default Ad728x90;
