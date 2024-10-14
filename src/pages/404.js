import MainLayout from "../layout/MainLayout";
import Link from "next/link";
import Head from "next/head"; // Import the Head component

export default function Custom404() {
    return (
        <>
            <Head>
                {/* Add noindex meta tag here */}
                <meta name="robots" content="noindex, nofollow" />
                <title>404 - Page Not Found</title>
            </Head>
            <MainLayout>
                <div id="notfound">
                    <div className="notfound-bg">
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>404</h1>
                        </div>
                        <h2>Page Not Found</h2>
                        <p>
                            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                        </p>
                        <Link href="/">Homepage</Link>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
