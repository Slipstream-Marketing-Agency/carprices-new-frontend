import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export function LoaderOverlay() {
  // const router = useRouter();

  // const [loading, setLoading] = useState(false);

  // 

  // useEffect(() => {
  //   const handleStart = (url) => url !== router.pathname && setLoading(true);
  //   const handleComplete = (url) => url === router.pathname && setLoading(false);

  //   router.events.on('routeChangeStart', handleStart);
  //   router.events.on('routeChangeComplete', handleComplete);
  //   router.events.on('routeChangeError', handleComplete);

  //   return () => {
  //     router.events.off('routeChangeStart', handleStart);
  //     router.events.off('routeChangeComplete', handleComplete);
  //     router.events.off('routeChangeError', handleComplete);
  //   };
  // }, [router]);

  // return loading && (
    // <div className="fullpage_overlay">
    //   <div className="fullpage_loader"></div>
    // </div>
  // );
}
