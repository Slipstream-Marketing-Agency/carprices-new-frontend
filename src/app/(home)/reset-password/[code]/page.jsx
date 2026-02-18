import React from 'react'
import ResetPasswordWrapper from '@/components/setting/ResetPasswordWrapper'
import StoreProvider from '../../../../../providers/StoreProvider'

export const metadata = {
    title: "Reset Password - CarPrices.ae",
    robots: {
        index: false,
        follow: false,
    },
};

const ResetPassword = () => {
    

    return (
        <StoreProvider>
            <ResetPasswordWrapper />
        </StoreProvider>
    )
}

export default ResetPassword
