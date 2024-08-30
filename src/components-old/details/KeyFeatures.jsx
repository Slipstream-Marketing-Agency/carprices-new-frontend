import React from "react";
import {
  DirectionsCar,
  MusicNote,
  Lock,
  Build,
  DirectionsCarFilled,
  Person,
} from "@mui/icons-material";
import Image from "next/image";

const KeyFeatures = ({ data }) => {
  console.log(data, "");
  const features = [
    {
      icon: (
        <DirectionsCar
          fontSize="large"
          className="tw-text-blue-500 tw-text-[60px]"
        />
      ),
      title: "Comfort and Convenience",
      details: [
        "Heated and Ventilated Seats",
        "Massage Seats",
        "Air Quality Control with Cabin Air Filter",
        "Heated Steering Wheel",
        "Power Liftgate with Hands-free Operation",
      ],
    },
    {
      icon: (
        <MusicNote
          fontSize="large"
          className="tw-text-blue-500 tw-text-[60px]"
        />
      ),
      title: "Entertainment and Connectivity",
      details: [
        "Premium Sound System",
        "Bluetooth Connectivity",
        "Apple CarPlay and Android Auto",
        "Wireless Charging Pad",
        "Multiple USB Ports",
      ],
    },
    {
      icon: (
        <Lock fontSize="large" className="tw-text-blue-500 tw-text-[60px]" />
      ),
      title: "Safety and Security",
      details: [
        "Adaptive Cruise Control",
        "Lane Departure Warning",
        "Blind Spot Monitoring",
        "Automatic Emergency Braking",
        "Rear Cross-Traffic Alert",
      ],
    },
    {
      icon: (
        <Build fontSize="large" className="tw-text-blue-500 tw-text-[60px]" />
      ),
      title: "Performance and Efficiency",
      details: [
        "Turbocharged Engine",
        "All-Wheel Drive",
        "Eco Mode",
        "Sport Suspension",
        "Regenerative Braking",
      ],
    },
    {
      icon: (
        <DirectionsCarFilled
          fontSize="large"
          className="tw-text-blue-500 tw-text-[60px]"
        />
      ),
      title: "Exterior and Design",
      details: [
        "LED Headlights",
        "Panoramic Sunroof",
        "Alloy Wheels",
        "Power Folding Mirrors",
        "Rain-Sensing Wipers",
      ],
    },
    {
      icon: (
        <Person
          fontSize="large"
          className="tw-text-blue-500 md:tw-text-[60px] tw-text-[40px]"
        />
      ),
      title: "Customization and Personalization",
      details: [
        "Ambient Lighting",
        "Customizable Driver Profiles",
        "Leather Upholstery Options",
        "Interior Trim Choices",
        "Exterior Color Selections",
      ],
    },
  ];

  return (
    <>
      <h2 className="tw-font-semibold tw-mb-5 tw-mt-14">Key Features </h2>
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 ">
        {data?.map((feature, index) => (
          <div
            key={index}
            className="tw-bg-gradient-to-r tw-from-blue-50 tw-to-white tw-rounded-xl tw-p-6 tw-flex tw-flex-col tw-items-start"
          >
            <Image
              src={feature?.key_feature_title?.icon?.url}
              width={70}
              height={70}
              alt={feature?.key_feature_title?.icon?.alternativeText}
              className="tw-mb-4"
            />
           
            <h3 className=" tw-font-medium tw-mb-3">
              {feature?.key_feature_title?.key_feature_title}
            </h3>
            <ul className="tw-list-none tw-space-y-2 tw-p-0">
              <p className="tw-text-gray-600">{feature?.description}</p>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default KeyFeatures;
