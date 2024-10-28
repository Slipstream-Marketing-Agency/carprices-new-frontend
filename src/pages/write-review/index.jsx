import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import Head from 'next/head';
import { useRouter } from 'next/router';
import SelectCar from '@/src/components/writeReview/SelectCar';

const RateCarPage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { brand, model, year } = router.query;

  // State for car details
  const [carDetails, setCarDetails] = useState({
    brand: brand || 'Toyota',
    model: model || 'Highlander',
    year: year || '2023',
  });

  // Rating and hover state for stars
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(null);

  // Update car details if URL query changes
  useEffect(() => {
    if (brand && model && year) {
      setCarDetails({ brand, model, year });
    }
  }, [brand, model, year]);

  // Function to handle car change
  const handleCarChange = (newBrand, newModel, newYear) => {
    setCarDetails({ brand: newBrand, model: newModel, year: newYear });
    router.push({
      pathname: router.pathname,
      query: { brand: newBrand, model: newModel, year: newYear },
    });
  };

  return (
    <>
      <Head>
        <title>Rate & Review the Car You Own</title>
      </Head>
      <div className="tw-flex tw-bg-gray-50 tw-w-full tw-h-full tw-fixed tw-top-0 tw-left-0 tw-items-center tw-justify-center">

        {/* Left Section */}
        <div className="tw-w-1/3 tw-h-full tw-bg-blue-50 tw-hidden lg:tw-flex lg:tw-items-center lg:tw-justify-center tw-p-20">
          <div className="tw-text-center">
            <h2 className="!tw-text-4xl !tw-leading-[3.5rem] tw-text-left tw-font-bold tw-text-gray-800 tw-mb-4">
              What do you think about {carDetails.brand} {carDetails.model} {carDetails.year}?
            </h2>
            <div className="tw-flex tw-items-center tw-justify-center">
              <img src="/assets/images/review.svg" alt="Review Illustration" className="tw-w-full" />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="tw-w-full tw-h-full lg:tw-w-2/3 tw-px-4 tw-relative tw-flex tw-flex-col tw-items-center tw-py-10">
          <button onClick={() => router.back()} className="tw-absolute tw-bg-gray-50 tw-top-4 tw-right-4 tw-text-gray-600 hover:tw-text-gray-900">
            <CloseIcon className='tw-bg-gray-50' />
          </button>

          <div className="tw-w-full md:tw-w-96">
            <h3 className="tw-text-xl tw-font-semibold tw-text-gray-800 tw-mb-6">Rate & Review</h3>

            {/* Car Information */}
            <div className="tw-flex tw-items-center tw-mb-6">
              <img
                src="/path-to-car-image.jpg"
                alt={`${carDetails.brand} ${carDetails.model}`}
                className="tw-w-16 tw-h-16 tw-rounded-md tw-object-cover tw-mr-4"
              />
              <div>
                <p className="tw-text-gray-700 tw-font-semibold">{carDetails.brand} {carDetails.model} {carDetails.year}
                  {/* Change Car Button */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="tw-ml-3 tw-p-1 tw-rounded-sm tw-text-gray-800 tw-font-semibold hover:tw-underline"
                  >
                    Edit
                  </button>
                </p>
                <p className="tw-flex tw-items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      onClick={() => setRating(i + 1)}
                      onMouseEnter={() => setHover(i + 1)}
                      onMouseLeave={() => setHover(null)}
                      className={i < (hover || rating) ? 'tw-text-yellow-500' : 'tw-text-gray-300'}
                      style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                    />
                  ))}
                </p>
              </div>
            </div>

            {/* Review Form */}
            <form className="tw-w-full tw-max-w-md">
              <div className="tw-mb-4">
                <label className="tw-block tw-text-gray-600 tw-font-semibold">Review your experience</label>
                <textarea
                  className="tw-w-full tw-mt-2 tw-border tw-border-gray-300 tw-rounded-md tw-p-3 tw-text-gray-700 tw-resize-none focus:tw-border-blue-500 focus:tw-outline-none"
                  placeholder="We'd love your opinion about it"
                  rows="4"
                  minLength="20"
                  required
                ></textarea>
                <p className="tw-text-gray-400 tw-text-xs tw-pt-1">Minimum 20 Words required</p>
              </div>

              <div className="tw-mb-4">
                <label className="tw-block tw-text-gray-600 tw-font-semibold">Title</label>
                <input
                  type="text"
                  className="tw-w-full tw-mt-2 tw-border tw-border-gray-300 tw-rounded-md tw-p-3 tw-text-gray-700 focus:tw-border-blue-500 focus:tw-outline-none"
                  placeholder="Title"
                  minLength="3"
                  required
                />
                <p className="tw-text-gray-400 tw-text-xs tw-pt-1">Minimum 3 Words required</p>
              </div>

              <button
                type="submit"
                className="tw-w-full tw-bg-blue-500 tw-text-white tw-font-semibold tw-rounded-md tw-py-3 hover:tw-bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <SelectCar showModal={showModal} setShowModal={setShowModal} setCarDetails={setCarDetails} />
      </div>
    </>
  );
};

export default RateCarPage;
