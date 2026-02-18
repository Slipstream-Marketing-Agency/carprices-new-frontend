export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" />
      <p className="mt-4 text-gray-500 text-sm">Loading brand details...</p>
    </div>
  );
}
