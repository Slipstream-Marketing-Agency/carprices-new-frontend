import TopSearchedCars from '@/components/homePage/TopSearchedCars'
import Layout from '@/components/layout/Layout'
import React from 'react'
import bannerImage from '../../../public/assets/images/EV/human-hand-is-holding-electric-car-charging-connect-electric-car.png'
import Image from 'next/image'
import axios from 'axios'
import PopularNewElectricCars from '../../components/common/EV/PopularNewElectricCars'

import Carousel from '../../components/carousel/Carousel'

import abuDhabiImage from '../../../public/assets/images/EV/stations/AbuDhabi.png'
import ajman from '../../../public/assets/images/EV/stations/Ajman.png'
import dubai from '../../../public/assets/images/EV/stations/Dubai.png'
import fujairah from '../../../public/assets/images/EV/stations/Fujairah.png'
import rasAlKhaimah from '../../../public/assets/images/EV/stations/RasAlKhaimah.png'
import sharjha from '../../../public/assets/images/EV/stations/Sharjah.png'
import ummAlQuawain from '../../../public/assets/images/EV/stations/UmmAlQuawain.png'

import Cards from '../../components/common/EV/Cards'
import AccordionFaq from '@/components/common/AccordionFaq'
export async function getServerSideProps({ req, res, params }) {

  // Fetch data from external API
  let resTopSearched = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "model/top-searched"
  );


  let topSearched = resTopSearched.data;

  return {
    props: {
      topSearched
    },
  };
}

export default function index(props) {
  const topSearched = props.topSearched.models


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
    // Add more slides as needed
  ];

  return (
    <Layout pageMeta={{
      title: "Charging Stations in United Arab Emirates",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unkown printer took a gallery of type and scrambled it to make a type specimen book.",
      type: "Car Review Website",
    }}>

      <div className="container">
        <div className="banner">
          <Image src={bannerImage} width="100%" height="250px">
          </Image>
        </div>

        <div className="row mt-2 mb-4">
          {/* <Ad728x90 dataAdSlot="1997130182" /> */}
        </div>

        <div>
          <h1 className="fw-bold mt-2">Charging Stations in United Arab Emirates</h1>
          <p className="my-2">
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
            <Cards title={'Ras Al Khaimah'} subTitle={'15 Charging Stations'} image={rasAlKhaimah} link={'rasAlKhaimah'} />
            <Cards title={'Umm Al Quawain'} subTitle={'10 Charging Stations'} image={ummAlQuawain} link={'UmmAlQuawain'} />

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

        <div className='mt-5'>
          <h2 className='fw-bolder'>Trending Electric Cars News</h2>
          <Carousel slides={slides} />
        </div>


        {/* <div className='mt-5'>
          <h4 className='my-3 '>Frequently Asked Questions on Electric Charging Stations
          </h4>
          <Dropdown title="What is the price range of the 2023 Hyundai kona Electric?" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!
"/>
          <Dropdown title="How does the 2023 Hyundai Kona Electric perform in terms of acceleration and top speed?" description="    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!" />
          <Dropdown title="What is the range of the 2023 Hyundai Kona Electric?" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!
"/>
          <Dropdown title="What type of motor the 2023 Hyundai Kona Electric has?" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!
"/>
          <Dropdown title="What safety features are included in the 2023 Hyundai Kona Electric?" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!
"/>
          <Dropdown title="How many passengers can the 2023 Hyundai Kona Electric accommodate?" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!
"/>
          <Dropdown title="What are the exterior dimension of the 2023 Hyundai Kona Electric" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!
"/>
          <Dropdown title="What is the cargo space available in the 2023 Hyundai Kona Electric?" description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!
"/>
        </div> */}


        <div id="faq" className="my-3">
          <div className="white_bg_wrapper mt-3">

            <h4 className='fw-bold my-3 '>Frequently Asked Questions on Electric Charging Stations
            </h4>

            <div >
              <AccordionFaq
                question="What is the price range of the 2023 Hyundai kona Electric?"
                answer="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!"
                condition="condition"
              />
              <AccordionFaq
                question="How does the 2023 Hyundai Kona Electric perform in terms of acceleration and top speed?"
                answer="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!"
                condition="condition"
              />
              <AccordionFaq
                question="What is the range of the 2023 Hyundai Kona Electric?"
                answer="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!"
                condition="condition"
              />
              <AccordionFaq
                question="What type of motor the 2023 Hyundai Kona Electric has?"
                answer="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!"
                condition="condition"
              />
              <AccordionFaq
                question="What safety features are included in the 2023 Hyundai Kona Electric?"
                answer="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!"
                condition="condition"
              />
              <AccordionFaq
                question="How many passengers can the 2023 Hyundai Kona Electric accommodate?"
                answer="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!"
                condition="condition"
              />
              <AccordionFaq
                question="What are the exterior dimension of the 2023 Hyundai Kona Electric"
                answer="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!"
                condition="condition"
              />
              <AccordionFaq
                question="What is the cargo space available in the 2023 Hyundai Kona Electric?"
                answer="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur praesentium possimus placeat quisquam animi sapiente officia voluptas voluptatem. Asperiores voluptas quia inventore ut architecto eius reiciendis velit vel eligendi rerum!"
                condition="condition"
              />
            </div>

          </div>
        </div>



      </div>
    </Layout>
  )
}