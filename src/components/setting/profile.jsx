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
                            onClick={handleEdit}
                        >
                            <EditIcon />
                        </IconButton>
                    </div>

                    {/* Name and Email */}
                    <div className="ml-6">
                        <Typography variant="h5" className="font-semibold">
                            {formData.firstName} {formData.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            email@example.com
                        </Typography>
                    </div>
                </div>

                {/* Editable Form */}
                <Collapse in={editMode}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                variant="outlined"
                            >
                                {countries.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                row
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                <FormControlLabel value="Other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => {
                                    setEditMode(false);
                                    // Save logic here
                                }}
                            >
                                Save Changes
                            </Button>
                        </Grid>
                    </Grid>
                </Collapse>
            </Paper>
        </Grid>
    );
};

export default ProfileComponent;