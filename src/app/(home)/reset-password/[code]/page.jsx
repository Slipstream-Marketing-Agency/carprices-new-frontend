import React from 'react'
import ResetPasswordWrapper from '@/components/setting/ResetPasswordWrapper'
import StoreProvider from '../../../../../providers/StoreProvider'


const ResetPassword = () => {
    

    return (
        <StoreProvider>
            <ResetPasswordWrapper />
        </StoreProvider>
    )
}

export default ResetPassword
