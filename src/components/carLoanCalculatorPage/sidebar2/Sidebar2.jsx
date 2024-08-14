"use client"
import Image from "next/image";
import {carLoanPage} from"../../../mocks/labels";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Sidebar2() {
    return (
        <div className="bg-gray-800 p-6 py-6 my-6 rounded-xl text-white text-left">
            <Image src="/sideBar-icon.svg" width={250} height={250} className="" alt= "img-sidebarIcon"/>
            <div className="text-2xl font-medium ">{carLoanPage.carWorthSection.heading}</div>
            <div className="text-base font-thin my-2 text-gray-300 leading-normal">{carLoanPage.carWorthSection.para}</div>
            <button className="text-base font-semibold my-2">{carLoanPage.carWorthSection.button}</button>
            <ArrowForwardIcon className="ml-1"/>
        </div>
    )
}

export default Sidebar2