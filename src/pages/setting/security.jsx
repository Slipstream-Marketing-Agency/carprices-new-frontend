import React, { useState } from 'react'
import MainLayout from '@/src/layout/MainLayout'
import { Grid, Paper, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Delete } from '@mui/icons-material'
import axios from 'axios'
import Sidebar from '@/src/components/setting/Sidebar'
import { getCookie } from '@/src/lib/helper'

const Security = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [editMode, setEditMode] = useState(true)
    const [openModal, setOpenModal] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSaveChanges = () => {
        setEditMode(false)
    }

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const handleDeleteAccount = async () => {
        try {
            const jwt = getCookie('jwt')
            const user = JSON.parse(getCookie('user'))
            const userId = user?.id

            if (jwt && userId) {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}users/${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                })
                // Handle successful account deletion here
                alert("Account deleted successfully.")
            } else {
                console.error("User not authenticated.")
            }
        } catch (error) {
            console.error("Error deleting account:", error)
        } finally {
            handleCloseModal()
        }
    }

    return (
        <MainLayout>
            <div className="tw-container tw-py-8">
                <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-4">
                    Security Settings
                </h1>
                <Grid container spacing={2}>
                    {/* Sidebar */}
                    <Sidebar />

                    {/* Main Security Section */}
                    <Grid item xs={12} md={9}>
                        <Paper elevation={4} className="tw-p-6 tw-rounded-lg tw-bg-gradient-to-tl tw-shadow-lg">
                            <div className="tw-mb-6 tw-flex tw-justify-between tw-items-center">
                                <Typography variant="h4" className="tw-font-bold">
                                    Change Password
                                </Typography>
                            </div>

                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <Paper elevation={2} className="tw-p-4 tw-rounded-lg tw-bg-white tw-shadow-md">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Old Password"
                                                    name="oldPassword"
                                                    type="password"
                                                    value={formData.oldPassword}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    InputProps={{
                                                        className: "tw-border-blue-500 focus:tw-border-blue-700",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="New Password"
                                                    name="newPassword"
                                                    type="password"
                                                    value={formData.newPassword}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    InputProps={{
                                                        className: "tw-border-blue-500 focus:tw-border-blue-700",
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Confirm Password"
                                                    name="confirmPassword"
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    fullWidth
                                                    InputProps={{
                                                        className: "tw-border-blue-500 focus:tw-border-blue-700",
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>

                            {/* Save Changes Button */}
                            <div className="tw-mt-6 tw-flex tw-justify-end">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSaveChanges}
                                    className="tw-bg-blue-600 tw-rounded-full tw-text-white hover:tw-bg-blue-700"
                                >
                                    Save Changes
                                </Button>
                            </div>

                            {/* Delete Account Section */}
                            <div className="tw-mt-8 tw-flex tw-justify-center">
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleOpenModal}
                                    className="tw-rounded-full tw-text-red-600 hover:tw-bg-red-50"
                                    startIcon={<Delete />}
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Confirmation Modal */}
                <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Confirm Account Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteAccount} variant="contained"
                            color="primary"
                            className="tw-bg-red-600 hover:tw-bg-red-800 hover:tw-bg-red-50">
                            Confirm Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </MainLayout>
    )
}

export default Security
