import React from 'react'
import Grid from '@mui/material/Grid';
import Sidebar from '@/components/setting/Sidebar';
import SecurityComponent from '@/components/setting/SecurityComponent';

// Metadata generation
export async function generateMetadata() {
    return {
        title: "Profile Security - CarPrices.ae",
        description: "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/setting/security`,
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

const Security = () => {

    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Security Settings
            </h1>
            <Grid container spacing={2}>
                {/* Sidebar */}
                <Sidebar />

                <SecurityComponent />
            </Grid>
        </div>
    )
}

export default Security
