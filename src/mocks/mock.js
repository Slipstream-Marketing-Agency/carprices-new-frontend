import carImage1 from "../../public/volvo-img.svg";
import carImage2 from "../../public/bmw-black.svg";
import carImage3 from "../../public/audi-img.svg";
import carImage4 from "../../public/jeep-image.svg";
import mistubishiIcon from "../../public/carLoanPage/choosecar-popup/mistubishi-icon.png";
import bmwIcon from "../../public/carLoanPage/choosecar-popup/bmw-icon.png";
import fotoniIcon from "../../public/carLoanPage/choosecar-popup/foton-icon.png";
import abarthIcon from "../../public/carLoanPage/choosecar-popup/abarth-icon.png";
import fiatIcon from "../../public/carLoanPage/choosecar-popup/fiat-icon.png";
import vwIcon from "../../public/carLoanPage/choosecar-popup/vw-icon.png";
import changanIcon from "../../public/carLoanPage/choosecar-popup/changan-icon.png";
import toyotaIcon from "../../public/carLoanPage/choosecar-popup/toyota-icon.png";
import bmwM2 from "../../public/bmw-m2.png";
import bmw1series from "../../public/bmw-1series.png";
import newsImage1 from "../../public/news-image1.png";
import newsImage2 from "../../public/news-image2.png";
import newsImage3 from "../../public/news-image3.png";
import newsImage4 from "../../public/news-image4.png";
import newsImage5 from "../../public/news-image5.png";
import newsImage6 from "../../public/news-image6.png";
import articleImage1 from "../../public/newspage-articles-image1.png";
import articleImage2 from "../../public/newspage-articles-image2.png";
import image1 from "../../public/newsDetailsPage/image1.png";
import image2 from "../../public/newsDetailsPage/image2.png";
import image3 from "../../public/newsDetailsPage/image3.png";
import image4 from "../../public/newsDetailsPage/image4.png";
import image5 from "../../public/newsDetailsPage/image5.png";
import adUnihostImage from "../../public/newsDetailsPage/ad-unihost.png";
import adSummerImage from "../../public/newsDetailsPage/ad-summer.png";
import adSamsungImage from "../../public/newsDetailsPage/ad-samsung.png";
import adSidebar1 from "../../public/newspage-sidebar-ad1.png";
import adSidebar2 from "../../public/newspage-sidebar-ad2.png";
import convertible from "../../public/newsDetailsPage/convertible.png";
import coupe from "../../public/newsDetailsPage/coupe.png";
import hatchback from "../../public/newsDetailsPage/hatchback.png";
import suv from "../../public/newsDetailsPage/SUV.png";
import midsizesuv from "../../public/newsDetailsPage/midsizesuv.png";
import pickup from "../../public/newsDetailsPage/pickup.png";
import sedan from "../../public/newsDetailsPage/sedan.png";
import sports from "../../public/newsDetailsPage/sports.png";
import fullsizesuv from "../../public/newsDetailsPage/fullsizesuv.png";
import van from "../../public/newsDetailsPage/van.png";

export const carData = {
  optionsBrand: [
    { value: "Benz", label: "Benz" },
    { value: "BMW", label: "BMW" },
    { value: "Toyota", label: "Toyota" },
  ],
  optionsModels: [
    { value: "AMG", label: "AMG" },
    { value: "GLE", label: "GLE" },
    { value: "M3", label: "M3" },
  ],
  optionsVariants: [
    { value: "AMG-petrol", label: "AMG-petrol" },
    { value: "AMG-variantB", label: "AMG-variantB" },
  ],
  optionsYears: [
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
  ],
  optionsCities: [
    { value: "Dubai", label: "Dubai" },
    { value: "Abudhabi", label: "Abu Dhabi" },
    { value: "Ajman", label: "Ajman" },
    { value: "Sharjah", label: "Sharjah" },
    { value: "Fujairah", label: "Fujairah" },
    { value: "UmmAlQuwain", label: "Umm Al Quwain" },
    { value: "RasAlKhaimah", label: "Ras Al Khaimah" },
  ],
  optionsNationalities: [
    { value: "Indian", label: "Indian" },
    { value: "Emirati", label: "Emirati" },
    { value: "Philipino", label: "Philipino" },
    { value: "Russian", label: "Russian" },
  ],
  optionsCountry: [
    { value: "India", label: "India" },
    { value: "UAE", label: "UAE" },
    { value: "Philipines", label: "Philipines" },
    { value: "Russia", label: "Russia" },
    { value: "Brazil", label: "Brazil" },
  ],
  optionsInsurance: [
    { value: "fullyComprehensive", label: "Fully Comprehensive" },
    { value: "thirdParty", label: "Third Party" },
  ],

  chooseCar: [
    {
      image: carImage1,
      brand: "Volvo",
      model: "Volvo XC40",
      price: "AED 185,850* - 222,900*",
      mileage: "90",
      transmission: "Manual",
      seats: "5 seater",
      emi: "AED 3,196",
    },
    {
      image: carImage2,
      brand: "BMW",
      model: "BMW X5",
      price: "AED 185,850* - 222,900*",
      mileage: "90",
      transmission: "Manual",
      seats: "5 seater",
      emi: "AED 3,196",
    },
    {
      image: carImage3,
      brand: "Audi",
      model: "Audi Q5",
      price: "AED 185,850* - 222,900*",
      mileage: "90",
      transmission: "Manual",
      seats: "5 seater",
      emi: "AED 3,196",
    },
    {
      image: carImage1,
      brand: "Volvo",
      model: "Volvo XC40",
      price: "AED 185,850* - 222,900*",
      mileage: "90",
      transmission: "Manual",
      seats: "5 seater",
      emi: "AED 3,196",
    },
  ],
  carComparison: [
    {
      image2: carImage1,
      brand2: "Volvo",
      model2: "Volvo XC40",
      price2: "AED 456,500*",
      image1: carImage3,
      brand1: "Audi",
      model1: "Audi Q5",
      price1: "AED 185,850* - 222,900*",
    },
    {
      image2: carImage2,
      brand2: "BMW",
      model2: "BMW X5",
      price2: "AED 155,123*",
      image1: carImage4,
      brand1: "Jeep",
      model1: "Jeep Compass",
      price1: "AED 185,850* - 222,900*",
    },
    {
      image2: carImage1,
      brand2: "Volvo",
      model2: "Volvo XC40",
      price2: "AED 456,500*",
      image1: carImage3,
      brand1: "Audi",
      model1: "Audi Q5",
      price1: "AED 185,850* - 222,900*",
    },
    {
      image2: carImage2,
      brand2: "BMW",
      model2: "BMW X5",
      price2: "AED 155,123*",
      image1: carImage4,
      brand1: "Jeep",
      model1: "Jeep Compass",
      price1: "AED 185,850* - 222,900*",
    },
  ],
  popularNewCars: [
    "New Honda HRV",
    "JAC S3 PLus",
    "Audi Q7",
    "New Ford Bronco",
    "New Honda Civic",
    "New Honda HRV",
    "JAC S3 PLus",
    "Audi Q7",
    "New Ford Bronco",
    "New Honda Civic",
    "New Honda HRV",
    "JAC S3 PLus",
    "Audi Q7",
    "New Ford Bronco",
    "New Honda Civic",
    "Audi Q7",
  ],
  searchedKeywords: [
    "Top 10 Best-Selling Cars of the Year",
    "Budget-Friendly Cars Under AED 50,000",
    "Electric Vehicles: The Future of Driving",
    "SUV Showdown: Comparing the Top Models",
    "New car launches",
    "Maintenance Tips to Keep Your Car Running Smoothly",
    "Most popular new car models",
    "Top-selling new car trims",
    "Top new car demand",
    "Top-selling new car brands",
  ],
  chooseBrandModal: [
    {
      image: mistubishiIcon,
      brand: "mistubishi",
    },
    {
      image: bmwIcon,
      brand: "BMW",
    },
    {
      image: fotoniIcon,
      brand: "foton",
    },
    {
      image: abarthIcon,
      brand: "abarth",
    },
    {
      image: fiatIcon,
      brand: "fiat",
    },
    {
      image: vwIcon,
      brand: "VW",
    },
    {
      image: changanIcon,
      brand: "changan",
    },
    {
      image: toyotaIcon,
      brand: "toyota",
    },
    {
      image: mistubishiIcon,
      brand: "mistubishi",
    },
    {
      image: bmwIcon,
      brand: "BMW",
    },
    {
      image: fotoniIcon,
      brand: "foton",
    },
    {
      image: fiatIcon,
      brand: "fiat",
    },
  ],
  chooseModal: [
    "1 Series",
    "2 Series Convertible",
    "1 Series Coupe",
    "5 Series Sedan",
    "6 Series Grand Tursimo",
    "7 Series Sedan",
    "8 Series Convertible",
    "8 Series Convertible",
    "M2 Coupe",
    "i5",
    "i7",
    "i8 Roadster",
    "8 Series Convertible",
    "8 Series Convertible",
    "8 Series Convertible",
    "8 Series Convertible",
  ],
  chooseYear: ["2024", "2023", "2022", "2021"],
  chooseVariant: ["M Septronic"],
  sliderData: [
    {
      icon: changanIcon,
      title: "Development",
      content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
      backgroundImage: carImage3,
    },
    {
      icon: vwIcon,
      title: "Branding",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      backgroundImage: carImage1,
    },
    {
      icon: fiatIcon,
      title: "Design",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      backgroundImage: carImage2,
    },
    {
      icon: fiatIcon,
      title: "Design",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      backgroundImage: carImage2,
    },
    {
      icon: fiatIcon,
      title: "Design",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      backgroundImage: carImage2,
    },
  ],
  compareCarsData: [
    {
      model: "M2 Coupe M Steptronic",
      price: "AED 165,500",
      type: "Coupe",
      cylinders: 6,
      displacement: 3000,
      power: 460,
      torque: 550,
      fuelType: "Petrol",
      drive: "Rear Wheel Drive",
      transmission: "Automatic",
      gears: "8-speed",
      fuelTank: 52,
      consumption: 10.4,
    },
    {
      model: "1 Series 120i",
      price: "AED 204,510",
      type: "Hatch Back",
      cylinders: 4,
      displacement: 1600,
      power: 177,
      torque: 250,
      fuelType: "Petrol",
      drive: "Front Wheel Drive",
      transmission: "Automatic",
      gears: "8-speed",
      fuelTank: 52,
      consumption: 10.4,
    },
    {
      model: "2 Series Coupe M240i xDRIVE",
      price: "AED 295,000",
      type: "Coupe",
      cylinders: 6,
      displacement: 3000,
      power: 374,
      torque: 500,
      fuelType: "Petrol",
      drive: "All Wheel Drive",
      transmission: "Automatic",
      gears: "8-speed",
      fuelTank: 52,
      consumption: 10.4,
    },
  ],
  compareCarsDetails: {
    cars: [
      {
        image: bmwM2,
        brand: "BMW",
        model: "M2 Coupe M Steptronic",
        price: "AED 165,500",
        type: "Coupe",
      },
      {
        image: bmw1series,
        brand: "BMW",
        model: "1 Series 120i",
        price: "AED 204,510",
        type: "Hatch Back",
      },
      {
        image: bmw1series,
        brand: "BMW",
        model: "2 Series Coupe M240i xDRIVE",
        price: "AED 295,000",
        type: "Coupe",
      },
    ],
    BasicInformation: {
      sections: [
        { header: "Model", field: "model" },
        { header: "Price", field: "price" },
        { header: "Type", field: "type" },
      ],
      details: [
        {
          brand: "BMW",
          model: "M2 Coupe M Steptronic",
          price: "AED 165,500",
          type: "Coupe",
        },
        {
          brand: "BMW",
          model: "1 Series 120i",
          price: "AED 204,510",
          type: "Hatch Back",
        },
        {
          brand: "BMW",
          model: "2 Series Coupe M240i xDRIVE",
          price: "AED 295,000",
          type: "Coupe",
        },
        {
          brand: "-",
          model: "-",
          price: "-",
          type: "-",
        },
      ],
    },
    Engine_and_Transmssion_Details: {
      sections: [
        { header: "No. of Cylinders", field: "cylinders" },
        { header: "Displacement (cc)", field: "displacement" },
        { header: "Power (hp)", field: "power" },
        { header: "Peak Torque (Nm)", field: "torque" },
        { header: "Fuel Type", field: "fuelType" },
        { header: "Drive", field: "drive" },
        { header: "Transmission Type", field: "transmission" },
        { header: "No. of Gears", field: "gears" },
      ],

      details: [
        {
          cylinders: 6,
          displacement: 3000,
          power: 460,
          torque: 550,
          fuelType: "Petrol",
          drive: "Rear Wheel Drive",
          transmission: "Automatic",
          gears: "8-speed",
        },
        {
          cylinders: 4,
          displacement: 1600,
          power: 177,
          torque: 250,
          fuelType: "Petrol",
          drive: "Front Wheel Drive",
          transmission: "Automatic",
          gears: "8-speed",
        },
        {
          cylinders: 6,
          displacement: 3000,
          power: 374,
          torque: 500,
          fuelType: "Petrol",
          drive: "All Wheel Drive",
          transmission: "Automatic",
          gears: "8-speed",
        },
        {
          cylinders: "-",
          displacement: "-",
          power: "-",
          torque: "-",
          fuelType: "-",
          drive: "-",
          transmission: "-",
          gears: "-",
        },
      ],
    },
    FuelEfficiency: {
      sections: [
        { header: "Fuel Tank Size (L)", field: "fuelTank" },
        { header: "Fuel Consumption (kmpl)", field: "consumption" },
      ],
      details: [
        {
          fuelTank: 52,
          consumption: 10.4,
        },
        {
          fuelTank: 25,
          consumption: 12.4,
        },
        {
          fuelTank: 13,
          consumption: 14.0,
        },
        {
          fuelTank: "-",
          consumption: "-",
        },
      ],
    },
    performance: {
      sections: [
        { header: "O to 100(s)", field: "accelaration" },
        { header: "Top Speed (km/h)", field: "topspeed" },
      ],
      details: [
        {
          accelaration: 4.1,
          topspeed: 250,
        },
        {
          accelaration: 4.1,
          topspeed: 250,
        },
        {
          accelaration: 4.1,
          topspeed: 250,
        },
        {
          accelaration: "-",
          topspeed: "-",
        },
      ],
    },
    Safety: {
      sections: [
        { header: "Front Brake", field: "frontBrake" },
        { header: "Rear Brake", field: "rearBrake" },
        { header: "Front Airbags", field: "frontAirbags" },
        { header: "Rear Airbags", field: "rearAirbags" },
        { header: "Side Airbags", field: "sideAirbags" },
      ],
      details: [
        {
          frontBrake: 4.1,
          rearBrake: 250,
          frontAirbags: "Yes",
          rearAirbags: "No",
          sideAirbags: "Yes",
        },
        {
          frontBrake: 4.1,
          rearBrake: 250,
          frontAirbags: "Yes",
          rearAirbags: "No",
          sideAirbags: "Yes",
        },
        {
          frontBrake: 4.1,
          rearBrake: 250,
          frontAirbags: "Yes",
          rearAirbags: "No",
          sideAirbags: "Yes",
        },
        {
          frontBrake: "-",
          rearBrake: "-",
          frontAirbags: "-",
          rearAirbags: "-",
          sideAirbags: "-",
        },
      ],
    },
    Dimension: {
      sections: [
        { header: "Body Type", field: "bodyType" },
        { header: "No. Of Doors", field: "noOfDoors" },
      ],
      details: [
        {
          bodyType: "SUV",
          noOfDoors: 4,
        },
        {
          bodyType: "Sedan",
          noOfDoors: 4,
        },
        {
          bodyType: "Hatchback",
          noOfDoors: 4,
        },
        {
          bodyType: "-",
          noOfDoors: "-",
        },
      ],
    },
    Interior_Details: {
      sections: [
        { header: "Leather Interior", field: "leatherInterior" },
        { header: "Fabric Interior", field: "fabricInterior" },
      ],

      details: [
        {
          leatherInterior: "Yes",
          fabricInterior: "No",
        },
        {
          leatherInterior: "Yes",
          fabricInterior: "No",
        },
        {
          leatherInterior: "Yes",
          fabricInterior: "No",
        },
        {
          leatherInterior: "-",
          fabricInterior: "-",
        },
      ],
    },
  },
  NewsReviewsSection: [
    {
      title: "All-New Geely Starry Launched In UAE At AED 84,900!",
      category: "Trending",
      date: "June 28, 2018",
      source: "CarPrices.ae",
      description:
        "Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim.",
      image: newsImage1,
      link: "#",
    },
    {
      title: "Lamborghini Huracan STJ Pays Homage To The Huracan Line-Up!",
      category: "Trending",
      date: "Feb 28, 2020",
      source: "CarPrices.ae",
      description:
        "Aenean2 eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim.",
      image: newsImage2,
      link: "#",
    },
    {
      title: "Lamborghini Huracan STJ Pays Homage To The Huracan Line-Up!",
      category: "Trending",
      date: "March 10, 2018",
      source: "CarPrices.ae",
      description:
        "Aenean3 eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim.",
      image: newsImage3,
      link: "#",
    },
    {
      title: "Lamborghini Huracan STJ Pays Homage To The Huracan Line-Up!",
      category: "Trending",
      date: "August 07, 2022",
      source: "CarPrices.ae",
      description:
        "Aenean4 eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim.",
      image: newsImage4,
      link: "#",
    },
    {
      title: "Lamborghini Huracan STJ Pays Homage To The Huracan Line-Up!",
      category: "Trending",
      date: "Jan 10, 2024",
      source: "CarPrices.ae",
      description:
        "Aenean5 eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim.",
      image: newsImage5,
      link: "#",
    },
    {
      title: "Lamborghini Huracan STJ Pays Homage To The Huracan Line-Up!",
      category: "Trending",
      date: "June 28, 2022",
      source: "CarPrices.ae",
      description:
        "Aenean eleifend ante maecenas pulvinar montes lorem et pede dis dolor pretium donec dictum. Vici consequat justo enim.",
      image: newsImage6,
      link: "#",
    },
  ],
  popularTags: [
    "Mercedes-Benz",
    "Electric Cars",
    "G-class",
    "G-Wagon",
    "UAE",
    "Offers",
    "New",
    "Petrol",
    "Diesel",
    "Automatic",
    "Top",
    "Latest",
    "Audi",
    "BMW",
    "Toyota",
  ],
  articles: [
    {
      title: "Ten Pros of Applying Car Paint Protection Film (PPF)",
      image: articleImage1,
    },
    {
      title: "Lancia Returns To Rally With The Ypsilon Rally 4 H...",
      image: articleImage2,
    },
    {
      title: "Ten Pros of Applying Car Paint Protection Film (PPF)",
      image: articleImage1,
    },
    {
      title: "Lancia Returns To Rally With The Ypsilon Rally 4 H...",
      image: articleImage2,
    },
  ],
  NewsDetailsPage: {
    source:"CarPrices.ae team",
    date:"March 31,2024",
    time:"6 min",
    image1: image1,
    image2: image2,
    image3: image3,
    image4: image4,
    image5: image5,
    adSamsungImage: adSamsungImage,
    adSummerImage: adSummerImage,
    adUnihostImage: adUnihostImage,
    adSidebar1: adSidebar1,
    adSidebar2: adSidebar2,
    title: "All-New Geely Starray Launched in UAE at AED 84,900 !",
    source: "carPrices.ae",
    date: "March 31,2024",
    time: "6 min",
    para1:
      "In a bold move towards innovation and luxury, AGMC, the official distributor of Geely vehicles in the UAE, has announced the arrival of the highly anticipated 2024 Geely Starray, launched at AED 84,900. This futuristic SUV is poised to redefine the automotive landscape in the UAE, seamlessly blending luxury, technology, and chic modern design to create a truly unparalleled driving experience.",
    para2:
      "The all-new Geely Starray SUV in the UAE is a testament to the brand's commitment to pushing boundaries and redefining automotive excellence. From its bold front fascia, which draws inspiration from celestial elements, to its eye-catching taillights, every aspect of the Starray's design has been meticulously crafted to captivate and inspire.",
    para3:
      "At the heart of the Geely Starray lies a powerful 2.0T Drive-E four-cylinder engine, delivering a robust output of 218hp and 325Nm of torque. Paired with a hyper-efficient 7DCT Transmission boasting 98% efficiency and lightning-fast 0.2-second shifts, the Starray promises an exhilarating driving experience like no other.",
    para4:
      "The Geely Starray is equipped with the industry's most advanced performance and safety technologies, ensuring both driver and passenger confidence on every journey. Features such as Adaptive Cruise Control, Lane Departure Warning, and Automatic Emergency Braking work seamlessly together to provide a safe and secure driving experience.",
    para5:
      "Step inside the new Starray, and you're greeted by a world of luxury and comfort. Plush interiors, including spacious cabin space and avant-garde brown leather seats, combine with cutting-edge technology to create a truly immersive driving environment. The 13.2-inch infotainment system keeps you connected on the go, while the 8 INFINITY speakers provide an unparalleled audio experience.",
    bodyType: [
      { image: convertible, type: "Convertible" },
      { image: coupe, type: "Coupe" },
      { image: hatchback, type: "hatchback" },
      { image: convertible, type: "Convertible" },
      { image: midsizesuv, type: "Midize SUV" },
      { image: pickup, type: "Pickup" },
      { image: sedan, type: "Sedan" },
      { image: sports, type: "SportsCar" },
      { image: fullsizesuv, type: "Full size SUV" },
      { image: van, type: "Van" },

    ],
  },
};
