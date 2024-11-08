// components/YoutubeSubscribeButton.js
import YouTubeIcon from '@mui/icons-material/YouTube';

const YoutubeSubscribeButton = () => {
    return (
        <div className="border border-gray-200 p-6 rounded-lg text-center max-w-xs mx-auto mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Subscribe</h3>
            <p className="text-sm text-gray-600 mb-4">
                Keep up to date with all the latest and upcoming videos from our experts.
            </p>
            <a
                href="https://www.youtube.com/channel/YOUR_CHANNEL_ID?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
                <YouTubeIcon className="mr-2" fontSize="small" />
                YouTube 152K
            </a>
        </div>
    );
};

export default YoutubeSubscribeButton;
