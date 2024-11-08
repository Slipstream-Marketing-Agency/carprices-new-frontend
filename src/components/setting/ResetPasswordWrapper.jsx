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
            dispatch(verifyUser())
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
        <div>
            <div className="flex justify-center items-center">
                <div className="w-full md:w-1/3 sm:w-2/3 bg-white shadow-lg rounded-lg p-8 mx-4">
                    <h1 className="font-bold text-3xl text-center mb-6">Reset Password</h1>

                    <form onSubmit={handleSubmit}>
                        <label className="block font-semibold text-sm mb-2">New Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg p-2 mb-4"
                            placeholder="Enter your new password"
                            required
                        />

                        <label className="block font-semibold text-sm mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-lg p-2 mb-4"
                            placeholder="Confirm your new password"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded-full w-full font-semibold flex items-center justify-center"
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
        </div>
    )
}

export default ResetPasswordWrapper