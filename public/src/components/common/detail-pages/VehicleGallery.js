import React, { useCallback, useState } from "react";
import FeaturedImage from "../FeaturedImage";
import ImageViewer from "react-simple-image-viewer";
import Image from "next/image";

export default function VehicleGallery({ model }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <>
      {model?.mainTrim?.images?.length === 0 ? null : (
        <div id="gallery" className="my-3">
          <div className="white_bg_wrapper mt-">
            <h4 className="fw-bold">
              {model?.mainTrim?.year} {model?.brand?.name} {model?.name} Gallery
            </h4>
            <div className="row mt-2">


              {model?.mainTrim?.images?.map((src, index) => (
                <div className="col-sm-3 col-4 cover_card_image mt-1">
                  <Image
                    src={process.env.NEXT_PUBLIC_S3_URL + src?.image}
                    onClick={() => openImageViewer(index)}
                    width="200"
                    height="200"
                    key={index}
                    style={{ margin: "2px" }}
                    alt=""
                  />
                </div>

              ))}

              {isViewerOpen && (
                <ImageViewer
                  src={model?.mainTrim?.images?.map((src) => process.env.NEXT_PUBLIC_S3_URL + src.image)}
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                  disableScroll={false}
                  backgroundStyle={{
                    backgroundColor: "rgba(0,0,0,0.9)"
                  }}
                  closeOnClickOutside={true}
                />
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
