import React, { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { setCookie } from 'nookies'
import MainLayout from '@/src/layout/MainLayout'
import { useRouter } from 'next/router'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const router = useRouter()
    const code = router.query.code

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
        console.log('first')

        try {
            // Make an API call to reset the password
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}auth/reset-password`,
                {
                    code: code,
                    password,
                    passwordConfirmation: confirmPassword
                }
            )

            // Extract the JWT and user information from the response
            const { jwt, user } = response.data

            // Store the JWT token in a cookie for 7 days
            setCookie('jwt', jwt, 7)

            // Store only username, email, and id in the user cookie
            const userInfo = {
                username: user.username,
                email: user.email,
                id: user.id
            }
            setCookie('user', JSON.stringify(userInfo), 7)

            // Show success message
            setSnackbarMessage("Password Reset Successfully!")
            setSnackbarSeverity("success")
            setSnackbarOpen(true)

            // Reset form data to initial state
            setFormData({ password: "", confirmPassword: "" })
            router.push('/')
            setSuccess(true)
        } catch (error) {
            console.error("Password reset error:", error)
            const errorMessage = error.response?.data?.error?.message || "An error occurred"

            // Show error message
            setSnackbarMessage(errorMessage)
            setSnackbarSeverity("error")
            setSnackbarOpen(true)
        } finally {
            setLoading(false)
        }
    }

    // Handle snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    return (
        <>

            <MainLayout
                pageMeta={{
                    title: "Reset Password | CarPrices.ae",
                    description: "Reset your password to continue exploring all car prices, buying tips, and more on CarPrices.ae.",
                    type: "Car Review Website",
                }}
            >
                <div className="tw-flex tw-justify-center tw-items-center">
                    <div className="tw-w-full md:tw-w-1/3 sm:tw-w-2/3 tw-bg-white tw-shadow-lg tw-rounded-lg tw-p-8 tw-mx-4">
                        <h1 className="tw-font-bold tw-text-3xl tw-text-center tw-mb-6">Reset Password</h1>

                        <form onSubmit={handleSubmit}>
                            <label className="tw-block tw-font-semibold tw-text-sm tw-mb-2">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-p-2 tw-mb-4"
                                placeholder="Enter your new password"
                                required
                            />

                            <label className="tw-block tw-font-semibold tw-text-sm tw-mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg tw-p-2 tw-mb-4"
                                placeholder="Confirm your new password"
                                required
                            />

                            <button
                                type="submit"
                                className="tw-bg-blue-600 tw-text-white tw-py-2 tw-px-6 tw-rounded-full tw-w-full tw-font-semibold tw-flex tw-items-center tw-justify-center"
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Snackbar for Success and Error messages */}
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </MainLayout>
        </>
    )
}

export default ResetPassword
