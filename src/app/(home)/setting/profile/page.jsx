import React from 'react';
import Grid from '@mui/material/Grid';
import Sidebar from '@/components/setting/Sidebar';
import ProfileComponent from '@/components/setting/profile';

// Metadata generation
export async function generateMetadata() {
    return {
        title: "Profile Information - CarPrices.ae",
        description: "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/setting/profile`,
        },
        keywords: "",
        robots: {
            index: true,
            follow: true,
        },
        author: "Carprices.ae Team",
        icon: "./favicon.ico",
    };
}

const Profile = () => {

    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Profile Settings
            </h1>
            <Grid container spacing={2}>

                <Sidebar />
                <ProfileComponent />
            </Grid>
        </div>
    );
};

export default Profile;
