import React from 'react';
import Grid from '@mui/material/Grid';
import Sidebar from '@/components/setting/Sidebar';
import AddressComponent from '@/components/setting/AddressComponent';


// Metadata generation
export async function generateMetadata() {
    return {
        title: "User Address - CarPrices.ae",
        description: "Explore the latest car prices in UAE. Discover prices, specs, and features for any car model. Compare, calculate loans, and find reviews at CarPrices.ae.",
        charset: "UTF-8",
        alternates: {
            canonical: `https://carprices.ae/setting/address`,
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

const Address = () => {

    return (
        <div className="container py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Address Settings
            </h1>
            <Grid container spacing={2}>
                <Sidebar />

                <AddressComponent />
            </Grid>
        </div>

    );
};

export default Address;
