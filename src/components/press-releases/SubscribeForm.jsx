import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const SubscribeForm = () => {
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const initialValues = { email: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setMessage('');
    try {
      const response = await axios.post('/api/subscribe', {
        email: values.email,
        recaptchaToken,
      });

      setMessage(response.data);
      resetForm();
      setRecaptchaToken(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage(error.response ? error.response.data.message : 'An error occurred');
    }

    setSubmitting(false);
  };

  return (
    <div className="tw-max-w-md tw-mx-auto tw-bg-white tw-shadow-lg tw-rounded-lg tw-overflow-hidden tw-p-8 tw-my-8">
      <h2 className="tw-text-2xl tw-font-bold tw-mb-6">Subscribe to our Newsletter</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="tw-space-y-6">
            <div>
              <label htmlFor="email" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700">
                Email Address
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                className="tw-mt-1 tw-block tw-w-full tw-px-3 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md tw-shadow-sm tw-focus:outline-none tw-focus:ring-indigo-500 tw-focus:border-indigo-500 sm:tw-text-sm"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="tw-mt-2 tw-text-sm tw-text-red-600"
              />
            </div>
            <div className="tw-flex tw-justify-center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={setRecaptchaToken}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting || !recaptchaToken}
                className="tw-w-full tw-px-4 tw-py-2 tw-bg-indigo-600 tw-border tw-border-transparent tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium tw-text-white tw-hover:bg-indigo-700 tw-focus:outline-none tw-focus:ring-2 tw-focus:ring-offset-2 tw-focus:ring-indigo-500"
              >
                {isSubmitting ? 'Submitting...' : 'Subscribe'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {message && <p className="tw-mt-4 tw-text-sm tw-text-green-600">{message}</p>}
    </div>
  );
};

export default SubscribeForm;
