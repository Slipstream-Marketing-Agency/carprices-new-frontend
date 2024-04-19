// pages/_error.js

import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

const CustomErrorPage = () => {
  const router = useRouter();
  
  // Check if the error is a 404 error
  if (router.isFallback) {
    // Redirect to the custom 404 page
    router.push('/404');
    return null; // Return null to prevent rendering anything during redirection
  }

  return <ErrorPage statusCode={404} />;
};

export default CustomErrorPage;
