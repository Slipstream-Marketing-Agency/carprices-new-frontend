"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/router';
// import data from '../../../../json/data.json'
import Image from 'next/image';
import DummyMap from '../../../../public/assets/img/EV/DummyMap.png'
import FeaturedNewCars from "../../../components/Home1/FeaturedNewCars/index";

import axios from 'axios';

import ChargingStationDIrectionCard from '@/src/components/common/EV/ChargingStationDIrectionCard';
// import PopularNewElectricCars from '../../../components/common/EV/PopularNewElectricCars';
import { useEffect } from 'react';
// import { BackupGateway } from 'aws-sdk';
import MainLayout from '@/src/layout/MainLayout';
import { carDetails, filteredChargingStations } from '@/src/data/data';




export async function getStaticPaths() {
  const paths = filteredChargingStations?.map((item) => ({
    params: { slug: item.emiratenames.toString() }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  // Find the specific charging station data based on the ID from JSON
  const specificChargingStation = filteredChargingStations.filter((item) => item.emiratenames.toString() === slug);

  // Fetch data from the API (replace 'API_ENDPOINT' with your actual API endpoint)
  const resBrands = await axios.get("https://api.carprices.ae/" + "brand/popular");
  const resTopSearched = await axios.get("https://api.carprices.ae/" + "model/top-searched");
  let topSearched = resTopSearched.data;
  // Assuming the API response data contains an array of charging stations
  let brands = resBrands.data;


  return {
    props: {
      specificChargingStation,
      brands,
      topSearched,
      slug
    }
  };
}


const Location = (props) => {

  // const brands = props.brands.brands
  // const topSearched = props.topSearched.models
  let JsonData = props.specificChargingStation
  console.log(JsonData);

  // // filter by brands
  const [filterData, setFilterData] = useState('');
  const updateFilterData = (newData) => {
    setFilterData(newData)
  }



  // // If the data doesn't exist for the given slug, display a default message
  // // if (!JsonData) {
  // //   return <div>Post not found</div>;
  // // }




  return (
    <MainLayout >
      <div className="container mt-5">
        <h2 className='fw-bolder mb-4'>Charging Stations in {props.slug}</h2>
        <p className='paragraph'>206 Charging Stations for Electric Cars in {props.slug}</p>

        <div className='locations mt-2'>
          {/* <Image src={DummyMap} width={'100%'} /> */}
          <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1EjUXwc8d7Vkp6W9s5u0fsb4W7XFI24A&ehbc=2E312F" width="100%" height="480"></iframe>
          <p className='mt-2 paragraph'>To Get an overview Of all the charge points, Please click on the map above.It will take you to our interactive Map</p>
        </div>



        <div className=" mt-5">
          <div className="row d-flex gap-3 justify-content-center">
            {
              JsonData != '' &&
              JsonData?.map((item) => (
                <ChargingStationDIrectionCard location={item.propername} staring={"3"} count={item.numberofconnectors} direction={item.direction_url_proper_name} />
              ))
            }

            <div>
              <h1>{props.specificChargingStation.propername}</h1>
              <p>{props.specificChargingStation.locatedat}</p>
              <p>{props.specificChargingStation.connector}</p>
            </div>
          </div>
        </div>
            
      </div>

    </MainLayout>

  )
}


// export async function getServerSideProps({ req, res, params }) {

//   // Fetch data from external API

//   let resTopSearched = await axios.get(
//     process.env.NEXT_PUBLIC_API_URL + "model/top-searched"
//   );

//   // let jsonDatas=await axios.get(
//   //   "../../../../json/data.json"
//   // );


//   let brands = resBrands.data;
//   let topSearched = resTopSearched.data;

//   return {
//     props: {

//       brands,
//       topSearched,
//       // jsonDatas
//     },
//   };
// }
export default Location