import RateCarPageWrapper from '@/components/reviews/RateCarPageWrapper'
import React, { Suspense } from 'react'

export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RateCarPageWrapper />
        </Suspense>
    )
}
