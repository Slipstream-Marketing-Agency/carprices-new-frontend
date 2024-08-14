import { FacebookMessengerIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share';
import React, { useState } from 'react'


export default function NewShareBtns() {

  const currentURL = typeof window !== "undefined" ? window.location.href : "";
  const [showSocialMedia, setShowSocialMedia] = useState(false)
  const [hide, setHide] = useState(false)
  const handleSocialButtonClick = () => {
    // navigator.clipboard.writeText(currentURL);
    // alert("Link copied to clipboard!");
    setShowSocialMedia(true)
    

  };
  const hideSocialButtons = () => {
    setShowSocialMedia(false)
    

  }

  return (
    <>
      <div className="shareBtn cursor-pointer" onClick={handleSocialButtonClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.06-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L7.03 8.81C6.49 8.31 5.78 8 5 8c-1.66 0-3 1.34-3 3s1.34 3 3 3c.78 0 1.49-.31 2.03-.81l7.12 4.15c-.05.21-.08.43-.08.66 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"
          />
        </svg>

      </div>
      {<div className={`socialMediaContainer ${showSocialMedia ? '  showMediaBtn' : ' hideMediaBtn'}`} >
        <div className="socialHeader">
          <h5>Share this Cars</h5>
          <svg className='cursor-pointer' onClick={() => { hideSocialButtons() }} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>

        </div>
        <div className="socialBtns">
          <FacebookShareButton
            url={currentURL} >
            <FacebookMessengerIcon size={36} round />
          </FacebookShareButton>
          <WhatsappShareButton
            url={currentURL} >
            <WhatsappIcon size={36} round />
          </WhatsappShareButton>

          <LinkedinShareButton
            url={currentURL} >
            <LinkedinIcon size={36} round />
          </LinkedinShareButton>
          <TwitterShareButton
            url={currentURL}
            title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
          >
            <TwitterIcon size={36} round />
          </TwitterShareButton>
          <TelegramShareButton
            url={currentURL}
            title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
          >
            <TelegramIcon size={36} round />
          </TelegramShareButton>
        </div>
      </div>}
    </>
  )
}
