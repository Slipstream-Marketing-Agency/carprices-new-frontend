'use client'

import React, { useState } from 'react';
import { Avatar, TextField, Button, MenuItem, Paper, IconButton, Collapse, Typography, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Edit } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

const countries = [
    { label: 'United Arab Emirates', value: 'UAE' },
    { label: 'United States', value: 'USA' },
    { label: 'India', value: 'IN' },
    // Add more countries as needed
];

const ProfileComponent = () => {

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'Muhammad',
        lastName: 'Moeez',
        dob: '',
        gender: 'Male',
        country: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    return (
        <Grid Grid item xs={12} md={9} >
            <Paper elevation={4} className="p-6 rounded-lg bg-gradient-to-tl shadow-lg">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <Typography variant="h4" className="font-bold">My Profile</Typography>
                        <Typography variant="body2" >Update your profile details here</Typography>
                    </div>
                    <Button
                        startIcon={<Edit />}
                        onClick={handleEdit}
                        variant="outlined"
                        className="bg-white text-blue-500"
                    >
                        {editMode ? 'Cancel' : 'Edit'}
                    </Button>
                </div>

                {/* Profile Info Section */}
                <div className="relative flex items-center mb-8">
                    {/* Avatar with Pencil Icon */}
                    <div className="relative">
                        <Avatar
                            src="/path-to-your-profile-pic.jpg"
                            alt="Profile Image"
                            sx={{ width: 150, height: 150, border: '2px solid white' }}
                        />

                        {/* Pencil Icon */}
                        <IconButton
                            color="primary"
                            className="absolute bottom-3 right-5 bg-slate-200 hover:bg-slate-300 p-1 rounded-full"
                            sx={{ transform: 'translate(25%, 25%)' }}
                            onClick={() => console.log('Change image')}
                        >
                            <EditIcon className='w-4 h-4' />
                        </IconButton>
                    </div>

                    {/* User Info */}
                    <div className="ml-4">
                        <Typography variant="h5" className="font-semibold ">
                            {formData.firstName} {formData.lastName}
                        </Typography>
                        <Typography className="text-gray-800">
                            Joined on October 2024
                        </Typography>
                    </div>
                </div>

                {/* Profile Details Section */}
                <Grid container spacing={4}>
                    {/* Name Section */}
                    <Grid item xs={12}>
                        <Paper elevation={2} className="p-4 rounded-lg bg-white shadow-md">
                            <Typography variant="h6" className="font-semibold text-gray-800 mb-4">Profile Information</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        fullWidth
                                        className='border-blue-500 focus:border-blue-700'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Last Name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        fullWidth
                                        className='border-blue-500 focus:border-blue-700'
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Account Details Section */}
                    <Grid item xs={12}>
                        <Paper elevation={2} className="p-4 rounded-lg bg-white shadow-md">
                            <Grid container spacing={2}>

                                <Grid item xs={12} className="flex">
                                    <Typography variant="h6" className="font-semibold text-gray-800">Account Details</Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Date of Birth"
                                                name="dob"
                                                type="date"
                                                value={formData.dob}
                                                onChange={handleChange}
                                                disabled={!editMode}
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                className='border-blue-500 focus:border-blue-700'
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormLabel component="legend" className="text-gray-800">Gender</FormLabel>
                                            <RadioGroup
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                row
                                                disabled={!editMode}
                                            >
                                                <FormControlLabel value="Male" control={<Radio color="primary" />} label="Male" />
                                                <FormControlLabel value="Female" control={<Radio color="primary" />} label="Female" />
                                                <FormControlLabel value="Other" control={<Radio color="primary" />} label="Other" />
                                            </RadioGroup>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                select
                                                label="Country"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleChange}
                                                disabled={!editMode}
                                                fullWidth
                                                InputProps={{
                                                    className: "border-blue-500 focus:border-blue-700",
                                                }}
                                            >
                                                {countries.map((country) => (
                                                    <MenuItem key={country.value} value={country.value}>
                                                        {country.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Save Changes Button */}
                {editMode && (
                    <div className="mt-6 flex justify-end">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setEditMode(false)}
                            className="bg-blue-600 rounded-full text-white hover:bg-blue-700"
                        >
                            Save Changes
                        </Button>
                    </div>
                )}
            </Paper>
        </Grid >
    )
}

export default ProfileComponent