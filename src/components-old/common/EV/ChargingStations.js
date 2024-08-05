import Image from 'next/image'
import React from 'react'

export default function ChargingStations({image,title,description}) {
  return (
    <div className="col-xxl-3 col-xl-3 col-lg-3 col-sm-6 col-6 single_card_wrap mt-5 ">
    <div className="card h-100 position-relative">
       <div className='position-absolute top-0 start-0'>
         <Image className='w-full'  src={image} width='100%' height={200}/>
         <h2  className='text-white'>{title}</h2>
         </div >
      </div>
      </div>
  )
}
