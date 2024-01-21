import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'


export default function CookiesCard() {

        const [showBanner, setShowBanner] = useState(true);
      
        useEffect(() => {
          const hasAcceptedCookies = Cookies.get('acceptedCookies');
          if (hasAcceptedCookies) {
            setShowBanner(false);
          }
        }, []);
      
        const acceptCookies = () => {
          Cookies.set('acceptedCookies', 'true', { expires: 365, sameSite: 'None', secure: true });
          setShowBanner(false);
        };
  return (
    showBanner &&
<div className="cookie-warning">
  <h4 className="cookie-title ">We use cookies 🍪</h4>
    <div className="cookie-text">This website uses cookies in order to offer you the most relevant information.Please accept cookies for optimal performance.Read our <a className='text-primary' href="/privacy">Privacy Policy</a>.</div>
    <div class="cookie-btn-wrapper d-flex justify-content-center">
      <button onClick={acceptCookies} class="cookie-btn">Accept All Cookies</button>
      <button onClick={()=>{setShowBanner(false)}} className="cookie-btn cookieDeclineBtn">Reject All</button>
    </div>
</div>
  )
}
