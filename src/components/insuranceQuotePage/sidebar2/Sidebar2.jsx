import Image from "next/image";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Sidebar2() {
    return (
        <div className="bg-blue-600 p-6  rounded-xl text-white text-left">
            <Image src="/sidebar-icon2.png" width={200} height={200} className="sm:mb-6" />
            <div className=" w-3/4 text-2xl font-medium ">Calculate Your Car Loan EMI</div>
            <div className=" text-base font-thin my-3 text-gray-300 leading-normal">Input your loan amount, interest rate, and loan term to get instant results.</div>
            <button className=" text-base font-semibold my-2 ">Calculate now</button>
            <ArrowForwardIcon className="ml-1" />
        </div>
    )
}

export default Sidebar2