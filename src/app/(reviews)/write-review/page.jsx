'use client'
import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const RateCarPage = ({ apiUrl = process.env.NEXT_PUBLIC_API_URL }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const brandSlug = searchParams.get('brand');
    const modelSlug = searchParams.get('model');
    const year = searchParams.get('year') || '2024';

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const [carDetails, setCarDetails] = useState({
        brand: 'Toyota',
        model: 'Highlander',
    });

    const [rating, setRating] = useState(4);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`${apiUrl}car-trims/${year}/brands`)
            .then(response => {
                setBrands(response.data.brands);
                const foundBrand = response.data.brands.find(b => b.slug === brandSlug);
                if (foundBrand) {
                    setSelectedBrand(foundBrand);
                    setCarDetails(prev => ({ ...prev, brand: foundBrand.name }));
                    fetchModels(foundBrand.slug);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching brands:", error);
                setLoading(false);
            });
    }, [apiUrl, year, brandSlug]);

    const fetchModels = (brandSlug) => {
        setLoading(true);
        axios.get(`${apiUrl}car-trims/${year}/brands/${brandSlug}/models`)
            .then(response => {
                setModels(response.data.models);
                const foundModel = response.data.models.find(m => m.slug === modelSlug);
                if (foundModel) {
                    setCarDetails(prev => ({ ...prev, model: foundModel.name }));
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching models:", error);
                setLoading(false);
            });
    };

    const handleCarChange = (newBrand, newModel) => {
        setCarDetails({ brand: newBrand, model: newModel });
        router.push(`${pathname}?brand=${newBrand}&model=${newModel}&year=${year}`);
    };

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
        setStep(2);
        fetchModels(brand.slug);
    };

    const handleModelSelect = (model) => {
        setCarDetails({ brand: selectedBrand.name, model: model.name });
        setShowModal(false);
        handleCarChange(selectedBrand.slug, model.slug);
    };

    return (
        <>
            <div className="flex bg-gray-50 w-full h-full fixed top-0 left-0 items-center justify-center">

                {/* Left Section */}
                <div className="w-1/3 h-full bg-blue-50 hidden lg:flex lg:items-center lg:justify-center p-20">
                    <div className="text-center">
                        <h2 className="!text-4xl !leading-[3.5rem] text-left font-bold text-gray-800 mb-4">
                            What do you think about {carDetails.brand} {carDetails.model}?
                        </h2>
                        <div className="flex items-center justify-center">
                            <Image
                                width={0}
                                height={0}
                                sizes="100vw" src="/assets/images/review.svg" alt="Review Illustration" className="w-full" />
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full h-full lg:w-2/3 px-4 relative flex flex-col items-center py-10">
                    <button onClick={() => router.back()} className="absolute bg-gray-50 top-4 right-4 text-gray-600 hover:text-gray-900">
                        <CloseIcon className='bg-gray-50' />
                    </button>

                    <div className="w-full md:w-96">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Rate & Review</h3>

                        {/* Car Information */}
                        <div className="flex items-center mb-6">
                            <Image
                                src="/path-to-car-image.jpg"
                                alt={`${carDetails.brand} ${carDetails.model}`}
                                width={64}
                                height={64}
                                className="w-16 h-16 rounded-md object-cover mr-4"
                            />
                            <div>
                                <p className="text-gray-700 font-semibold">{carDetails.brand} {carDetails.model}
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="ml-3 p-1 rounded-sm text-gray-800 font-semibold hover:underline"
                                    >
                                        Edit
                                    </button>
                                </p>
                                <p className="flex items-center">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <StarIcon
                                            key={i}
                                            onClick={() => setRating(i + 1)}
                                            onMouseEnter={() => setHover(i + 1)}
                                            onMouseLeave={() => setHover(null)}
                                            className={i < (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}
                                            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                        />
                                    ))}
                                </p>
                            </div>
                        </div>

                        {/* Review Form */}
                        <form className="w-full max-w-md">
                            <div className="mb-4">
                                <label className="block text-gray-600 font-semibold">Review your experience</label>
                                <textarea
                                    className="w-full mt-2 border border-gray-300 rounded-md p-3 text-gray-700 resize-none focus:border-blue-500 focus:outline-none"
                                    placeholder="We'd love your opinion about it"
                                    rows="4"
                                    minLength="20"
                                    required
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
                                />
                                <p className="text-gray-400 text-xs pt-1">Minimum 3 Words required</p>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white font-semibold rounded-md py-3 hover:bg-blue-600"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

                {/* Modal for Changing Car Details */}
                {showModal && (
                    <div
                        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                <CloseIcon />
                            </button>

                            <div className="flex mb-4 border-b border-gray-200">
                                <button
                                    onClick={() => setStep(1)}
                                    className={`flex-1 py-2 font-semibold text-center ${step === 1 ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                                >
                                    Brand
                                </button>
                                <button
                                    onClick={() => step === 2 && setStep(2)}
                                    className={`flex-1 py-2 font-semibold text-center ${step === 2 ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
                                    disabled={step < 2}
                                >
                                    Model
                                </button>
                            </div>

                            {step === 1 ? (
                                <div className="grid grid-cols-2 gap-4 max-h-72 overflow-auto">
                                    {brands.map((brand) => (
                                        <button
                                            key={brand.slug}
                                            onClick={() => handleBrandSelect(brand)}
                                            className="flex items-center border border-gray-200 rounded-md p-2 hover:border-blue-400"
                                        >
                                            <Image src={brand.brandLogo} alt={brand.name} width={40} height={40} className="mr-3" />
                                            <span className="font-medium text-gray-700">{brand.name}</span>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 max-h-72 overflow-auto">
                                    {models.map((model) => (
                                        <button
                                            key={model.slug}
                                            onClick={() => handleModelSelect(model)}
                                            className="flex items-center border border-gray-200 rounded-md p-2 hover:border-blue-400"
                                        >
                                            <span className="font-medium text-gray-700">{model.name}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RateCarPage;
