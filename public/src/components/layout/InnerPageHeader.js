import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function InnerPageHeader({children}) {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };
    return (
        <>        <nav className="navbar navbar-fixed-top innerPageHeader">
            <div className="container">
                <div className="d-flex align-items-center text-center">
                    <div className="back-button" onClick={handleGoBack}><i class="bi bi-arrow-left-short" /></div>
                    <Link className="navbar-brand" href="/"><img src="/assets/images/logo/carprices.png" alt="Carprices Logo" className='w-50' /></Link>
                </div>
            </div>
        </nav>
            {children}
        </>
    )
}
