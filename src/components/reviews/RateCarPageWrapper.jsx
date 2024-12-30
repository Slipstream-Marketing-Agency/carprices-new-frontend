'use client'
import React, { useState, useEffect, Suspense } from 'react';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getCookie } from '@/lib/helper';
import LoginModal from '@/components/login-modal/LoginModal';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import CarSelectionModal from '@/components/reviews/CarSelectionModal';
import EditIcon from '@mui/icons-material/Edit';
import NewCarSelection from './NewCarSelection';

const RateCarPageWrapper = ({ apiUrl = process.env.NEXT_PUBLIC_API_URL }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const brandSlug = searchParams.get('brand');
    const modelSlug = searchParams.get('model');

    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [carDetails, setCarDetails] = useState(null);

    const [title, setTitle] = useState('');
    const [opinion, setOpinion] = useState('');
    const [rating, setRating] = useState(4);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        if (!brandSlug || !modelSlug) return;

        setLoading(true);

        const url = `${apiUrl}car-models/brand/${brandSlug}`;

        axios.get(url, { params: { search: modelSlug } })
            .then(response => {
                const { models } = response.data.data;

                // Find and set the model details
                const foundModel = models.find(m => m.slug === modelSlug);
                if (foundModel) {
                    setCarDetails({
                        brand: foundModel.brandName,
                        model: foundModel.name,
                        image: foundModel.featuredImage,
                        year: foundModel.latestYear
                    });
                } else {
                    console.warn(`Model with slug "${modelSlug}" not found.`);
                }

                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching models:", error);
                setLoading(false);
            });
    }, [apiUrl, brandSlug, modelSlug]);

    const handleVariantSelect = (variantData) => {
        setCarDetails({
            brand: variantData.brand,
            model: variantData.model,
            year: variantData.year
        });
        router.push(`${pathname}?brand=${variantData.brand}&model=${variantData.model}`);
        setShowModal(false);
    };

    const handleReviewSubmit = async () => {
        if (title.trim().split(/\s+/).length < 3) {
            setSnackbarMessage("Title must be at least 3 words");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        if (opinion.trim().length < 20) {
            setSnackbarMessage("Opinion must be at least 20 characters");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        setIsSubmitting(true);
        const reviewData = {
            title,
            opinion,
            rating,
            car_model_slug: modelSlug
        };
        const jwt = getCookie('jwt');
        if (!jwt) {
            setIsLoginModalOpen(true);
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.post(`${apiUrl}car-reviews`, reviewData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });

            setSnackbarMessage("Review submitted successfully");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);

            setTitle("");
            setOpinion("");
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data : error.message);
            const errorMessage = error.response?.data?.error?.message || "An error occurred";
            setSnackbarMessage(errorMessage);
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        < >
            <div>
                {/* <NewCarSelection
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onVariantSelect={handleVariantSelect}
                /> */}
                <CarSelectionModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onVariantSelect={handleVariantSelect}
                />
                <div className="flex bg-gray-50 w-full h-full fixed top-0 left-0 items-center justify-center">
                    <div className="w-1/3 h-full bg-blue-50 hidden lg:flex lg:items-center lg:justify-center p-20">
                        <div className="text-center">
                            <h2 className="!text-4xl !leading-[3.5rem] text-left font-bold text-gray-800 mb-4">
                                What do you think about {carDetails?.brand || ""} {carDetails?.model || ""}?
                            </h2>
                            <div className="flex items-center justify-center">
                                <Image
                                    width={0}
                                    height={0}
                                    sizes="100vw" src="/assets/images/review.svg" alt="Review Illustration" className="w-full" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-full lg:w-2/3 px-4 relative flex flex-col items-center py-10">
                        <Link href={'/write-review'} className="absolute bg-gray-50 top-4 right-4 text-gray-600 hover:text-gray-900">
                            <CloseIcon className='bg-gray-50' />
                        </Link>

                        <div className="w-full md:w-96">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Rate & Review</h1>

                            <div className="flex items-center mb-6">
                                {carDetails?.image && <Image
                                    src={carDetails.image}
                                    alt={`${carDetails.brand} ${carDetails.model}`}
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 rounded-full object-contain mr-4"
                                />}

                                <div>
                                    <div className='flex items-center '>
                                        <h3 className="text-gray-700 font-semibold mr-5">{carDetails?.brand} {carDetails?.model}</h3>
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="px-3 py-1 rounded-xl text-gray-800 font-semibold hover:underline bg-green-300 hover:bg-green-200 flex items-center gap-1"
                                        >
                                            <EditIcon className='text-lg' />{(!carDetails?.brand || !carDetails?.model) ? 'Select Car' : 'Edit'}
                                        </button>
                                    </div>
                                    <p className="flex items-center">
                                        {Array.from({ length: 5 }, (_, i) => (
                                            <StarIcon
                                                key={i}
                                                onClick={() => setRating(i + 1)}
                                                onMouseEnter={() => setHover(i + 1)}
                                                onMouseLeave={() => setHover(null)}
                                                className={`${i < (hover || rating) ? 'text-yellow-500' : 'text-gray-300'} text-4xl cursor-pointer`}
                                            />
                                        ))}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full max-w-md">
                                <div className="mb-4">
                                    <label className="block text-gray-600 font-semibold">Review your experience</label>
                                    <textarea
                                        className="w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700 resize-none focus:border-blue-500 focus:outline-none"
                                        placeholder="We'd love your opinion about it"
                                        rows="4"
                                        minLength="20"
                                        required
                                        value={opinion}
                                        onChange={(e) => setOpinion(e.target.value)}
                                    ></textarea>
                                    <p className="text-gray-400 text-xs pt-1">Minimum 20 Words required</p>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-600 font-semibold">Title</label>
                                    <input
                                        type="text"
                                        className="w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700 focus:border-blue-500 focus:outline-none"
                                        placeholder="Title"
                                        minLength="3"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <p className="text-gray-400 text-xs pt-1">Minimum 3 Words required</p>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white font-semibold rounded-md py-3 hover:bg-blue-600"
                                    onClick={isSubmitting ? () => { } : handleReviewSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} setMyUserInfo={handleReviewSubmit} />

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </div>
        </>
    );
};

export default RateCarPageWrapper;
