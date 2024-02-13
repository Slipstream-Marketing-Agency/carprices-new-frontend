import Layout from '@/components/layout/Layout'
import Link from 'next/link'
import React from 'react'

export default function AboutUs() {
    return (
        <Layout pageMeta={{
            title: "About Us - Carprices.ae",
            description: "Discover the automotive world with CarPrices.ae - your trusted portal for comprehensive car research in the UAE. Compare vehicles, stay updated with the latest models and industry trends. Join our car-loving community today!",
            type: "Car Review Website",
        }}>

            <>
                {/* end intro header */}
                <div id="mouse-here" />
                <section id="about-me">
                    <div className="container mb-3">
                        <div className="row">
                            <h2>ABOUT US</h2>
                            {/* <div className="col-lg-6 col-12 about-intro">
                                <div className="about-inner">
                                    <div className="about-ct">
                                        <img
                                            src="/assets/images/hero/hero.jpg"
                                            alt=""
                                            className="img-responsive"
                                        />
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-12">
                                <p>
                                    Established in 2017, CarPrices.ae is the leading online portal for car research in the United Arab Emirates, dedicated to new and used car buyers and enthusiasts. Our mission is to empower individuals to make informed car buying decisions by providing comprehensive and up-to-date information on a broad range of vehicles.
                                </p>
                                <br />
                                <p>
                                    Our team of automotive experts works tirelessly to maintain an extensive database of cars, offering users the ability to compare a wide range of vehicles side-by-side. This provides a comprehensive overview of the market, equipping our users with the necessary tools and insights to find the perfect car that aligns with their needs, preferences, and budget.
                                </p>
                                <br />
                                <p>
                                    At CarPrices.ae, we understand the importance of staying informed in an ever-evolving automotive industry. Therefore, we continually update our platform with the latest car models, industry news, and trends.
                                </p>
                                <br />
                                <p>
                                    In addition to our car research and comparison tools, we offer other valuable resources such as a loan calculator to assist users in their financial planning. We also provide a comprehensive sitemap for easy navigation and access to our abundant resources.
                                </p>
                                <br />
                                <p>
                                    Our commitment to the automotive industry and our users extends beyond providing information. We are more than a car research portal; we are a community of car lovers. At CarPrices.ae, we don't just love cars - we live them.
                                </p>
                                <br />
                                <p>
                                    We invite you to join our community and explore the world of cars with us.
                                </p>
                                <br />
                                <p>
                                    For any inquiries, suggestions, or feedback, please do not hesitate to Contact Us. We are always here to assist you.
                                </p>
                                <br />
                                <p>
                                    Welcome to CarPrices.ae - your trusted companion in the automotive world.
                                </p>
                                <div className="button-group">
                                    <Link href="/contact-us">
                                        <div className="btn btn-primary mt-3">Contact Us</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* end row about */}
                    </div>
                    {/* end container about */}
                </section>
                {/* end about me */}

            </>

        </Layout>

    )
}
