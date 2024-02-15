import useTranslate from '@/src/utils/useTranslate';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share'
import { useRouter } from 'next/router';
import React from 'react'

export default function SocialButtons({fullURL}) {
  const router = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === 'ar';
  return (
    <div className={`social-area d-flex align-items-center gap-1 ${isRtl && 'flex-row-reverse'}`} >
    {<h6 className='mb-0 shareTxt'>{t.share} : </h6>}
    <ul className="social-link d-flex align-items-center gap-1 ps-2 m-auto  ">
      <FacebookShareButton
        url={fullURL} >
        <FacebookIcon size={26} round />
      </FacebookShareButton>
      <WhatsappShareButton
        url={fullURL} >
        <WhatsappIcon size={26} round />
      </WhatsappShareButton>

      <LinkedinShareButton
        url={fullURL} >
        <LinkedinIcon size={26} round />
      </LinkedinShareButton>
      <TwitterShareButton
        url={fullURL}
        title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
      >
        <TwitterIcon size={26} round />
      </TwitterShareButton>
      <TelegramShareButton
        url={fullURL}
        title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
      >
        <TelegramIcon size={26} round />
      </TelegramShareButton>

    </ul>


  </div>
  )
}
