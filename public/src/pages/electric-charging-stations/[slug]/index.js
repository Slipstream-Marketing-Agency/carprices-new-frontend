"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/router';
// import data from '../../../../json/data.json'
import data from '../../../../json/newJson.json'
import Layout from '@/components/layout/Layout';
import Image from 'next/image';
import DummyMap from '../../../../public/assets/images/EV/DummyMap.png'
import PopularBrands from '@/components/homePage/PopularBrands';
import axios from 'axios';
import FilterByBrands from '@/components/common/EV/FilterByBrands';
import ChargingStationDIrectionCard from '@/components/common/EV/ChargingStationDIrectionCard';
import PopularNewElectricCars from '../../../components/common/EV/PopularNewElectricCars';
import { useEffect } from 'react';
import { BackupGateway } from 'aws-sdk';




export async function getStaticPaths() {
  const paths = data.map((item) => ({
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
  const specificChargingStation = data.filter((item) => item.emiratenames.toString() === slug);

  // Fetch data from the API (replace 'API_ENDPOINT' with your actual API endpoint)
  const resBrands = await axios.get(process.env.NEXT_PUBLIC_API_URL + "brand/popular");
  const resTopSearched = await axios.get( process.env.NEXT_PUBLIC_API_URL + "model/top-searched");
  let topSearched = resTopSearched.data;
  // Assuming the API response data contains an array of charging stations
  let brands = resBrands.data;


  return {
    props: {
      specificChargingStation,
      brands,
      topSearched
    }
  };
}


const Location = ( props  ) => {

  const brands = props.brands.brands
  const topSearched = props.topSearched.models
  let JsonData=props.specificChargingStation


  // filter by brands
  const [filterData, setFilterData] = useState('');
  const updateFilterData= (newData)=>{
    setFilterData(newData)
  }
 
  const [filteredChargingStations, setFilteredChargingStations] = useState([]);

  useEffect(() => {
    if (filterData !== '') {
      const filteredStations = JsonData.filter((item) => {
        return item.Instructions === filterData; 
      });
      setFilteredChargingStations(filteredStations);
    } else {
      // Reset filtered data when filterData is empty
      // setFilteredChargingStations([]);
    }
  }, [filterData, JsonData]);

  // If the data doesn't exist for the given slug, display a default message
  // if (!JsonData) {
  //   return <div>Post not found</div>;
  // }

  


  return (
    <Layout pageMeta={{
      title: `ev stations in detail`,
      description: `details of ev station`,
      type: "Car Review Website",
    }}>

      <div className="container mt-5">
        <h2 className='fw-bolder'>Charging Stations in Dubai</h2>
        <p>206 Charging Stations for Electric Cars in Dubai</p>

        <div className='locations mt-2'>
          <Image src={DummyMap} width={'100%'} />
          <p className='mt-2'>To Get an overview Of all the charge points, Please click on the map above.It will take you to our interactive Map</p>
        </div>

        <div className='mt-5'>
          <h2 className='fw-bolder'>Filter By Brands</h2>
          <p className='mb-3'>206 Charging Stations for Electric Cars in Dubai</p>
          <FilterByBrands brands={brands} filter={true} updateFilterData={updateFilterData} />
        </div>

        <div className=" mt-5">
          <div className="row d-flex gap-3 justify-content-center">

            {     
            filteredChargingStations!='' &&
                      <div className='container text-center'>
                        <h3 >Filter based on brand : <span className='fw-bolder'>{filterData.toUpperCase()}</span>
                        </h3>
                      </div >
            }
           
          {
          filteredChargingStations!='' ?
          filteredChargingStations?.map((item)=>(
            <ChargingStationDIrectionCard location={item.propername} staring={"3"} count={item.numberofconnectors} direction={item.direction_url_proper_name}/>
          )) :
            JsonData?.map((item)=>(
              <ChargingStationDIrectionCard location={item.propername} staring={"3"} count={item.numberofconnectors} direction={item.direction_url_proper_name}/>
            )) 
                     
         } 
         
          

          <div>
      <h1>{props.specificChargingStation.propername}</h1>
      
      <p>{props.specificChargingStation.locatedat}</p>
      <p>{props.specificChargingStation.connector}</p>

    </div>
            </div>
        </div>


        <div className="mt-5">
          <h2 className='fw-bolder'>Popular New Electric Cars</h2>
          <div className="row">
            <div className="col-12">
              <PopularNewElectricCars topSearched={topSearched} />
            </div>
          </div>
        </div>



      </div>


    </Layout>

  )
}


// export async function getServerSideProps({ req, res, params }) {

//   // Fetch data from external API


//   let resBrands = await axios.get(
//     process.env.NEXT_PUBLIC_API_URL + "brand/popular"
//   );
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