
import moment from "moment";
import Link from "next/link";

const PressReleaseCard = ({ release }) => {
  const imageUrl =
    release?.attributes?.FeaturedImage?.data?.attributes?.formats?.large?.url;
  const downloadUrl = release?.attributes?.media?.data?.attributes?.url;
  const formattedDate = moment(release.attributes.date).format("MMMM Do YYYY")
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link href={release.attributes.url}>
        <img
          src={imageUrl}
          alt={release.attributes.Title}
          className="w-full h-48 lg:h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-1">
            <span className="text-xs font-semibold">Published: {formattedDate}</span>
          </p>
        </div>
        <h2 className="md:text-lg text-sm font-bold mb-2">
          <Link href={release.attributes.url}>
            <h4 className="font-semibold">{release.attributes.Title}</h4>
          </Link>
        </h2>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {release.attributes.summary}
        </p>

        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-white bg-black rounded-full px-2 py-1">
            <span className="text-xs font-semibold">Featured In: {release.attributes.FeaturedIn}</span>{" "}

          </p>
        </div>
        <div className="flex justify-between items-center">
          <Link href={release.attributes.url}>
            <span className="text-xs py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Know More &rarr;
            </span>
          </Link>
          <a
            href={downloadUrl}
            download
            className="text-xs py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Download Media
          </a>
        </div>
      </div>
    </div>
  );
};

export default PressReleaseCard;
