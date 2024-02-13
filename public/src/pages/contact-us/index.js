import Layout from '@/components/layout/Layout'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

export default function ContactUs() {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post('/api/contact', data);

            if (response.status === 200) {
                // setShowSuccess(true);
                toast.info("Contact Form Submitted! We will get back to you soon.")
            }
        } catch (error) {
            // setIsError(true);
        }
        setIsLoading(false);
        // if (data?.name !== "" && data?.email !== "") {
        //     axios.post("https://api.carservice.ae/" + "contact-form", { contact: data }).then(res => {
        //         setShowSuccess(true)
        //         reset();
        //     }).catch(err => {

        //     })
        // }
    }

    return (
        <Layout pageMeta={{
            title: "Contact Us - Carprices.ae",
            description: "Contact us for any inquiries, suggestions, or feedback. We are here to assist you. Reach out to CarPrices.ae - your trusted companion in the automotive world. Let's connect and make your car journey exceptional.",
            type: "Car Review Website",
        }}>
            <>
                <section className="contact_us my-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <div className="contact_inner">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="contact_form_inner">
                                                <div className="contact_field">
                                                    <h3>WE WOULD LOVE TO HEAR FROM YOU!</h3>
                                                    <p>
                                                        We value your feedback, questions, and suggestions. Contact us anytime and we'll be happy to assist you. Reach out via phone, email, live chat, or connect with us on social media. We appreciate your engagement and look forward to connecting with you!
                                                    </p>

                                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                                        {/* {showSuccess && (
                                                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                                                <i className="bi bi-check-circle-fill me-2"></i>
                                                                <strong>Contact Form Submitted!</strong> We will contact you soon.
                                                                <button
                                                                    type="button"
                                                                    className="btn-close"
                                                                    data-bs-dismiss="alert"
                                                                    aria-label="Close"
                                                                    onClick={() => setShowSuccess(false)}
                                                                />
                                                            </div>
                                                        )} */}
                                                        <div className="mb-3">
                                                            <label htmlFor="name">Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Full Name"
                                                                {...register("name", { required: true })}
                                                            />
                                                            {errors.name && <small className='text-danger'>Please enter your name</small>}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="email">Email</label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                placeholder="Email"
                                                                {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, })}
                                                            />
                                                            {errors.email && errors.email.type === "required" && <small className='text-danger'>Please enter your email</small>}
                                                            {errors.email && errors.email.type === "pattern" && <small className='text-danger'>Invalid email format</small>}
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="mobile">Mobile</label>
                                                            <input
                                                                type="tel"
                                                                className="form-control"
                                                                placeholder="Mobile"
                                                                {...register("mobile")}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="subject">Subject</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Subject"
                                                                {...register("subject")}
                                                            />
                                                        </div>
                                                        <div className="mb-3">
                                                            <label htmlFor="message">Message</label>
                                                            <textarea
                                                                className="form-control"
                                                                placeholder="Please share your feedback"
                                                                rows="3"
                                                                style={{ height: '65px', resize: 'none' }}
                                                                {...register("message")}
                                                            ></textarea>
                                                        </div>
                                                        <div className="mb-3 btn_submit">
                                                            <button className="btn btn-primary mt-2 " type="submit">

                                                                <span className='me-3'>Send Now</span>
                                                                {isLoading ? <div class="spinner-grow" role="status">
                                                                    <span class="visually-hidden">Loading...</span>
                                                                </div> :
                                                                    <i className="bi bi-send" />}
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 py-4 px-4 contact_details">
                                            <h3><b>Contact Detail</b></h3>
                                            <div className="d-flex align-items-center mt-3">
                                                <h3 className="me-2"><i className="bi bi-phone"></i></h3>
                                                <h5><b>Mobile: </b>
                                                    <Link href="tel:+971585494351" >
                                                        <span className="fw-normal text-app-primary">+971 58 549 4351</span>
                                                    </Link>
                                                </h5>
                                            </div>
                                            <div className="d-flex align-items-center mt-3">
                                                <h3 className="me-2"><i className="bi bi-telephone"></i></h3>
                                                <h5><b>Landline: </b>
                                                    <Link href="tel:+971045543379" >
                                                        <span className="fw-normal text-app-primary">+971 04 554 3379
                                                        </span>
                                                    </Link>
                                                </h5>
                                            </div>
                                            <div className="d-flex align-items-center mt-3">
                                                <h3 className="me-2"><i className="bi bi-envelope"></i></h3>
                                                <h5><b>Email: </b>
                                                    <Link href="mailto:info@carprices.ae" >
                                                        <span className="fw-normal text-app-primary">info@carprices.ae</span>
                                                    </Link>
                                                </h5>
                                            </div>
                                            <div className="d-flex align-items-start mt-3">
                                                <h3 className="me-2"><i className="bi bi-geo-alt"></i></h3>
                                                <h5><b>Address:</b> <br />
                                                    <span className="fw-normal text-app-primary">903b, 9th floor, <br />
                                                        Ibn Battuta Gate Office, <br />
                                                        Jebel Ali, Dubai UAE.</span>
                                                </h5>
                                            </div>
                                            <div className="SocialIcons_contact_us mt-3">
                                                <ul className='d-flex ms-4'>
                                                    <li className='me-3'>
                                                        <Link
                                                            href="https://www.facebook.com/carprices.uae/"
                                                            target="_blank"
                                                            title="Facebook"
                                                            rel="noopener"
                                                        >
                                                            <i className="bi bi-facebook" />
                                                        </Link>
                                                    </li>
                                                    <li className='me-3'>
                                                        <Link
                                                            href="https://youtube.com/@carpricesuae1217"
                                                            target="_blank"
                                                            title="Youtube"
                                                            rel="noopener"
                                                        >
                                                            <i className="bi bi-youtube" />
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="https://www.instagram.com/carprices.ae/"
                                                            target="_blank"
                                                            title="Instagram"
                                                            rel="noopener"
                                                        >
                                                            <i className="bi bi-instagram" />
                                                        </Link>
                                                    </li>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </Layout>
    )
}
