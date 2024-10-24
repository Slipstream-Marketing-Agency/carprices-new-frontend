import React, { useState } from 'react';
import { Avatar, TextField, Button, MenuItem, Grid, Paper, IconButton, Collapse, Typography, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Edit } from '@mui/icons-material';
import MainLayout from '@/src/layout/MainLayout';
import Sidebar from '@/src/components/setting/Sidebar';
import EditIcon from '@mui/icons-material/Edit';

const countries = [
    { label: 'United Arab Emirates', value: 'UAE' },
    { label: 'United States', value: 'USA' },
    { label: 'India', value: 'IN' },
    // Add more countries as needed
];

const Profile = () => {
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
        <MainLayout>
            <div className="tw-container tw-py-8">
                <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800 tw-mb-4">
                    Profile Settings
                </h1>
                <Grid container spacing={2}>

                    <Sidebar />
                    {/* Main Profile Section */}
                    <Grid item xs={12} md={9}>
                        <Paper elevation={4} className="tw-p-6 tw-rounded-lg tw-bg-gradient-to-tl tw-shadow-lg">
                            <div className="tw-mb-6 tw-flex tw-justify-between tw-items-center">
                                <div>
                                    <Typography variant="h4" className="tw-font-bold">My Profile</Typography>
                                    <Typography variant="body2" >Update your profile details here</Typography>
                                </div>
                                <Button
                                    startIcon={<Edit />}
                                    onClick={handleEdit}
                                    variant="outlined"
                                    className="tw-bg-white tw-text-blue-500"
                                >
                                    {editMode ? 'Cancel' : 'Edit'}
                                </Button>
                            </div>

                            {/* Profile Info Section */}
                            <div className="tw-relative tw-flex tw-items-center tw-mb-8">
                                {/* Avatar with Pencil Icon */}
                                <div className="tw-relative">
                                    <Avatar
                                        src="/path-to-your-profile-pic.jpg"
                                        alt="Profile Image"
                                        sx={{ width: 150, height: 150, border: '2px solid white' }}
                                    />

                                    {/* Pencil Icon */}
                                    <IconButton
                                        color="primary"
                                        className="tw-absolute tw-bottom-3 tw-right-5 tw-bg-slate-200 hover:tw-bg-slate-300 tw-p-1 tw-rounded-full"
                                        sx={{ transform: 'translate(25%, 25%)' }}
                                        onClick={() => console.log('Change image')}
                                    >
                                        <EditIcon className='tw-w-4 tw-h-4' />
                                    </IconButton>
                                </div>

                                {/* User Info */}
                                <div className="tw-ml-4">
                                    <Typography variant="h5" className="tw-font-semibold ">
                                        {formData.firstName} {formData.lastName}
                                    </Typography>
                                    <Typography className="tw-text-gray-800">
                                        Joined on October 2024
                                    </Typography>
                                </div>
                            </div>

                            {/* Profile Details Section */}
                            <Grid container spacing={4}>
                                {/* Name Section */}
                                <Grid item xs={12}>
                                    <Paper elevation={2} className="tw-p-4 tw-rounded-lg tw-bg-white tw-shadow-md">
                                        <Typography variant="h6" className="tw-font-semibold tw-text-gray-800 tw-mb-4">Profile Information</Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="First Name"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    disabled={!editMode}
                                                    fullWidth
                                                    InputProps={{
                                                        className: "tw-border-blue-500 focus:tw-border-blue-700",
                                                    }}
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
                                                    InputProps={{
                                                        className: "tw-border-blue-500 focus:tw-border-blue-700",
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>

                                {/* Account Details Section */}
                                <Grid item xs={12}>
                                    <Paper elevation={2} className="tw-p-4 tw-rounded-lg tw-bg-white tw-shadow-md">
                                        <Grid container spacing={2}>

                                            <Grid item xs={12} className="tw-flex">
                                                <Typography variant="h6" className="tw-font-semibold tw-text-gray-800">Account Details</Typography>
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
                                                            InputProps={{
                                                                className: "tw-border-blue-500 focus:tw-border-blue-700",
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormLabel component="legend" className="tw-text-gray-800">Gender</FormLabel>
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
                                                                className: "tw-border-blue-500 focus:tw-border-blue-700",
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
                                <div className="tw-mt-6 tw-flex tw-justify-end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setEditMode(false)}
                                        className="tw-bg-blue-600 tw-rounded-full tw-text-white hover:tw-bg-blue-700"
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </MainLayout>
    );
};

export default Profile;
