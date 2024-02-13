import React, { useEffect, useState } from "react";
import { hasCookie, setCookie } from "cookies-next";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Link from "next/link";

const CookieConsent = () => {
    const [showConsent, setShowConsent] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already given consent
        if (hasCookie("localConsent")) {
            setShowConsent(true);
        }

        // Add a delay of 8 seconds using setTimeout before showing the popup
        const timer = setTimeout(() => {
            setVisible(true);
        }, 8000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleClose = () => {
        setVisible(false);
        // Set a cookie to remember the user's preference
        setShowConsent(true);
        setCookie("localConsent", "true");
    };

    if (showConsent) {
        return null;
    }

    return (
        <Dialog
            visible={visible}
            header="Cookie Consent"
            footer={
                <div>
                    <Button label="Accept" icon="pi pi-check" onClick={handleClose} />
                </div>
            }
            onHide={handleClose}
            position="bottom"
            closable={false} // Hide the close button
            modal
        >
            <div>
                <p>
                    This website uses cookies to improve user experience. By using our website, you consent to all cookies in accordance with our <Link href="/privacy" className="text-primary">Privacy Policy</Link>
                </p>
            </div>
        </Dialog>
    );
};

export default CookieConsent;
