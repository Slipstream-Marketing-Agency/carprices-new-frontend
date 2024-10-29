'use client'

import React, { useState } from 'react'
import { Paper, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import Grid from '@mui/material/Grid';
import { Delete } from '@mui/icons-material'
import axios from 'axios'
import { getCookie } from '@/lib/helper';

const SecurityComponent = () => {
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
        <>
            {/* Main Security Section */}
            <Grid item xs={12} md={9}>
                <Paper elevation={4} className="p-6 rounded-lg bg-gradient-to-tl shadow-lg">
                    <div className="mb-6 flex justify-between items-center">
                        <Typography variant="h4" className="font-bold">
                            Change Password
                        </Typography>
                    </div>

                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Paper elevation={2} className="p-4 rounded-lg bg-white shadow-md">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            label="Old Password"
                                            name="oldPassword"
                                            type="password"
                                            value={formData.oldPassword}
                                            onChange={handleChange}
                                            fullWidth
                                            className='border-blue-500 focus:border-blue-700'
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
                                            className='border-blue-500 focus:border-blue-700'
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
                                            className='border-blue-500 focus:border-blue-700'
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Save Changes Button */}
                    <div className="mt-6 flex justify-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveChanges}
                            className="bg-blue-600 rounded-full text-white hover:bg-blue-700"
                        >
                            Save Changes
                        </Button>
                    </div>

                    {/* Delete Account Section */}
                    <div className="mt-8 flex justify-center">
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleOpenModal}
                            className="rounded-full text-red-600 hover:bg-red-50"
                            startIcon={<Delete />}
                        >
                            Delete Account
                        </Button>
                    </div>
                </Paper>
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
                        className="bg-red-600 hover:bg-red-800">
                        Confirm Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SecurityComponent