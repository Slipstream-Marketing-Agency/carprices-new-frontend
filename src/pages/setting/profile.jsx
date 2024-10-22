import React, { useState } from 'react';
import { Avatar, TextField, Button, MenuItem, Grid, Paper, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import MainLayout from '@/src/layout/MainLayout';

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
                <Grid container spacing={2}>
                    {/* Left Sidebar */}
                    <Grid item xs={12} md={3}>
                        <Paper elevation={3} className="tw-p-4 tw-rounded-lg">
                            <div className="tw-flex tw-flex-col">
                                <Button variant="text" className="tw-text-left tw-py-2 tw-text-black tw-font-semibold">Profile</Button>
                                <Button variant="text" className="tw-text-left tw-py-2 tw-text-gray-600">Basic Info</Button>
                                <Button variant="text" className="tw-text-left tw-py-2 tw-text-gray-600">My Addresses</Button>
                                <Button variant="text" className="tw-text-left tw-py-2 tw-text-gray-600">Account</Button>
                                <Button variant="text" className="tw-text-left tw-py-2 tw-text-gray-600">Security</Button>
                            </div>
                        </Paper>
                    </Grid>

                    {/* Main Profile Section */}
                    <Grid item xs={12} md={9}>
                        <Paper elevation={3} className="tw-p-6 tw-rounded-lg">
                            <div className="tw-mb-6 tw-flex tw-justify-between tw-items-center">
                                <div>
                                    <h1 className="tw-text-2xl tw-font-bold tw-text-gray-800">My Profile</h1>
                                    <p className="tw-text-sm tw-text-gray-500">Update your profile details here</p>
                                </div>
                                <Button
                                    startIcon={<Edit />}
                                    onClick={handleEdit}
                                    variant="outlined"
                                    className="tw-text-blue-600"
                                >
                                    {editMode ? 'Cancel' : 'Edit'}
                                </Button>
                            </div>

                            {/* Profile Info Section */}
                            <div className="tw-flex tw-items-center tw-mb-8">
                                <Avatar
                                    src="/path-to-your-profile-pic.jpg"
                                    alt="Profile Image"
                                    sx={{ width: 100, height: 100 }}
                                />
                                <div className="tw-ml-4">
                                    <h2 className="tw-text-xl tw-font-semibold">{formData.firstName} {formData.lastName}</h2>
                                    <p className="tw-text-gray-500">Joined on October 2024</p>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="First Name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        fullWidth
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
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Date of Birth"
                                        name="dob"
                                        type="date"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        select
                                        label="Gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        fullWidth
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </TextField>
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
                                    >
                                        {countries.map((country) => (
                                            <MenuItem key={country.value} value={country.value}>
                                                {country.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>

                            {/* Save Changes Button */}
                            {editMode && (
                                <div className="tw-mt-6 tw-flex tw-justify-end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setEditMode(false)}
                                        className="tw-bg-blue-600 tw-rounded-full tw-text-white"
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
