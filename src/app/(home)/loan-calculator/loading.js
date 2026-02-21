'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Loading() {
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowError(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  if (showError) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-4">
        <p className="text-gray-700 text-lg mb-4">Taking longer than usual...</p>
        <button onClick={() => router.refresh()} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Refresh Page</button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="mt-4 text-gray-500 text-sm">Loading calculator...</p>
    </div>
  );
}

