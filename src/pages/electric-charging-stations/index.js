
import React from 'react'
import bannerImage from '../../../public/assets/img/EV/human-hand-is-holding-electric-car-charging-connect-electric-car.png'
import Image from 'next/image'
import Blog from "../../components/Home1/Blog/index";
import axios from 'axios'
import { blogData, carDetails } from '@/src/data/data'
import FeaturedNewCars from "../../components/Home1/FeaturedNewCars/index"; 
import abuDhabiImage from '../../../public/assets/img/EV/stations/AbuDhabi.png'
import ajman from '../../../public/assets/img/EV/stations/Ajman.png'
import dubai from '../../../public/assets/img/EV/stations/Dubai.png'
import fujairah from '../../../public/assets/img/EV/stations/Fujairah.png'
import rasAlKhaimah from '../../../public/assets/img/EV/stations/RasAlKhaimah.png'
import sharjha from '../../../public/assets/img/EV/stations/Sharjah.png'
import ummAlQuawain from '../../../public/assets/img/EV/stations/UmmAlQuawain.png'
import Cards from '../../components/common/EV/Cards'
import MainLayout from '@/src/layout/MainLayout'
import ProductCard from '@/src/components/Home1/ProductCard'
import Faq from '../faq';



// export async function getServerSideProps({ req, res, params }) {

//   // Fetch data from external API
//   let resTopSearched = await axios.get(
//     process.env.NEXT_PUBLIC_API_URL + "model/top-searched"
//   );


//   let topSearched = resTopSearched.data;

//   return {
//     props: {
//       topSearched
//     },
//   };
// }

export default function index(props) {
  // const topSearched = props.topSearched.models
  

  const slides = [
    {
      imageSrc: 'url_to_your_image_1.jpg',
      title: 'Slide 1',
      description: 'Description for slide 1',
    },
    {
      imageSrc: 'url_to_your_image_2.jpg',
      title: 'Slide 2',
      description: 'Description for slide 2',
    },
    
  ];

  return (
    <MainLayout>

      <div className="container">
        {/* <div className="banner mt-5">
          <Image src={bannerImage} width="100%" height="250px">
          </Image>
        </div> */}

        <div className="row mt-4 mb-4">
          {/* <Ad728x90 dataAdSlot="1997130182" /> */}
        </div>

        <div>
          <h1 className="fw-bold mt-2 mb-4">Charging Stations in United Arab Emirates</h1>
          <p className="my-2 paragraph">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unkown printer took a gallery of type and scrambled it to make a type specimen book.
          </p>

          {/*<Ad728x90 />*/}
        </div>






        <div className=" mt-4  text-white">
          <div className="row ">
            <Cards title={'Dubai'} subTitle={'206 Charging Stations'} image={dubai} link={'Dubai'} />
            <Cards title={'Abu Dhabi'} subTitle={'50 Charging Stations'} image={abuDhabiImage} link={'AbuDhabi'} />
            <Cards title={'Sharjha'} subTitle={'45 Charging Stations'} image={sharjha} link={'Sharjah'} />
            <Cards title={'Ajman'} subTitle={'15 Charging Stations'} image={ajman} link={'Ajman'} />
            <Cards title={'Fujairah'} subTitle={'10 Charging Stations'} image={fujairah} link={'Fujairah'} />
            <Cards title={'Ras Al Khaimah'} subTitle={'15 Charging Stations'} image={rasAlKhaimah} link={'RasalKhaimah'} />
            <Cards title={'Umm Al Quawain'} subTitle={'10 Charging Stations'} image={ummAlQuawain} link={'UmmAlQuawain'} />

          </div>

        </div>



        <div className="mt-5" >
                  <FeaturedNewCars
          subTitle={"Popular New Electric Cars"}
          heading={"Popular New Electric Cars"}
          carDetails={carDetails}
        />
        
         
        </div>
        </div>

  

        <div className="container my-3">
          <div className="white_bg_wrapper mt-3">
              <Faq />
            

          </div>
        </div>



      
    </MainLayout>
  )
}