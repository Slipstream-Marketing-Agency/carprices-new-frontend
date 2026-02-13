'use client'

import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Paper, Dialog, DialogActions, DialogContent,
    DialogTitle, Typography, IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import dynamic from 'next/dynamic';
import axios from 'axios';

// Dynamically import the MapComponent without SSR
const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
    ssr: false,
});

const AddressComponent = () => {
    // const icon = L.icon({ iconUrl: "/assets/images/marker-icon.png" });
    const [open, setOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addressData, setAddressData] = useState({
        label: '',
        street: '',
        city: '',
        country: '',
        lat: '',
        lng: '',
    });

    const savedAddresses = [
        { id: 1, label: 'Home', street: '123 Main St', city: 'Dubai', country: 'UAE', lat: 25.276987, lng: 55.296249 },
        { id: 2, label: 'Office', street: '456 Business Ave', city: 'Abu Dhabi', country: 'UAE', lat: 24.453884, lng: 54.377343 },
    ];

    const handleModalToggle = () => {
        setOpen(!open);
    };

    const handleEdit = (address) => {
        setSelectedAddress(address);
        setAddressData({ ...address });
        setLat(address.lat)
        setLng(address.lng)
        setOpen(true);
    };

    const handleChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    const setLatLngFromMap = async (latitude, longitude) => {
        setLat(latitude);
        setLng(longitude);
        // await setAddressFromMap(latitude, longitude)
    };
    // Fetch address from lat/lng when the lat/lng changes
    useEffect(() => {
        const fetchAddressFromLatLng = async () => {
            if (lat && lng) {
                try {
                    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
                        params: {
                            lat,
                            lon: lng,
                            format: 'json',
                        },
                    });

                    const address = response.data.address;
                    setAddressData((prevData) => ({
                        ...prevData,
                        street: address.road || 'N/A',
                        city: address.city || address.town || address.village || 'N/A',
                        country: address.country || 'N/A',
                        lat,
                        lng,
                    }));
                } catch (error) {if (process.env.NODE_ENV === 'development') { console.error('Error fetching address from lat/lng:', error); }
                }
            }
        };

        fetchAddressFromLatLng();
    }, [lat, lng]); // Only run when lat or lng changes

    return (
        <>
            <Grid item xs={12} md={9}>
                <Paper elevation={4} className="p-6 rounded-lg bg-gradient-to-tl shadow-lg">
                    <div className="mb-6 flex justify-between items-center">
                        <div>
                            <Typography variant="h4" className="font-bold">My Addresses</Typography>
                            <Typography variant="body2">Manage your saved addresses here</Typography>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setAddressData({ label: '', street: '', city: '', country: '', lat: '', lng: '' });
                                setSelectedAddress(null); // Reset for new address
                                handleModalToggle();
                            }}
                            className="bg-blue-600 rounded-full hidden sm:block text-white hover:bg-blue-700"
                        >
                            Add New Address
                        </Button>
                    </div>

                    <Grid container spacing={4}>
                        {savedAddresses.map((address) => (
                            <Grid item xs={12} key={address.id}>
                                <Paper elevation={2} className="p-4 rounded-lg bg-white drop-shadow-sm flex justify-between items-center">
                                    <div>
                                        <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
                                            {address.label}
                                        </Typography>
                                        <Typography className="text-gray-700">
                                            {`${address.street}, ${address.city}, ${address.country}`}
                                        </Typography>
                                    </div>
                                    <IconButton onClick={() => handleEdit(address)}>
                                        <EditIcon />
                                    </IconButton>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Grid>

            {/* Modal for Adding/Editing Address */}
            <Dialog open={open} onClose={handleModalToggle} maxWidth="md" fullWidth>
                <DialogTitle>{selectedAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Select location on map:</Typography>
                            {/* <MapContainer
                                center={[addressData.lat || 25.276987, addressData.lng || 55.296249]}
                                zoom={13}
                                style={{ height: '300px', width: '100%' }}
                                ref={mapRef}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                {addressData.lat && addressData.lng && (
                                    <Marker icon={icon} position={[addressData.lat, addressData.lng]} />
                                )}
                                <LocationMarker setAddressFromMap={setAddressFromMap} />
                            </MapContainer> */}
                            <div className="mt-6">
                                <MapWithNoSSR lat={lat} lng={lng} setAddressFromMap={setLatLngFromMap} />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Address Label"
                                name="label"
                                value={addressData.label}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Street"
                                name="street"
                                value={addressData.street}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="City"
                                name="city"
                                value={addressData.city}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Country"
                                name="country"
                                value={addressData.country}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalToggle} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {// Save address logic
                            setOpen(false);
                        }}
                        color="primary"
                    >
                        Save Address
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddressComponent