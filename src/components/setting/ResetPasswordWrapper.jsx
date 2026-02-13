'use client'

import React, { useState } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useParams, useRouter } from 'next/navigation'
import { setCookie } from '@/lib/helper'
import { useDispatch } from 'react-redux'
import { verifyUser } from '@/store/slices/authSlice'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const ResetPasswordWrapper = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const dispatch = useDispatch()

    const router = useRouter()
    const params = useParams()
    const code = params.code

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState('error')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { password, confirmPassword } = formData

        if (password !== confirmPassword) {
            // Show error message using Snackbar
            setSnackbarMessage("Passwords do not match")
            setSnackbarSeverity("error")
            setSnackbarOpen(true)
            return
        }

        setLoading(true)
        
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}auth/reset-password`,
                {
                    code: code,
                    password: password,
                    passwordConfirmation: confirmPassword
                }
            )

            if (response.data.jwt) {
                setCookie('authToken', response.data.jwt, 7)
                dispatch(verifyUser())
                setSuccess(true)
                setSnackbarMessage("Password reset successfully!")
                setSnackbarSeverity("success")
                setSnackbarOpen(true)
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password')
            setSnackbarMessage(err.response?.data?.message || 'Failed to reset password')
            setSnackbarSeverity("error")
            setSnackbarOpen(true)
        } finally {
            setLoading(false)
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset Your Password
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="password" className="sr-only">
                                New Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="New Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Reset Password'}
                        </button>
                    </div>
                </form>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default ResetPasswordWrapper