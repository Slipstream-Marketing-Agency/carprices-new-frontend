// app/components/NewsLetterSubscription.js
'use client'; // Needed to make sure this component runs on the client side

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const NewsLetterSubscription = () => {
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', or 'success'
  const [message, setMessage] = useState('');

  const initialValues = { email: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const handleSubscribe = async (values, { resetForm }) => {
    setStatus('loading');
    setMessage('');

    // Placeholder for the API call to subscribe the email
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
      setStatus('success');
      setMessage('Thank you for subscribing!');
      resetForm();
    } catch (error) {
      setStatus('idle');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="h-[230px] bg-blue-100 shadow-md p-6 rounded-lg text-center max-w-xs mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Subscribe to our Newsletter</h3>
      <p className="text-sm text-gray-600 mb-4">
        Stay updated with the latest news and insights from our team.
      </p>

      {status === 'success' ? (
        <div className="flex flex-col items-center">
          <CheckCircleIcon className="text-green-600" fontSize="large" />
          <p className="text-green-600 mt-2">{message}</p>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubscribe}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center">
              <div className="w-full mb-4 relative">
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-xl p-2 w-full focus:outline-none focus:border-green-500 text-sm "
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-center w-full text-xs mt-1 absolute"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 bg-green-600 text-white text-sm font-normal py-2 px-4  rounded-[47px] hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                {status === 'loading' ? (
                  <CircularProgress size={24} className="text-white" />
                ) : (
                  'Subscribe'
                )}
              </button>
            </Form>
          )}
        </Formik>
      )}

      {message && status !== 'success' && <p className="text-sm text-red-600 mt-4">{message}</p>}
    </div>
  );
};

export default NewsLetterSubscription;
