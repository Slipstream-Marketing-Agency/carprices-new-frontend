import { useState } from 'react';
import { Grid, Paper, Button, Collapse, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore, AccountCircle, Security, Settings } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
    
    const router = useRouter();
    
    const [profileOpen, setProfileOpen] = useState(router.pathname === '/setting/profile' || router.pathname === '/setting/address');
    const [accountOpen, setAccountOpen] = useState(false);

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
    };

    const toggleAccount = () => {
        setAccountOpen(!accountOpen);
    };

    return (
        <Grid item xs={12} md={3}>
            <Paper elevation={4} className="tw-p-4 tw-rounded-lg tw-bg-white tw-shadow-lg">
                <div className="tw-flex tw-flex-col tw-gap-1 tw-font-sans">

                    {/* Profile Section */}
                    <Button
                        variant="text"
                        className="tw-text-left tw-py-2 tw-text-black tw-font-semibold tw-flex tw-items-center tw-w-full hover:tw-bg-gray-50 tw-transition-colors"
                        onClick={toggleProfile}
                    >
                        <AccountCircle className="tw-mr-3 tw-text-black" />
                        Profile
                        <IconButton size="small" className="tw-ml-auto tw-p-0 tw-text-black">
                            {profileOpen ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Button>
                    <Collapse in={profileOpen}>
                        <div className="tw-flex tw-flex-col tw-space-y-0.5 tw-ml-4 tw-mt-1">
                            {/* Basic Info Link */}
                            <Link href="/setting/profile" className={`tw-py-1 tw-pl-4 tw-text-black tw-text-base tw-font-medium hover:tw-bg-gray-50 tw-w-full tw-text-left ${router.pathname === '/setting/profile' ? 'tw-border-0 tw-border-l-4 tw-border-solid tw-bg-gray-100 tw-border-blue-600' : 'tw-border-transparent'}`}>
                                Basic Info
                            </Link>

                            {/* My Addresses Link */}
                            <Link href="/setting/address" className={`tw-py-1 tw-pl-4 tw-text-black tw-text-base tw-font-medium hover:tw-bg-gray-50 tw-w-full tw-text-left ${router.pathname === '/setting/address' ? 'tw-border-0 tw-border-l-4 tw-border-solid tw-bg-gray-100 tw-border-blue-600' : 'tw-border-transparent'}`}>
                                My Addresses
                            </Link>
                        </div>
                    </Collapse>

                    {/* Account Section */}
                    <Button
                        variant="text"
                        className="tw-text-left tw-py-2 tw-text-black tw-font-semibold tw-flex tw-items-center tw-w-full hover:tw-bg-gray-50 tw-transition-colors"
                        onClick={toggleAccount}
                    >
                        <Settings className="tw-mr-3 tw-text-black" />
                        Account
                        <IconButton size="small" className="tw-ml-auto tw-p-0 tw-text-black">
                            {accountOpen ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Button>
                    <Collapse in={accountOpen}>
                        <div className="tw-flex tw-flex-col tw-space-y-0.5 tw-ml-4 tw-mt-1">
                            <Link href="/setting/phone-numbers" className={`tw-py-1 tw-pl-4 tw-text-black tw-text-base tw-font-medium hover:tw-bg-gray-50 tw-w-full tw-text-left ${router.pathname === '/setting/phone-numbers' ? 'tw-border-0 tw-border-l-4 tw-border-solid tw-bg-gray-100 tw-border-blue-600' : 'tw-border-transparent'}`}>
                                Phone Numbers
                            </Link>
                        </div>
                    </Collapse>

                    {/* Security Section */}
                    <Link href="/setting/security" className={`tw-text-left tw-py-2 tw-pl-4 tw-flex tw-items-center tw-text-black tw-text-base tw-font-medium tw-border-l-4 hover:tw-bg-gray-50 ${router.pathname === '/setting/security' ? 'tw-border-0 tw-border-l-4 tw-border-solid tw-bg-gray-100 tw-border-blue-600' : 'tw-border-transparent'}`}>
                        <Security className="tw-mr-3 tw-text-black" />
                        Security
                    </Link>
                </div>
            </Paper>
        </Grid>
    );
};

export default Sidebar;
