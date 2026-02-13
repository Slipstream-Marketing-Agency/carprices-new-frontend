import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const ShareButton = ({ url, title, text }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (error) {if (process.env.NODE_ENV === 'development') { console.error("Error sharing content:", error); }
      }
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <span className="sm:inline-block cursor-pointer" onClick={handleShare}>
      Share
      <ShareOutlinedIcon className="sm:text-gray-300 text-[19px]" />
    </span>
  );
};

export default ShareButton;
