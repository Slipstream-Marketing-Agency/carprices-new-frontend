import Image from 'next/image'
import React from 'react'
import locationIcon from '../../../../public/assets/images/icons/Location.png'
import starIcon from '../../../../public/assets/images/EV/icons/rating.png'
import processIcon from '../../../../public/assets/images/EV/icons/image_processing.png'
import Link from 'next/link'
export default function ChargingStationDIrectionCard({location,staring,count,direction}) {
    return (
       
            <div className="col-md-5  border rounded p-4">
                {/* <Link href={`/electric-charging-stations/`} className=""> */}
                    <div className=" ">
                        <h3>Electric Vehicle Charging Station</h3>
                        <div className='position-relative w-4 d-flex gap-2 align-items-center'>
                            <Image src={locationIcon} className='iconSize' alt="location-icon" />
                            <span className='pl-6'>{location}</span>
                        </div>
                        <Image src={starIcon} className='starIcon' alt="star-icon" />
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='mt-4'><Image src={processIcon} className='processIcon' alt="iconSize" /> <span>{count}</span></div>
                            <div>
                            <Link href={direction}>
                                <button type="button" class="btn btn-primary">Direction</button>
                            </Link>
                            </div>
                        </div>

                    </div>
                {/* </Link> */}
     
        </div>
    )
}
