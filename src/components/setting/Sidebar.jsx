'use client'

import { useState } from 'react';
import { Paper, Button, Collapse, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ExpandLess, ExpandMore, AccountCircle, Security, Settings } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {
    
    const pathname = usePathname()
    
    const [profileOpen, setProfileOpen] = useState(pathname === '/setting/profile' || pathname === '/setting/address');
    const [accountOpen, setAccountOpen] = useState(false);

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
    };

    const toggleAccount = () => {
        setAccountOpen(!accountOpen);
    };

    return (
        <Grid item xs={12} md={3}>
            <Paper elevation={4} className="p-4 rounded-lg bg-white shadow-lg">
                <div className="flex flex-col gap-1 font-sans">

                    {/* Profile Section */}
                    <Button
                        variant="text"
                        className="text-left py-2 text-black font-semibold flex items-center w-full hover:bg-gray-50 transition-colors"
                        onClick={toggleProfile}
                    >
                        <AccountCircle className="mr-3 text-black" />
                        Profile
                        <IconButton size="small" className="ml-auto p-0 text-black">
                            {profileOpen ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Button>
                    <Collapse in={profileOpen}>
                        <div className="flex flex-col space-y-0.5 ml-4 mt-1">
                            {/* Basic Info Link */}
                            <Link href="/setting/profile" className={`py-1 pl-4 text-black text-base font-medium hover:bg-gray-50 w-full text-left ${pathname === '/setting/profile' ? 'border-0 border-l-4 border-solid bg-gray-100 border-blue-600' : 'border-transparent'}`}>
                                Basic Info
                            </Link>

                            {/* My Addresses Link */}
                            <Link href="/setting/address" className={`py-1 pl-4 text-black text-base font-medium hover:bg-gray-50 w-full text-left ${pathname === '/setting/address' ? 'border-0 border-l-4 border-solid bg-gray-100 border-blue-600' : 'border-transparent'}`}>
                                My Addresses
                            </Link>
                        </div>
                    </Collapse>

                    {/* Account Section */}
                    <Button
                        variant="text"
                        className="text-left py-2 text-black font-semibold flex items-center w-full hover:bg-gray-50 transition-colors"
                        onClick={toggleAccount}
                    >
                        <Settings className="mr-3 text-black" />
                        Account
                        <IconButton size="small" className="ml-auto p-0 text-black">
                            {accountOpen ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Button>
                    <Collapse in={accountOpen}>
                        <div className="flex flex-col space-y-0.5 ml-4 mt-1">
                            <Link href="/setting/phone-numbers" className={`py-1 pl-4 text-black text-base font-medium hover:bg-gray-50 w-full text-left ${pathname === '/setting/phone-numbers' ? 'border-0 border-l-4 border-solid bg-gray-100 border-blue-600' : 'border-transparent'}`}>
                                Phone Numbers
                            </Link>
                        </div>
                    </Collapse>

                    {/* Security Section */}
                    <Link href="/setting/security" className={`text-left py-2 pl-2 flex items-center text-black text-base font-medium border-l-4 hover:bg-gray-50 ${pathname === '/setting/security' ? 'border-0 border-l-4 border-solid bg-gray-100 border-blue-600' : 'border-transparent'}`}>
                        <Security className="mr-3 text-black" />
                        Security
                    </Link>
                </div>
            </Paper>
        </Grid>
    );
};

export default Sidebar;
