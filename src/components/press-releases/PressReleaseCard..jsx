import { format } from 'date-fns';
import Link from 'next/link';

const PressReleaseCard = ({ release }) => {
  const imageUrl = release?.attributes?.FeaturedImage?.data?.attributes?.formats?.large?.url;
  const downloadUrl = release?.attributes?.media?.data?.attributes?.url;
  const formattedDate = format(new Date(release.attributes.date), 'dd/MM/yyyy');
  return (
    <div className="tw-bg-white tw-rounded-lg tw-overflow-hidden tw-shadow-lg hover:tw-shadow-2xl tw-transition-shadow tw-duration-300">
      <img src={imageUrl} alt={release.attributes.Title} className="tw-w-full tw-h-48 lg:tw-h-64 tw-object-cover" />
      <div className="tw-p-4">
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
          <p className="tw-text-sm tw-text-gray-500 tw-bg-gray-200 tw-rounded-full tw-px-2 tw-py-1"><span className='tw-font-semibold'>Published:</span>  {formattedDate}</p>
        </div>
        <h2 className="tw-text-2xl tw-font-bold tw-mb-2">
          <Link href={release.attributes.url}>
            <h4 className='tw-font-semibold'>{release.attributes.Title}</h4>
          </Link>
        </h2>
        <p className="tw-text-gray-700 tw-mb-4 tw-line-clamp-3">{release.attributes.summary}</p>
        
        <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
          <p className="tw-text-sm tw-text-white tw-bg-black tw-rounded-full tw-px-2 tw-py-1"><span className='tw-font-semibold'>Featured In:</span>  {release.attributes.FeaturedIn}</p>
        </div>
        <div className="tw-flex tw-justify-between tw-items-center">
          <Link href={release.attributes.url}>
            <p className="tw-inline-block tw-py-2 tw-px-4 tw-bg-blue-500 tw-text-white tw-font-semibold tw-rounded-lg hover:tw-bg-blue-700 tw-transition-colors tw-duration-300">
              Know More &rarr;
            </p>
          </Link>
          <a href={downloadUrl} download className="tw-inline-block tw-py-2 tw-px-4 tw-bg-gray-200 tw-text-gray-700 tw-font-semibold tw-rounded-lg hover:tw-bg-gray-300 tw-transition-colors tw-duration-300">
            Download Media
          </a>
        </div>
      </div>
    </div>
  );
};

export default PressReleaseCard;
