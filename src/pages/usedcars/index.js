import MainLayout from "@/src/layout/MainLayout";
import React, { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FilterListIcon from "@mui/icons-material/FilterList";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LanguageIcon from "@mui/icons-material/Language";
import PlaceIcon from "@mui/icons-material/Place";
import SpeedIcon from "@mui/icons-material/Speed";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import TuneIcon from "@mui/icons-material/Tune";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { Search } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Slider from "react-slick";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  InstagramShareButton,
  InstagramIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const carModels = [
  { make: "Toyota", model: "Camry" },
  { make: "Toyota", model: "Corolla" },
  { make: "Toyota", model: "Rav4" },
  { make: "Honda", model: "Accord" },
  { make: "Honda", model: "Civic" },
  { make: "Honda", model: "CR-V" },
  { make: "Ford", model: "F-150" },
  { make: "Ford", model: "Mustang" },
  { make: "Ford", model: "Explorer" },
  { make: "Chevrolet", model: "Silverado" },
  { make: "Chevrolet", model: "Malibu" },
  { make: "Chevrolet", model: "Equinox" },
  // Add more models as needed
];

const carMakes = [
  { label: "Toyota" },
  { label: "Honda" },
  { label: "Ford" },
  { label: "Chevrolet" },
  { label: "BMW" },
  { label: "Audi" },
  { label: "Mercedes-Benz" },
  { label: "Lexus" },
  { label: "Hyundai" },
  { label: "Kia" },
  { label: "Volkswagen" },
  { label: "Nissan" },
  { label: "Mazda" },
  { label: "Subaru" },
  { label: "Jeep" },
  { label: "Volvo" },
  { label: "Tesla" },
  { label: "Porsche" },
  { label: "Land Rover" },
  { label: "Ferrari" },
];

const carDealers = [
  "ABC Motors",
  "XYZ Auto Group",
  "PQR Cars Inc.",
  "MNO Dealership",
  "DEF Automotive",
  // Add more dealer names as needed
];

export default function index() {
  const [urlCopied, setUrlCopied] = useState(false);
  const [fullURL, setFullURL] = useState("");
  useEffect(() => {
    const currentURL = window.location.href;

    setFullURL(currentURL);
  }, []);

  // React slick slider begins
  const carThumbnails = [
    { url: "/assets/img/carbackgroundImage.jpg" },
    { url: "/assets/img/carbackgroundImage.jpg" },
    { url: "/assets/img/carbackgroundImage.jpg" },
    // Add more thumbnails as needed
  ];

  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        // alert('URL copied to clipboard')
        setUrlCopied(true);
        // You can also show a success message or perform other actions here
      })
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
        // Handle error (e.g., show an error message to the user)
      });
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          marginRight: "40px",
          zIndex: "999", // Add margin-left here
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",

          marginLeft: "40px",
          zIndex: "999", // Add margin-left here
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // React slick slider ends
  const [isMobile, setIsMobile] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);
  const carSeats = [
    "2 Seats",
    "4 Seats",
    "5 Seats",
    "7 Seats",
    "8 Seats",
    "9 Seats",
  ];

  const handleSeatsClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const [selectedCity, setSelectedCity] = useState("All cities");
  const [cities, setCities] = useState([
    "All cities",
    "Dubai",
    "Sharjah",
    "Umm Al Quwain",
    "Al Ain",
    "Fujairah",
  ]);

  const [filterPriceRangeValues, setFilterPriceRange] = useState({
    from: "",
    upto: "",
  });
  const [filterYearValues, setFilterYearValues] = useState({
    from: "1920",
    upto: "2025",
  });
  const [filterKilometersValues, setFilterKilometersValues] = useState({
    from: "0",
    upto: "10000000",
  });

  const [carMakes, setCarMakes] = useState(["Toyota", "Honda", "Ford", "BMW"]); // Sample car makes, you can replace this with your actual data
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event, value) => {
    setSelectedMake(value);
  };

  const handleCityFilterContentClick = (city) => {
    if (city !== selectedCity) {
      const updatedCities = [city, ...cities.filter((c) => c !== city)];
      setCities(updatedCities);
      setSelectedCity(city);
    }
  };

  const [selectedBodyTypes, setSelectedBodyTypes] = useState([]);

  const handleBodyTypeClick = (bodyType) => {
    if (!selectedBodyTypes.includes(bodyType)) {
      setSelectedBodyTypes([...selectedBodyTypes, bodyType]);
    }
  };

  const [selectedMake, setSelectedMake] = useState("");

  // Regional specs
  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const specs = ["Spec 1", "Spec 2", "Spec 3"]; // Example list of regional specifications

  const handleSpecClick = (spec) => {
    if (selectedSpecs.includes(spec)) {
      setSelectedSpecs(selectedSpecs.filter((item) => item !== spec));
    } else {
      setSelectedSpecs([...selectedSpecs, spec]);
    }
  };

  // transmission Type
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const transmissionTypes = ["Automatic", "Manual", "CVT", "Dual-Clutch"];

  const handleTransmissionClick = (transmission) => {
    if (selectedTransmissions.includes(transmission)) {
      setSelectedTransmissions(
        selectedTransmissions.filter(
          (selectedTransmission) => selectedTransmission !== transmission
        )
      );
    } else {
      setSelectedTransmissions([...selectedTransmissions, transmission]);
    }
  };

  // Badges
  const [selectedBadges, setSelectedBadges] = useState([]);
  const badges = [
    "First Owner",
    "In Warranty",
    "Service History",
    "No Accidents",
  ];

  const handleBadgeClick = (badge) => {
    if (selectedBadges.includes(badge)) {
      setSelectedBadges(
        selectedBadges.filter((selectedBadge) => selectedBadge !== badge)
      );
    } else {
      setSelectedBadges([...selectedBadges, badge]);
    }
  };

  const initialBrands = [
    { name: "Mercedes-Benz", count: 5131 },
    { name: "BMW", count: 4200 },
    { name: "Audi", count: 3500 },
    { name: "Toyota", count: 2800 },
    { name: "Honda", count: 2500 },
    { name: "Mercedes-Benz", count: 5131 },
    { name: "BMW", count: 4200 },
    { name: "Audi", count: 3500 },
    { name: "Toyota", count: 2800 },
    { name: "Honda", count: 2500 },
    { name: "Mercedes-Benz", count: 5131 },
    { name: "BMW", count: 4200 },
    { name: "Audi", count: 3500 },
    { name: "Toyota", count: 2800 },
    { name: "Honda", count: 2500 },
  ];
  const [showAllpopularCarBrands, setShowAllpopularCarBrands] = useState(false);
  const [brands, setBrands] = useState(initialBrands);

  const handleViewMoreBrands = () => {
    setShowAllpopularCarBrands(!showAllpopularCarBrands);
  };

  const [showCity, setShowCity] = useState(false);
  const [showMake, setShowMake] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [showKilometers, setShowKilometers] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const specificFilterRef = useRef(null);
  const specificFilterCityRef = useRef(null);
  const specificFilterMakeRef = useRef(null);
  const specificFilterPriceRangeRef = useRef(null);
  const specificFilterYearRef = useRef(null);
  const specificFilterKilometersRef = useRef(null);
  const specificFilterFiltersRef = useRef(null);

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  // Fuel Type
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid"];
  const handleFuelTypeClick = (fuelType) => {
    if (selectedFuelTypes.includes(fuelType)) {
      setSelectedFuelTypes(
        selectedFuelTypes.filter(
          (selectedFuelType) => selectedFuelType !== fuelType
        )
      );
    } else {
      setSelectedFuelTypes([...selectedFuelTypes, fuelType]);
    }
  };

  // const toggleFilterMenu = () => {
  //     setFilterMenuOpen((prevOpen) => !prevOpen);
  //   };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Check if screen width is less than 970px
    };

    checkMobile();

    // Listen for window resize events to update isMobile state
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  //   useEffect(() => {
  //     // Redirect or perform actions based on isMobile state
  //     if (isMobile) {
  //       router.push('/mobile-page'); // Redirect to a mobile-specific page
  //     }
  //   }, [isMobile, router]);

  const [selectedOption, setSelectedOption] = useState("Default");
  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const options = [
    "Newest to Oldest",
    "Oldest to Newest",
    "Price Lowest to Highest",
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openSaveSearchModel, setOpenSaveSearchModel] = useState(false);
  const handleOpenSaveSearchModel = () => setOpenSaveSearchModel(true);
  const handleCloseOpenSaveSearchModel = () => setOpenSaveSearchModel(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        specificFilterCityRef.current &&
        !specificFilterCityRef.current.contains(event.target)
      ) {
        setShowCity(false);
      }
      if (
        specificFilterMakeRef.current &&
        !specificFilterMakeRef.current.contains(event.target)
      ) {
        setShowMake(false);
      }
      if (
        specificFilterPriceRangeRef.current &&
        !specificFilterPriceRangeRef.current.contains(event.target)
      ) {
        setShowPriceRange(false);
      }
      if (
        specificFilterYearRef.current &&
        !specificFilterYearRef.current.contains(event.target)
      ) {
        setShowYear(false);
      }
      if (
        specificFilterKilometersRef.current &&
        !specificFilterKilometersRef.current.contains(event.target)
      ) {
        setShowKilometers(false);
      }
      if (
        specificFilterFiltersRef.current &&
        !specificFilterFiltersRef.current.contains(event.target)
      ) {
        setShowFilters(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleFilterContentClick = (e) => {
    e.stopPropagation(); // Prevent click from bubbling to parent specificFilter
  };

  const handleCity = () => {
    setShowCity(!showCity);
  };
  const handleMake = () => {
    setShowMake(!showMake);
  };
  const handlePriceRange = () => {
    setShowPriceRange(!showPriceRange);
  };
  const handleYear = () => {
    setShowYear(!showYear);
  };
  const handleKilometers = () => {
    setShowKilometers(!showKilometers);
  };
  const handleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleButton1Click = () => {
    alert("button1 click");
  };
  const handleButton2Click = () => {
    alert("button2 click");
  };
  // const handleCity= ()=>{
  //     // alert("city clicked")
  //     if(!showCity &&  (showMake || showPriceRange || showYear || showKilometers || showFilters) ){
  //         setShowMake(false)
  //         setShowPriceRange(false)
  //         setShowYear(false)
  //         setShowKilometers(false)
  //         setShowFilters(false)
  //     }
  //     setShowCity(!showCity)
  // }
  // const handleMake=()=>{
  //     if(!showMake &&  (showCity || showPriceRange || showYear || showKilometers || showFilters) ){
  //         setShowCity(false)
  //         setShowPriceRange(false)
  //         setShowYear(false)
  //         setShowKilometers(false)
  //         setShowFilters(false)
  //     }
  //     setShowMake(!showMake)
  // }
  const handleFilterOutSideClick = () => {
    alert("outside clicked");
    setShowCity(false);
    setShowPriceRange(false);
    setShowYear(false);
    setShowKilometers(false);
    setShowFilters(false);
    setShowMake(false);
  };
  return (
    <MainLayout
      pageMeta={{
        title: "Used Cars - Carprices.ae",
        description: "Used cars description",
        type: "Car Review Website",
      }}
    >
      <div className="container overflowXHidden   ">
        {/* DESKTOP FILTER BEGINS */}

        <div className="filter d-md-flex d-none">
          <div
            ref={specificFilterCityRef}
            className={`specificFilter ${showCity ? "show" : ""}`}
            onClick={handleCity}
          >
            <div className="filterHead">
              <div className="filterHeadTxt">City</div>
              <span className="filterSubHead">{selectedCity}</span>
            </div>
            <div className="dropIcon">
              {showCity ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            <div className="filterContent" onClick={handleFilterContentClick}>
              <div className="cityTags">
                {cities.map((city, index) => (
                  <div key={index} className="cityTag">
                    <span
                      className={`cityTagTxt${
                        city === selectedCity ? " active" : ""
                      }`}
                      onClick={() => handleCityFilterContentClick(city)}
                    >
                      {city}
                    </span>
                  </div>
                ))}
                <hr />
                <Button
                  variant="contained"
                  fullWidth
                  style={{ margin: "10px" }}
                >
                  Apply Filters
                </Button>
              </div>
              {/* Content for city dropdown */}
            </div>
          </div>

          <div
            ref={specificFilterMakeRef}
            className={`specificFilter ${showMake ? "show" : ""}`}
            onClick={handleMake}
          >
            <div className="filterHead">
              <div className="filterHeadTxt">Make</div>
              <input
                type="text"
                style={{ width: "102px" }}
                className="filterSubHead"
                value={selectedMake}
                placeholder="e.g. Toyota"
                onChange={(e) => setSelectedMake(e.target.value)}
              />
            </div>
            <div className="dropIcon">
              {showMake ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            <div className="filterContent" onClick={handleFilterContentClick}>
              {showMake && (
                <Autocomplete
                  options={carMakes.filter((make) =>
                    make.toLowerCase().includes(inputValue.toLowerCase())
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Select make"
                    />
                  )}
                  inputValue={inputValue}
                  onInputChange={handleInputChange}
                />
              )}
            </div>
          </div>
          <div
            ref={specificFilterPriceRangeRef}
            className={`specificFilter ${showPriceRange ? "show" : ""}`}
            onClick={handlePriceRange}
          >
            <div className="filterHead">
              <div className="filterHeadTxt">Price Range</div>
              <span className="filterSubHead">Select</span>
            </div>
            <div className="dropIcon">
              {showPriceRange ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </div>
            <div
              className="filterContent overflowXHidden"
              onClick={handleFilterContentClick}
            >
              <div className="mx-2 mt-3">
                <InputLabel
                  htmlFor="outlined-basic"
                  style={{ fontSize: "0.8rem" }}
                >
                  From
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  autoComplete="off"
                  placeholder="0"
                  value={filterPriceRangeValues.from}
                  onChange={(e) =>
                    setFilterPriceRange({
                      ...filterPriceRangeValues,
                      from: e.target.value,
                    })
                  }
                />
                <InputLabel
                  htmlFor="outlined-basic"
                  style={{ fontSize: "0.8rem" }}
                  className="mt-2"
                >
                  Upto
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Any"
                  value={filterPriceRangeValues.upto}
                  autoComplete="off"
                  onChange={(e) =>
                    setFilterPriceRange({
                      ...filterPriceRangeValues,
                      upto: e.target.value,
                    })
                  }
                />
              </div>
              <Grid
                className="mt-2 mx-1 mb-3"
                container
                spacing={2}
                alignItems="center"
              >
                <Grid item>
                  <Button variant="outlined" size="small">
                    Clear
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Apply Filter
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>

          <div
            ref={specificFilterYearRef}
            className={`specificFilter ${showYear ? "show" : ""}`}
            onClick={handleYear}
          >
            <div className="filterHead">
              <div className="filterHeadTxt">Year</div>
              <span className="filterSubHead">Select</span>
            </div>
            <div className="dropIcon">
              {showYear ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </div>
            <div
              className="filterContent overflowXHidden"
              onClick={handleFilterContentClick}
            >
              <div className="mx-2 mt-3">
                <InputLabel
                  htmlFor="outlined-basic"
                  style={{ fontSize: "0.8rem" }}
                >
                  From
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  autoComplete="off"
                  value={filterYearValues.from}
                  placeholder="0"
                  onChange={(e) =>
                    setFilterYearValues({
                      ...filterYearValues,
                      from: e.target.value,
                    })
                  }
                />
                <InputLabel
                  htmlFor="outlined-basic"
                  style={{ fontSize: "0.8rem" }}
                  className="mt-2"
                >
                  Upto
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Any"
                  value={filterYearValues.upto}
                  onChange={(e) =>
                    setFilterYearValues({
                      ...filterYearValues,
                      upto: e.target.value,
                    })
                  }
                  autoComplete="off"
                />
              </div>
              <Grid
                className="mt-2 mx-1 mb-3"
                container
                spacing={2}
                alignItems="center"
              >
                <Grid item>
                  <Button variant="outlined" size="small">
                    Clear
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Apply Filter
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
          <div
            ref={specificFilterKilometersRef}
            className={`specificFilter ${showKilometers ? "show" : ""}`}
            onClick={handleKilometers}
          >
            <div className="filterHead">
              <div className="filterHeadTxt">Kilometers</div>
              <span className="filterSubHead">Select</span>
            </div>
            <div className="dropIcon">
              {showKilometers ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </div>
            <div
              className="filterContent overflowXHidden   "
              onClick={handleFilterContentClick}
            >
              <div className="mx-2 mt-3">
                <InputLabel
                  htmlFor="outlined-basic"
                  style={{ fontSize: "0.8rem" }}
                >
                  From
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  autoComplete="off"
                  value={filterKilometersValues.from}
                  placeholder="0"
                  onChange={(e) =>
                    setFilterKilometersValues({
                      ...filterKilometersValues,
                      from: e.target.value,
                    })
                  }
                />
                <InputLabel
                  htmlFor="outlined-basic"
                  style={{ fontSize: "0.8rem" }}
                  className="mt-2"
                >
                  Upto
                </InputLabel>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Any"
                  value={filterKilometersValues.upto}
                  onChange={(e) =>
                    setFilterKilometersValues({
                      ...filterKilometersValues,
                      upto: e.target.value,
                    })
                  }
                  autoComplete="off"
                />
              </div>
              <Grid
                className="mt-2 mx-1 mb-3"
                container
                spacing={2}
                alignItems="center"
              >
                <Grid item>
                  <Button variant="outlined" size="small">
                    Clear
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    Apply Filter
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
          <div
            ref={specificFilterFiltersRef}
            className={`specificFilter ${showFilters ? "show" : ""}`}
            onClick={handleFilters}
          >
            <div className="filterHead">
              <div className="filterHeadTxt">Filters</div>
              <span className="filterSubHead">Regional Specs,..</span>
            </div>
            <div className="dropIcon">
              {showFilters ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </div>
            <div className="filterContent" onClick={handleFilterContentClick}>
              {/* <h5 className='mt-3 mx-2'>Regional Specs</h5>
                            <div className="cityTags">
                                {specs.map((spec, index) => (
                                    <div key={index} className="cityTag">
                                        <span className={`cityTagTxt${selectedSpecs.includes(spec) ? ' active' : ''}`} onClick={() => handleSpecClick(spec)} >
                                            {spec}
                                        </span>
                                    </div>
                                ))}

                                <div className='mx-2 mt-2'>
                                    <h5 className='mt-1 mx-2'>Enter Keyword...</h5>
                                    <TextField id="outlined-basic" variant="outlined" autoComplete="off" placeholder="Keywords" />

                                </div> */}

              {/* <hr />
                                <Grid className='mt-1 mx-1 mb-3' container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Button variant="outlined" size="small">Clear</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="primary" >Apply Filter</Button>
                                    </Grid>
                                </Grid>
                            </div> */}

              <h5 className="ms-2 fw-bold mt-4">City</h5>
              <div className="cityTags">
                {cities.map((city, index) => (
                  <div key={index} className="cityTag">
                    <span
                      className={`cityTagTxt${
                        city === selectedCity ? " active" : ""
                      }`}
                      onClick={() => handleCityFilterContentClick(city)}
                    >
                      {city}
                    </span>
                  </div>
                ))}

                <hr />
                {/* <Button variant="contained" fullWidth style={{ margin: '10px' }}>
                                            Apply Filters
                                        </Button> */}
              </div>

              <h5 className="mt-4 mb-2 ms-2 fw-bold">Make</h5>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={carMakes}
                // sx={{ width: 300 }}
                size="small"
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} placeholder="e.g. Toyota" />
                )}
              />

              <h5 className="mt-4 mb-2 ms-2 fw-bold">Model</h5>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={carModels}
                // sx={{ width: 300 }}
                getOptionLabel={(option) => `${option.make} ${option.model}`}
                size="small"
                fullWidth
                renderInput={(params) => <TextField {...params} />}
              />

              <h5 className="mt-4  ms-2 fw-bold">Price Range</h5>
              <div
                className="mx-2 mt-2"
                style={{ display: "flex", gap: "1rem" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <InputLabel
                    htmlFor="from-input"
                    style={{ fontSize: "0.8rem" }}
                  >
                    From
                  </InputLabel>
                  <TextField
                    id="from-input"
                    variant="outlined"
                    autoComplete="off"
                    placeholder="0"
                    size="small"
                    value={filterPriceRangeValues.from}
                    onChange={(e) =>
                      setFilterPriceRange({
                        ...filterPriceRangeValues,
                        from: e.target.value,
                      })
                    }
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <InputLabel
                    htmlFor="upto-input"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Upto
                  </InputLabel>
                  <TextField
                    id="upto-input"
                    variant="outlined"
                    placeholder="Any"
                    size="small"
                    value={filterPriceRangeValues.upto}
                    autoComplete="off"
                    onChange={(e) =>
                      setFilterPriceRange({
                        ...filterPriceRangeValues,
                        upto: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <h5 className="mt-4  ms-2 fw-bold">Year</h5>
              <div
                className="mx-2 mt-2"
                style={{ display: "flex", gap: "1rem" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <InputLabel
                    htmlFor="from-input"
                    style={{ fontSize: "0.8rem" }}
                  >
                    From
                  </InputLabel>
                  <TextField
                    id="from-input"
                    variant="outlined"
                    autoComplete="off"
                    placeholder="0"
                    size="small"
                    value={filterYearValues.from}
                    onChange={(e) =>
                      setFilterPriceRange({
                        ...filterPriceRangeValues,
                        from: e.target.value,
                      })
                    }
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <InputLabel
                    htmlFor="upto-input"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Upto
                  </InputLabel>
                  <TextField
                    id="upto-input"
                    variant="outlined"
                    placeholder="Any"
                    size="small"
                    value={filterYearValues.upto}
                    autoComplete="off"
                    onChange={(e) =>
                      setFilterPriceRange({
                        ...filterPriceRangeValues,
                        upto: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <h5 className="mt-4  ms-2 fw-bold">Kilometers</h5>
              <div
                className="mx-2 mt-2"
                style={{ display: "flex", gap: "1rem" }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <InputLabel
                    htmlFor="from-input"
                    style={{ fontSize: "0.8rem" }}
                  >
                    From
                  </InputLabel>
                  <TextField
                    id="from-input"
                    variant="outlined"
                    autoComplete="off"
                    placeholder="0"
                    size="small"
                    value={filterKilometersValues.from}
                    onChange={(e) =>
                      setFilterPriceRange({
                        ...filterPriceRangeValues,
                        from: e.target.value,
                      })
                    }
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <InputLabel
                    htmlFor="upto-input"
                    style={{ fontSize: "0.8rem" }}
                  >
                    Upto
                  </InputLabel>
                  <TextField
                    id="upto-input"
                    variant="outlined"
                    placeholder="Any"
                    size="small"
                    value={filterKilometersValues.upto}
                    autoComplete="off"
                    onChange={(e) =>
                      setFilterPriceRange({
                        ...filterPriceRangeValues,
                        upto: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <h5 className="ms-2 mt-4 fw-bold mb-2">Keywords</h5>
              <TextField
                fullWidth
                id="from-input"
                variant="outlined"
                autoComplete="off"
                placeholder="Enter keywords..."
                size="small"
              />

              <h5 className="ms-2 mt-4 fw-bold mb-2">Body Type</h5>
              <div className="allBodyTypes">
                <div
                  className={`bodyTypeContainer ${
                    selectedBodyTypes.includes("SUV") ? "selectedBodyType" : ""
                  }`}
                  onClick={() => handleBodyTypeClick("SUV")}
                >
                  <DirectionsCarIcon />
                  <span className="bodyTypeTxt">SUV</span>
                </div>
                <div
                  className={`bodyTypeContainer ${
                    selectedBodyTypes.includes("Coupe")
                      ? "selectedBodyType"
                      : ""
                  }`}
                  onClick={() => handleBodyTypeClick("Coupe")}
                >
                  <DirectionsCarIcon />
                  <span className="bodyTypeTxt">Coupe</span>
                </div>
                <div
                  className={`bodyTypeContainer ${
                    selectedBodyTypes.includes("Sedan")
                      ? "selectedBodyType"
                      : ""
                  }`}
                  onClick={() => handleBodyTypeClick("Sedan")}
                >
                  <DirectionsCarIcon />
                  <span className="bodyTypeTxt">Sedan</span>
                </div>
                <div
                  className={`bodyTypeContainer ${
                    selectedBodyTypes.includes("Crossover")
                      ? "selectedBodyType"
                      : ""
                  }`}
                  onClick={() => handleBodyTypeClick("Crossover")}
                >
                  <DirectionsCarIcon />
                  <span className="bodyTypeTxt">Crossover</span>
                </div>
                <div
                  className={`bodyTypeContainer ${
                    selectedBodyTypes.includes("Hatchback")
                      ? "selectedBodyType"
                      : ""
                  }`}
                  onClick={() => handleBodyTypeClick("Hatchback")}
                >
                  <DirectionsCarIcon />
                  <span className="bodyTypeTxt">Hatchback</span>
                </div>
                <div
                  className={`bodyTypeContainer ${
                    selectedBodyTypes.includes("Sports Car")
                      ? "selectedBodyType"
                      : ""
                  }`}
                  onClick={() => handleBodyTypeClick("Sports Car")}
                >
                  <DirectionsCarIcon />
                  <span className="bodyTypeTxt">Sports Car</span>
                </div>
                <div
                  className={`bodyTypeContainer ${
                    selectedBodyTypes.includes("other")
                      ? "selectedBodyType"
                      : ""
                  }`}
                  onClick={() => handleBodyTypeClick("other")}
                >
                  <MoreHorizIcon />
                  <span className="bodyTypeTxt">other</span>
                </div>
              </div>

              <h5 className="mt-4 mx-2 fw-bold">Seats</h5>
              <div className="cityTags">
                {carSeats.map((seat, index) => (
                  <div key={index} className="cityTag">
                    <span
                      className={`cityTagTxt cursorPointer${
                        selectedSeats.includes(seat) ? " active" : ""
                      }`}
                      onClick={() => handleSeatsClick(seat)}
                    >
                      {seat}
                    </span>
                  </div>
                ))}
              </div>

              <h5 className="mt-4 mx-2 fw-bold">Transmission Type</h5>
              <div className="cityTags">
                {transmissionTypes.map((transmission, index) => (
                  <div key={index} className="cityTag">
                    <span
                      className={`cityTagTxt cursorPointer${
                        selectedTransmissions.includes(transmission)
                          ? " active"
                          : ""
                      }`}
                      onClick={() => handleTransmissionClick(transmission)}
                    >
                      {transmission}
                    </span>
                  </div>
                ))}
              </div>

              <h5 className="mt-4 mx-2 fw-bold">Fuel Type</h5>
              <div className="cityTags">
                {fuelTypes.map((fuelType, index) => (
                  <div key={index} className="cityTag">
                    <span
                      className={`cityTagTxt cursorPointer${
                        selectedFuelTypes.includes(fuelType) ? " active" : ""
                      }`}
                      onClick={() => handleFuelTypeClick(fuelType)}
                    >
                      {fuelType}
                    </span>
                  </div>
                ))}
              </div>

              <h5 className="mt-4 mx-2 fw-bold">Badges</h5>
              <div className="cityTags">
                {badges.map((badge, index) => (
                  <div key={index} className="cityTag">
                    <span
                      className={`cityTagTxt cursorPointer${
                        selectedBadges.includes(badge) ? " active" : ""
                      }`}
                      onClick={() => handleBadgeClick(badge)}
                    >
                      {badge}
                    </span>
                  </div>
                ))}
              </div>

              <h5 className="mt-4 mb-2 ms-2 fw-bold">Car Dealer</h5>
              <Autocomplete
                disablePortal
                className="pb-2"
                id="combo-box-demo"
                options={carDealers}
                getOptionLabel={(option) => option}
                size="small"
                fullWidth
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <div style={{ marginLeft: "3px" }}>
                            {" "}
                            {/* Add space to the left of the search icon */}
                            <Search />
                          </div>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>
        {/* DESKTOP FILTER ENDS */}

        {/* MOBILE FILTER BEGINS*/}
        <div className="mobileFilter d-md-none d-flex">
          <div
            className="specificMobileFilter filterStayLeft d-flex align-items-center justify-content-center"
            onClick={handleFilters}
            data-bs-toggle="modal"
            data-bs-target="#filterModal"
          >
            <span className="mobileFilterTitle">
              <TuneIcon className="me-2" />
              Filter{" "}
            </span>
          </div>
          {/* Filter Model begins */}
          <div
            class="modal fade"
            id="filterModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-scrollable ">
              <div class="modal-content" style={{ height: "100% !important" }}>
                <div class="modal-header">
                  <h4 class="modal-title fw-bold" id="staticBackdropLabel">
                    Filters
                  </h4>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <h5 className="ms-2 fw-bold">City</h5>
                  <div className="cityTags">
                    {cities.map((city, index) => (
                      <div key={index} className="cityTag">
                        <span
                          className={`cityTagTxt${
                            city === selectedCity ? " active" : ""
                          }`}
                          onClick={() => handleCityFilterContentClick(city)}
                        >
                          {city}
                        </span>
                      </div>
                    ))}

                    <hr />
                    {/* <Button variant="contained" fullWidth style={{ margin: '10px' }}>
                                            Apply Filters
                                        </Button> */}
                  </div>

                  <h5 className="mt-4 mb-2 ms-2 fw-bold">Make</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={carMakes}
                    // sx={{ width: 300 }}
                    size="small"
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} placeholder="e.g. Toyota" />
                    )}
                  />

                  <h5 className="mt-4 mb-2 ms-2 fw-bold">Model</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={carModels}
                    // sx={{ width: 300 }}
                    getOptionLabel={(option) =>
                      `${option.make} ${option.model}`
                    }
                    size="small"
                    fullWidth
                    renderInput={(params) => <TextField {...params} />}
                  />

                  <h5 className="mt-4  ms-2 fw-bold">Price Range</h5>
                  <div
                    className="mx-2 mt-2"
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="from-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        From
                      </InputLabel>
                      <TextField
                        id="from-input"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="0"
                        size="small"
                        value={filterPriceRangeValues.from}
                        onChange={(e) =>
                          setFilterPriceRange({
                            ...filterPriceRangeValues,
                            from: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="upto-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Upto
                      </InputLabel>
                      <TextField
                        id="upto-input"
                        variant="outlined"
                        placeholder="Any"
                        size="small"
                        value={filterPriceRangeValues.upto}
                        autoComplete="off"
                        onChange={(e) =>
                          setFilterPriceRange({
                            ...filterPriceRangeValues,
                            upto: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <h5 className="mt-4  ms-2 fw-bold">Year</h5>
                  <div
                    className="mx-2 mt-2"
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="from-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        From
                      </InputLabel>
                      <TextField
                        id="from-input"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="0"
                        size="small"
                        value={filterYearValues.from}
                        onChange={(e) =>
                          setFilterPriceRange({
                            ...filterPriceRangeValues,
                            from: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="upto-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Upto
                      </InputLabel>
                      <TextField
                        id="upto-input"
                        variant="outlined"
                        placeholder="Any"
                        size="small"
                        value={filterYearValues.upto}
                        autoComplete="off"
                        onChange={(e) =>
                          setFilterPriceRange({
                            ...filterPriceRangeValues,
                            upto: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <h5 className="mt-4  ms-2 fw-bold">Kilometers</h5>
                  <div
                    className="mx-2 mt-2"
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="from-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        From
                      </InputLabel>
                      <TextField
                        id="from-input"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="0"
                        size="small"
                        value={filterKilometersValues.from}
                        onChange={(e) =>
                          setFilterPriceRange({
                            ...filterPriceRangeValues,
                            from: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="upto-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Upto
                      </InputLabel>
                      <TextField
                        id="upto-input"
                        variant="outlined"
                        placeholder="Any"
                        size="small"
                        value={filterKilometersValues.upto}
                        autoComplete="off"
                        onChange={(e) =>
                          setFilterPriceRange({
                            ...filterPriceRangeValues,
                            upto: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <h5 className="ms-2 mt-4 fw-bold mb-2">Keywords</h5>
                  <TextField
                    fullWidth
                    id="from-input"
                    variant="outlined"
                    autoComplete="off"
                    placeholder="Enter keywords..."
                    size="small"
                  />

                  <h5 className="ms-2 mt-4 fw-bold mb-2">Body Type</h5>
                  <div className="allBodyTypes">
                    <div
                      className={`bodyTypeContainer ${
                        selectedBodyTypes.includes("SUV")
                          ? "selectedBodyType"
                          : ""
                      }`}
                      onClick={() => handleBodyTypeClick("SUV")}
                    >
                      <DirectionsCarIcon />
                      <span className="bodyTypeTxt">SUV</span>
                    </div>
                    <div
                      className={`bodyTypeContainer ${
                        selectedBodyTypes.includes("Coupe")
                          ? "selectedBodyType"
                          : ""
                      }`}
                      onClick={() => handleBodyTypeClick("Coupe")}
                    >
                      <DirectionsCarIcon />
                      <span className="bodyTypeTxt">Coupe</span>
                    </div>
                    <div
                      className={`bodyTypeContainer ${
                        selectedBodyTypes.includes("Sedan")
                          ? "selectedBodyType"
                          : ""
                      }`}
                      onClick={() => handleBodyTypeClick("Sedan")}
                    >
                      <DirectionsCarIcon />
                      <span className="bodyTypeTxt">Sedan</span>
                    </div>
                    <div
                      className={`bodyTypeContainer ${
                        selectedBodyTypes.includes("Crossover")
                          ? "selectedBodyType"
                          : ""
                      }`}
                      onClick={() => handleBodyTypeClick("Crossover")}
                    >
                      <DirectionsCarIcon />
                      <span className="bodyTypeTxt">Crossover</span>
                    </div>
                    <div
                      className={`bodyTypeContainer ${
                        selectedBodyTypes.includes("Hatchback")
                          ? "selectedBodyType"
                          : ""
                      }`}
                      onClick={() => handleBodyTypeClick("Hatchback")}
                    >
                      <DirectionsCarIcon />
                      <span className="bodyTypeTxt">Hatchback</span>
                    </div>
                    <div
                      className={`bodyTypeContainer ${
                        selectedBodyTypes.includes("Sports Car")
                          ? "selectedBodyType"
                          : ""
                      }`}
                      onClick={() => handleBodyTypeClick("Sports Car")}
                    >
                      <DirectionsCarIcon />
                      <span className="bodyTypeTxt">Sports Car</span>
                    </div>
                    <div
                      className={`bodyTypeContainer ${
                        selectedBodyTypes.includes("other")
                          ? "selectedBodyType"
                          : ""
                      }`}
                      onClick={() => handleBodyTypeClick("other")}
                    >
                      <MoreHorizIcon />
                      <span className="bodyTypeTxt">other</span>
                    </div>
                  </div>

                  <h5 className="mt-4 mx-2 fw-bold">Seats</h5>
                  <div className="cityTags">
                    {carSeats.map((seat, index) => (
                      <div key={index} className="cityTag">
                        <span
                          className={`cityTagTxt cursorPointer${
                            selectedSeats.includes(seat) ? " active" : ""
                          }`}
                          onClick={() => handleSeatsClick(seat)}
                        >
                          {seat}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h5 className="mt-4 mx-2 fw-bold">Transmission Type</h5>
                  <div className="cityTags">
                    {transmissionTypes.map((transmission, index) => (
                      <div key={index} className="cityTag">
                        <span
                          className={`cityTagTxt cursorPointer${
                            selectedTransmissions.includes(transmission)
                              ? " active"
                              : ""
                          }`}
                          onClick={() => handleTransmissionClick(transmission)}
                        >
                          {transmission}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h5 className="mt-4 mx-2 fw-bold">Fuel Type</h5>
                  <div className="cityTags">
                    {fuelTypes.map((fuelType, index) => (
                      <div key={index} className="cityTag">
                        <span
                          className={`cityTagTxt cursorPointer${
                            selectedFuelTypes.includes(fuelType)
                              ? " active"
                              : ""
                          }`}
                          onClick={() => handleFuelTypeClick(fuelType)}
                        >
                          {fuelType}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h5 className="mt-4 mx-2 fw-bold">Badges</h5>
                  <div className="cityTags">
                    {badges.map((badge, index) => (
                      <div key={index} className="cityTag">
                        <span
                          className={`cityTagTxt cursorPointer${
                            selectedBadges.includes(badge) ? " active" : ""
                          }`}
                          onClick={() => handleBadgeClick(badge)}
                        >
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  <h5 className="mt-4 mb-2 ms-2 fw-bold">Car Delear</h5>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={carDealers}
                    getOptionLabel={(option) => option}
                    size="small"
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Search"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <div style={{ marginLeft: "3px" }}>
                                {" "}
                                {/* Add space to the left of the search icon */}
                                <Search />
                              </div>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
                <div class="modal-footer d-flex justify-content-end">
                  <Grid
                    className="mt-2 mx-1 mb-3 d-flex justify-content-end"
                    container
                    spacing={2}
                    alignItems="center"
                  >
                    <Grid item>
                      <Button variant="outlined" size="small">
                        Clear
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" fullWidth>
                        Apply Filter
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
          {/* Filter Model ends */}

          <div
            className={`specificFilter specificMobileFilter d-flex align-items-center justify-content-center `}
            onClick={handleCity}
            data-bs-toggle="modal"
            data-bs-target="#cityFilter"
          >
            <span
              className={`mobileFilterTitle ${
                selectedCity ? "filterSelected" : ""
              }`}
            >
              {selectedCity}{" "}
              {showCity ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
            </span>
          </div>
          {/* city modal begins */}

          <div
            class="modal fade"
            id="cityFilter"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog"
              style={{
                bottom: "0",
                left: "0",
                right: "0",
                position: "absolute",
              }}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h4 className="modal-title fw-bold" id="exampleModalLabel">
                    City
                  </h4>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setShowCity(false);
                    }}
                  ></button>
                </div>
                <div class="modal-body">
                  <div className="cityTags">
                    {cities.map((city, index) => (
                      <div key={index} className="cityTag">
                        <span
                          className={`cityTagTxt${
                            city === selectedCity ? " active" : ""
                          }`}
                          onClick={() => handleCityFilterContentClick(city)}
                        >
                          {city}
                        </span>
                      </div>
                    ))}
                    <hr />
                    {/* <Button variant="contained" fullWidth style={{ margin: '10px' }}>
                                    Apply Filters
                                </Button> */}
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="modal-footer d-flex justify-content-end">
                    <Grid
                      className="mt-2 mx-1 mb-3 d-flex justify-content-end"
                      container
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item>
                        <Button variant="outlined" size="small">
                          Clear
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" fullWidth>
                          Apply Filter
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* city modal ends */}

          <div
            className="specificMobileFilter d-flex align-items-center justify-content-center"
            onClick={handleMake}
            data-bs-toggle="modal"
            data-bs-target="#makeFilter"
          >
            <span
              className={`mobileFilterTitle ${
                selectedMake ? "filterSelected" : ""
              }`}
            >
              Make{" "}
              {showMake ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
            </span>
          </div>
          {/* Make modal begins */}

          <div
            class="modal fade"
            id="makeFilter"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog"
              style={{
                bottom: "0",
                left: "0",
                right: "0",
                position: "absolute",
              }}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h4 className="modal-title fw-bold" id="exampleModalLabel">
                    Make
                  </h4>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setShowMake(false);
                    }}
                  ></button>
                </div>
                <div class="modal-body">
                  {showMake && (
                    <Autocomplete
                      options={carMakes.filter((make) =>
                        make.toLowerCase().includes(selectedMake.toLowerCase())
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Select make"
                        />
                      )}
                      inputValue={selectedMake}
                      onInputChange={handleInputChange}
                    />
                  )}
                </div>
                <div class="modal-footer">
                  <div class="modal-footer d-flex justify-content-end">
                    <Grid
                      className="mt-2 mx-1 mb-3 d-flex justify-content-end"
                      container
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item>
                        <Button variant="outlined" size="small">
                          Clear
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" fullWidth>
                          Apply Filter
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Make modal ends */}

          <div
            className="specificMobileFilter d-flex align-items-center justify-content-center"
            onClick={handlePriceRange}
            data-bs-toggle="modal"
            data-bs-target="#priceRange"
          >
            <span
              className={`mobileFilterTitle ${
                filterPriceRangeValues.from && filterPriceRangeValues.upto
                  ? "filterSelected"
                  : ""
              }`}
            >
              <>Price Range</>{" "}
              {showPriceRange ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}{" "}
            </span>
          </div>

          {/* Price Range modal begins */}

          <div
            class="modal fade"
            id="priceRange"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog"
              style={{
                bottom: "0",
                left: "0",
                right: "0",
                position: "absolute",
              }}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h4 className="modal-title fw-bold" id="exampleModalLabel">
                    Price Range
                  </h4>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setShowPriceRange(false);
                    }}
                  ></button>
                </div>
                <div class="modal-body">
                  <div
                    className="mx-2 mt-2"
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="from-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        From
                      </InputLabel>
                      <TextField
                        id="from-input"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="0"
                        size="small"
                        value={filterPriceRangeValues.from}
                        onChange={(e) =>
                          setFilterPriceRange({
                            ...filterPriceRangeValues,
                            from: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="upto-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Upto
                      </InputLabel>
                      <TextField
                        id="upto-input"
                        variant="outlined"
                        placeholder="Any"
                        size="small"
                        value={filterPriceRangeValues.upto}
                        autoComplete="off"
                        onChange={(e) =>
                          setFilterPriceRange({
                            ...filterPriceRangeValues,
                            upto: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="modal-footer d-flex justify-content-end">
                    <Grid
                      className="mt-2 mx-1 mb-3 d-flex justify-content-end"
                      container
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item>
                        <Button variant="outlined" size="small">
                          Clear
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" fullWidth>
                          Apply Filter
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Price Range modal ends */}

          <div
            className="specificMobileFilter d-flex align-items-center justify-content-center"
            onClick={handleYear}
            data-bs-toggle="modal"
            data-bs-target="#yearFilter"
          >
            <span
              className={`mobileFilterTitle ${
                filterYearValues.from && filterYearValues.upto
                  ? "filterSelected"
                  : ""
              }`}
            >
              Year{" "}
              {showYear ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{" "}
            </span>
          </div>

          {/* Year modal begins */}

          <div
            class="modal fade"
            id="yearFilter"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog"
              style={{
                bottom: "0",
                left: "0",
                right: "0",
                position: "absolute",
              }}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h4 className="modal-title fw-bold" id="exampleModalLabel">
                    Year
                  </h4>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setShowYear(false);
                    }}
                  ></button>
                </div>
                <div class="modal-body">
                  <div
                    className="mx-2 mt-2"
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="from-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        From
                      </InputLabel>
                      <TextField
                        id="from-input"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="0"
                        size="small"
                        value={filterYearValues.from}
                        onChange={(e) =>
                          setFilterYearValues({
                            ...filterYearValues,
                            from: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="upto-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Upto
                      </InputLabel>
                      <TextField
                        id="upto-input"
                        variant="outlined"
                        placeholder="Any"
                        size="small"
                        value={filterYearValues.upto}
                        autoComplete="off"
                        onChange={(e) =>
                          setFilterYearValues({
                            ...filterYearValues,
                            upto: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="modal-footer d-flex justify-content-end">
                    <Grid
                      className="mt-2 mx-1 mb-3 d-flex justify-content-end"
                      container
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item>
                        <Button variant="outlined" size="small">
                          Clear
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" fullWidth>
                          Apply Filter
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Year modal ends */}

          <div
            className="specificMobileFilter d-flex align-items-center justify-content-center"
            onClick={handleKilometers}
            data-bs-toggle="modal"
            data-bs-target="#kilometerModal"
          >
            <span
              className={`mobileFilterTitle ${
                filterKilometersValues.from && filterKilometersValues.upto
                  ? "filterSelected"
                  : ""
              }`}
            >
              Kilometers{" "}
              {showKilometers ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}{" "}
            </span>
          </div>

          {/* kilometer modal begins */}

          <div
            class="modal fade"
            id="kilometerModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog"
              style={{
                bottom: "0",
                left: "0",
                right: "0",
                position: "absolute",
              }}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h4 className="modal-title fw-bold" id="exampleModalLabel">
                    kilometers
                  </h4>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      setShowKilometers(false);
                    }}
                  ></button>
                </div>
                <div class="modal-body">
                  <div
                    className="mx-2 mt-2"
                    style={{ display: "flex", gap: "1rem" }}
                  >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="from-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        From
                      </InputLabel>
                      <TextField
                        id="from-input"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="0"
                        size="small"
                        value={filterKilometersValues.from}
                        onChange={(e) =>
                          setFilterKilometersValues({
                            ...filterYearValues,
                            from: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <InputLabel
                        htmlFor="upto-input"
                        style={{ fontSize: "0.8rem" }}
                      >
                        Upto
                      </InputLabel>
                      <TextField
                        id="upto-input"
                        variant="outlined"
                        placeholder="Any"
                        size="small"
                        value={filterKilometersValues.upto}
                        autoComplete="off"
                        onChange={(e) =>
                          setFilterKilometersValues({
                            ...filterYearValues,
                            upto: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="modal-footer d-flex justify-content-end">
                    <Grid
                      className="mt-2 mx-1 mb-3 d-flex justify-content-end"
                      container
                      spacing={2}
                      alignItems="center"
                    >
                      <Grid item>
                        <Button variant="outlined" size="small">
                          Clear
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" fullWidth>
                          Apply Filter
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Year modal ends */}

          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">
                    Understood
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MOBILE FILTER ENDS */}

        <div className="d-flex justify-content-between mt-3">
          <div>
            <h3>Buy & sell cars online in All Cities (UAE), UAE</h3>
            <span>36,066 Ads</span>
          </div>
          {!isMobile && (
            <div>
              <Button
                className="sortBtn"
                startIcon={<FilterListIcon />}
                onClick={handleClick}
                aria-controls="filter-menu"
                aria-haspopup="true"
              >
                Sort : <span className="selectedSortTxt">{selectedOption}</span>
              </Button>
              <Menu
                id="filter-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                widthFull
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => handleMenuItemClick(option)}
                    selected={option === selectedOption}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>

              <Button
                className="sortBtn ms-3"
                startIcon={<TurnedInNotIcon />}
                aria-controls="filter-menu"
                aria-haspopup="true"
                onClick={handleOpenSaveSearchModel}
              >
                Save Search
              </Button>

              <Modal
                open={openSaveSearchModel}
                onClose={handleCloseOpenSaveSearchModel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography>
                </Box>
              </Modal>
            </div>
          )}
        </div>

        <div className="brandTags mt-3">
          {showAllpopularCarBrands
            ? brands.map((brand, index) => (
                <div key={index} className="brandTagContainer">
                  <span className="brandTag">
                    {brand.name}{" "}
                    <span className="brandTagCount">({brand.count})</span>
                  </span>
                </div>
              ))
            : brands.slice(0, 5).map((brand, index) => (
                <div key={index} className="ViewMoreContainer">
                  <span className="brandTag">
                    {brand.name}{" "}
                    <span className="brandTagCount">({brand.count})</span>
                  </span>
                </div>
              ))}

          <div className="viewMoreContainer">
            <span className="tagViewMoreTxt" onClick={handleViewMoreBrands}>
              {" "}
              {showAllpopularCarBrands ? "View Less" : "View More"}
            </span>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-9 ">
            <div className="row">
              <div className="col-md-4">
                {/* slider begins */}
                <div>
                  <Slider {...settings}>
                    {carThumbnails.map((url, index) => (
                      <div key={index}>
                        <div className="slide-container">
                          <img src={url.url} alt="thumb" />
                          <div className="button-container">
                            <div className="share-button-container">
                              <IconButton
                                aria-label="share"
                                className="share-button"
                                data-bs-toggle="modal"
                                data-bs-target="#shareBtn"
                              >
                                <ShareIcon />
                              </IconButton>
                            </div>
                            <div className="like-button-container">
                              <IconButton
                                aria-label="like"
                                className="like-button"
                                onClick={() => {
                                  alert("Login required");
                                }}
                              >
                                <FavoriteIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                {/* slider ends */}
              </div>

              {/* share btn modal begins */}
              <div
                class="modal fade"
                id="shareBtn"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div
                    class="modal-content"
                    style={{ height: "290px !important" }}
                  >
                    <div class="modal-header">
                      <h4
                        className="modal-title fw-bold"
                        id="exampleModalLabel"
                      >
                        Sharing this listing
                      </h4>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          setUrlCopied(false);
                        }}
                      ></button>
                    </div>
                    <div class="modal-body">
                      <ul className="social-link d-flex justify-content-between  gap-2  ps-2 ">
                        <div className="d-flex flex-column align-items-center justify-content-between gap-2">
                          <FacebookShareButton url={fullURL}>
                            <FacebookIcon size={42} round />
                          </FacebookShareButton>
                          <h5>Facebook</h5>
                        </div>
                        <div className="d-flex flex-column align-items-center gap-2">
                          <WhatsappShareButton url={fullURL}>
                            <WhatsappIcon size={42} round />
                          </WhatsappShareButton>
                          <h5>WhatsApp</h5>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                          <LinkedinShareButton url={fullURL}>
                            <LinkedinIcon size={42} round />
                          </LinkedinShareButton>
                          <h5>linkedIn</h5>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                          <TwitterShareButton
                            url={fullURL}
                            title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
                          >
                            <TwitterIcon size={42} round />
                          </TwitterShareButton>
                          <h5>Twitter</h5>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                          <TelegramShareButton
                            url={fullURL}
                            title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
                          >
                            <TelegramIcon size={42} round />
                          </TelegramShareButton>
                          <h5>Telegram</h5>
                        </div>
                      </ul>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                      <Grid
                        className="mt-2 mx-1 mb-3 d-flex justify-content-end"
                        container
                        spacing={2}
                        alignItems="center"
                      >
                        <Grid item xs={9}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            disabled
                            value={fullURL}
                            size="small"
                          />
                        </Grid>

                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={copyUrlToClipboard}
                          >
                            {urlCopied ? "Copied" : "Copy"}
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
              {/* share btn modal begins */}

              {!isMobile ? (
                <div className="col-md-8">
                  <div className="d-flex flex-column justify-content-around">
                    <h3 className="priceTxt mt-2 mt-sm-0">AED 185,000</h3>
                    <h5 className="carModelTxt">
                      Mercedes benz{" "}
                      <span className="carClass"> &nbsp; s class</span>
                    </h5>
                    <h5 className="carDescription mt-2">
                      2015 Mercedes Benz S500L, Full Mercedes Service History,
                      Full Options
                    </h5>
                    <div className="mt-2">
                      <div className="row">
                        <div className="col-md-2 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <CalendarTodayIcon className="descriptionIcon" />{" "}
                            2015
                          </span>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <SpeedIcon className="descriptionIcon" /> 68,126 km
                          </span>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <DirectionsCarIcon className="descriptionIcon" />{" "}
                            Left Hand
                          </span>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <LanguageIcon className="descriptionIcon" /> GCC
                            Specs
                          </span>
                        </div>

                        <div className="col-md-2">
                          {" "}
                          <Link href="#">
                            {" "}
                            <img
                              src="/assets/img/bmwbrandIcon.png"
                              className="carBrandIcon"
                              alt="brand Icon"
                              width={40}
                              height={40}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <span className="d-flex align-items-center mt-2">
                      <PlaceIcon className="descriptionIcon" /> Sharjah
                    </span>
                  </div>
                </div>
              ) : (
                <div className="col-md-8">
                  <div className="d-flex flex-column justify-content-around">
                    <h3 className="priceTxt mt-2 mt-sm-0">AED 185,000</h3>
                    <h5 className="carModelTxt">
                      Mercedes-benz <span className="carClass">s-class</span>
                    </h5>
                    <h5 className="carDescription mt-2">
                      2015 Mercedes Benz S500L, Full Mercedes Service History,
                      Full Options
                    </h5>
                    <div className="mt-2">
                      <div className="row">
                        {/* Calendar and Speed icons */}
                        <div className="col-3 col-md-2 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <CalendarTodayIcon className="descriptionIcon" />{" "}
                            2015
                          </span>
                        </div>
                        <div className="col-4 col-md-3 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <SpeedIcon className="descriptionIcon" /> 68,126 km
                          </span>
                        </div>

                        {/* Image */}
                        <div className="col-5 col-md-6 d-flex align-items-center justify-content-md-end">
                          <Link href="#">
                            <img
                              src="/assets/img/bmwbrandIcon.png"
                              className="carBrandIcon"
                              alt="brand Icon"
                              width={40}
                              height={40}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Place icon */}
                    <span className="d-flex align-items-center mt-2">
                      <PlaceIcon className="descriptionIcon" /> Sharjah
                    </span>
                  </div>
                </div>
              )}
            </div>
            <hr className="mt-5 mb-4" />
            <div className="row">
              <div className="col-md-4">
                {/* slider begins */}
                <div>
                  <Slider {...settings}>
                    {carThumbnails.map((url, index) => (
                      <div key={index}>
                        <div className="slide-container">
                          <img src={url.url} alt="thumb" />
                          <div className="button-container">
                            <div className="share-button-container">
                              <IconButton
                                aria-label="share"
                                className="share-button"
                                data-bs-toggle="modal"
                                data-bs-target="#shareBtn"
                              >
                                <ShareIcon />
                              </IconButton>
                            </div>
                            <div className="like-button-container">
                              <IconButton
                                aria-label="like"
                                className="like-button"
                                onClick={() => {
                                  alert("Login required");
                                }}
                              >
                                <FavoriteIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                {/* slider ends */}
              </div>

              {/* share btn modal begins */}
              <div
                class="modal fade"
                id="shareBtn"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div
                    class="modal-content"
                    style={{ height: "290px !important" }}
                  >
                    <div class="modal-header">
                      <h4
                        className="modal-title fw-bold"
                        id="exampleModalLabel"
                      >
                        Sharing this listing
                      </h4>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          setUrlCopied(false);
                        }}
                      ></button>
                    </div>
                    <div class="modal-body">
                      <ul className="social-link d-flex justify-content-between  gap-2  ps-2 ">
                        <div className="d-flex flex-column align-items-center justify-content-between gap-2">
                          <FacebookShareButton url={fullURL}>
                            <FacebookIcon size={42} round />
                          </FacebookShareButton>
                          <h5>Facebook</h5>
                        </div>
                        <div className="d-flex flex-column align-items-center gap-2">
                          <WhatsappShareButton url={fullURL}>
                            <WhatsappIcon size={42} round />
                          </WhatsappShareButton>
                          <h5>WhatsApp</h5>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                          <LinkedinShareButton url={fullURL}>
                            <LinkedinIcon size={42} round />
                          </LinkedinShareButton>
                          <h5>linkedIn</h5>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                          <TwitterShareButton
                            url={fullURL}
                            title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
                          >
                            <TwitterIcon size={42} round />
                          </TwitterShareButton>
                          <h5>Twitter</h5>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                          <TelegramShareButton
                            url={fullURL}
                            title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
                          >
                            <TelegramIcon size={42} round />
                          </TelegramShareButton>
                          <h5>Telegram</h5>
                        </div>
                      </ul>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                      <Grid
                        className="mt-2 mx-1 mb-3 d-flex justify-content-end"
                        container
                        spacing={2}
                        alignItems="center"
                      >
                        <Grid item xs={9}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            disabled
                            value={fullURL}
                            size="small"
                          />
                        </Grid>

                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={copyUrlToClipboard}
                          >
                            {urlCopied ? "Copied" : "Copy"}
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
              {/* share btn modal begins */}

              {!isMobile ? (
                <div className="col-md-8">
                  <div className="d-flex flex-column justify-content-around">
                    <h3 className="priceTxt mt-2 mt-sm-0">AED 185,000</h3>
                    <h5 className="carModelTxt">
                      Mercedes benz{" "}
                      <span className="carClass"> &nbsp; s class</span>
                    </h5>
                    <h5 className="carDescription mt-2">
                      2015 Mercedes Benz S500L, Full Mercedes Service History,
                      Full Options
                    </h5>
                    <div className="mt-2">
                      <div className="row">
                        <div className="col-md-2 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <CalendarTodayIcon className="descriptionIcon" />{" "}
                            2015
                          </span>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <SpeedIcon className="descriptionIcon" /> 68,126 km
                          </span>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <DirectionsCarIcon className="descriptionIcon" />{" "}
                            Left Hand
                          </span>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <LanguageIcon className="descriptionIcon" /> GCC
                            Specs
                          </span>
                        </div>

                        <div className="col-md-2">
                          {" "}
                          <Link href="#">
                            {" "}
                            <img
                              src="/assets/img/bmwbrandIcon.png"
                              className="carBrandIcon"
                              alt="brand Icon"
                              width={40}
                              height={40}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <span className="d-flex align-items-center mt-2">
                      <PlaceIcon className="descriptionIcon" /> Sharjah
                    </span>
                  </div>
                </div>
              ) : (
                <div className="col-md-8">
                  <div className="d-flex flex-column justify-content-around">
                    <h3 className="priceTxt mt-2 mt-sm-0">AED 185,000</h3>
                    <h5 className="carModelTxt">
                      Mercedes-benz <span className="carClass">s-class</span>
                    </h5>
                    <h5 className="carDescription mt-2">
                      2015 Mercedes Benz S500L, Full Mercedes Service History,
                      Full Options
                    </h5>
                    <div className="mt-2">
                      <div className="row">
                        {/* Calendar and Speed icons */}
                        <div className="col-3 col-md-2 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <CalendarTodayIcon className="descriptionIcon" />{" "}
                            2015
                          </span>
                        </div>
                        <div className="col-4 col-md-3 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <SpeedIcon className="descriptionIcon" /> 68,126 km
                          </span>
                        </div>

                        {/* Image */}
                        <div className="col-5 col-md-6 d-flex align-items-center justify-content-md-end">
                          <Link href="#">
                            <img
                              src="/assets/img/bmwbrandIcon.png"
                              className="carBrandIcon"
                              alt="brand Icon"
                              width={40}
                              height={40}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Place icon */}
                    <span className="d-flex align-items-center mt-2">
                      <PlaceIcon className="descriptionIcon" /> Sharjah
                    </span>
                  </div>
                </div>
              )}
            </div>
            <hr className="mt-5 mb-4" />
            <div className="row">
              <div className="col-md-4">
                {/* slider begins */}
                <div>
                  <Slider {...settings}>
                    {carThumbnails.map((url, index) => (
                      <div key={index}>
                        <div className="slide-container">
                          <img src={url.url} alt="thumb" />
                          <div className="button-container">
                            <div className="share-button-container">
                              <IconButton
                                aria-label="share"
                                className="share-button"
                                data-bs-toggle="modal"
                                data-bs-target="#shareBtn"
                              >
                                <ShareIcon />
                              </IconButton>
                            </div>
                            <div className="like-button-container">
                              <IconButton
                                aria-label="like"
                                className="like-button"
                                onClick={() => {
                                  alert("Login required");
                                }}
                              >
                                <FavoriteIcon />
                              </IconButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
                {/* slider ends */}
              </div>

              {/* share btn modal begins */}
              <div
                class="modal fade"
                id="shareBtn"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div
                    class="modal-content"
                    style={{ height: "290px !important" }}
                  >
                    <div class="modal-header">
                      <h4
                        className="modal-title fw-bold"
                        id="exampleModalLabel"
                      >
                        Sharing this listing
                      </h4>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          setUrlCopied(false);
                        }}
                      ></button>
                    </div>
                    <div class="modal-body">
                      <ul className="social-link d-flex justify-content-between  gap-2  ps-2 ">
                        <div className="d-flex flex-column align-items-center justify-content-between gap-2">
                          <FacebookShareButton url={fullURL}>
                            <FacebookIcon size={42} round />
                          </FacebookShareButton>
                          <h5>Facebook</h5>
                        </div>
                        <div className="d-flex flex-column align-items-center gap-2">
                          <WhatsappShareButton url={fullURL}>
                            <WhatsappIcon size={42} round />
                          </WhatsappShareButton>
                          <h5>WhatsApp</h5>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                          <LinkedinShareButton url={fullURL}>
                            <LinkedinIcon size={42} round />
                          </LinkedinShareButton>
                          <h5>linkedIn</h5>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                          <TwitterShareButton
                            url={fullURL}
                            title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
                          >
                            <TwitterIcon size={42} round />
                          </TwitterShareButton>
                          <h5>Twitter</h5>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                          <TelegramShareButton
                            url={fullURL}
                            title={`CarPrices.ae : UAE Fastest Growing New Car Buyers' Guide`}
                          >
                            <TelegramIcon size={42} round />
                          </TelegramShareButton>
                          <h5>Telegram</h5>
                        </div>
                      </ul>
                    </div>
                    <div className="modal-footer d-flex justify-content-end">
                      <Grid
                        className="mt-2 mx-1 mb-3 d-flex justify-content-end"
                        container
                        spacing={2}
                        alignItems="center"
                      >
                        <Grid item xs={9}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            disabled
                            value={fullURL}
                            size="small"
                          />
                        </Grid>

                        <Grid item xs={3}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={copyUrlToClipboard}
                          >
                            {urlCopied ? "Copied" : "Copy"}
                          </Button>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
              {/* share btn modal begins */}

              {!isMobile ? (
                <div className="col-md-8">
                  <div className="d-flex flex-column justify-content-around">
                    <h3 className="priceTxt mt-2 mt-sm-0">AED 185,000</h3>
                    <h5 className="carModelTxt">
                      Mercedes benz{" "}
                      <span className="carClass"> &nbsp; s class</span>
                    </h5>
                    <h5 className="carDescription mt-2">
                      2015 Mercedes Benz S500L, Full Mercedes Service History,
                      Full Options
                    </h5>
                    <div className="mt-2">
                      <div className="row">
                        <div className="col-md-2 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <CalendarTodayIcon className="descriptionIcon" />{" "}
                            2015
                          </span>
                        </div>
                        <div className="col-md-2 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <SpeedIcon className="descriptionIcon" /> 68,126 km
                          </span>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <DirectionsCarIcon className="descriptionIcon" />{" "}
                            Left Hand
                          </span>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <LanguageIcon className="descriptionIcon" /> GCC
                            Specs
                          </span>
                        </div>

                        <div className="col-md-2">
                          {" "}
                          <Link href="#">
                            {" "}
                            <img
                              src="/assets/img/bmwbrandIcon.png"
                              className="carBrandIcon"
                              alt="brand Icon"
                              width={40}
                              height={40}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <span className="d-flex align-items-center mt-2">
                      <PlaceIcon className="descriptionIcon" /> Sharjah
                    </span>
                  </div>
                </div>
              ) : (
                <div className="col-md-8">
                  <div className="d-flex flex-column justify-content-around">
                    <h3 className="priceTxt mt-2 mt-sm-0">AED 185,000</h3>
                    <h5 className="carModelTxt">
                      Mercedes-benz <span className="carClass">s-class</span>
                    </h5>
                    <h5 className="carDescription mt-2">
                      2015 Mercedes Benz S500L, Full Mercedes Service History,
                      Full Options
                    </h5>
                    <div className="mt-2">
                      <div className="row">
                        {/* Calendar and Speed icons */}
                        <div className="col-3 col-md-2 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <CalendarTodayIcon className="descriptionIcon" />{" "}
                            2015
                          </span>
                        </div>
                        <div className="col-4 col-md-3 d-flex align-items-center">
                          <span className="d-flex align-items-center gap-2 carItemFontSize">
                            <SpeedIcon className="descriptionIcon" /> 68,126 km
                          </span>
                        </div>

                        {/* Image */}
                        <div className="col-5 col-md-6 d-flex align-items-center justify-content-md-end">
                          <Link href="#">
                            <img
                              src="/assets/img/bmwbrandIcon.png"
                              className="carBrandIcon"
                              alt="brand Icon"
                              width={40}
                              height={40}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Place icon */}
                    <span className="d-flex align-items-center mt-2">
                      <PlaceIcon className="descriptionIcon" /> Sharjah
                    </span>
                  </div>
                </div>
              )}
            </div>
            <hr className="mt-5 mb-4" />
          </div>
          <div className="col-md-3">
            <img src="path/to/your/ad/image.jpg" alt="Ad here" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
