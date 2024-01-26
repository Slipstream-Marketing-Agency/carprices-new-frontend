import { useRouter } from 'next/router';
import React from 'react'
import useTranslate from '../utils/useTranslate';

export default function BlogHeader({news}) {
    const router = useRouter();
    const t = useTranslate();
    let isRtl = router.locale === 'ar';
  return (
    <>
        {news ? <> <h1 className={`my-4 ${isRtl && 'text-end'}`}>{t.carnewshead}</h1>
        <p className={`${isRtl && 'text-end'}`}>{t.carnewssub}</p>  </>
        : <> <h1 className={`my-4 ${isRtl && 'text-end'}`}>{t.reviewHead}</h1>
        <p className={`${isRtl && 'text-end'}`}>{t.reviewSubHead}</p> </>
    }
    </>
  )
}
