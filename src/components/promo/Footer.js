import Link from "next/link";
import { BsInstagram } from "react-icons/bs";
import { FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-200 mt-24 pt-16">
      <div className="container mx-auto lg:px-40 sm:px-14 px-5">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column */}
          <div className="lg:w-5/12">
            <img className="w-40" src="/AVATR-Logo-–-Full.svg" alt="logo" />
            <p className="mt-5 text-gray-700 text-base leading-relaxed">
              AVATR showroom in the UAE, an authorized AVATR car dealer, where innovation drives the future of smart mobility. We showcase the latest smart electric vehicles designed with cutting-edge technology, high performance, and unmatched style. Our showroom provides an immersive experience, allowing you to explore our range of electric vehicles and discover the future of electric mobility. As your trusted car dealer in UAE, our dedicated team is here to guide you through your journey, offering expert advice and personalized services to help you find the perfect electric vehicle that suits your lifestyle. Visit our showroom today and experience the next generation of driving.
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Models */}
            <div>
              <ul>
                <li className="text-xl font-semibold text-gray-800">Models</li>
                <li className="mt-4 text-gray-600"><Link href="https://avatruae.com/models/avatr-11/">AVATR 11</Link></li>
                <li className="mt-2 text-gray-600"><Link href="https://avatruae.com/models/avatr-12/">AVATR 12</Link></li>
              </ul>
            </div>

            {/* Links */}
            <div>
              <ul>
                <li className="text-xl font-semibold text-gray-800">Links</li>
                <li className="mt-4 text-gray-600"><Link href="https://avatruae.com/experience-avatr/">Experience AVATR</Link></li>
                <li className="mt-2 text-gray-600"><Link href="https://avatruae.com/discover-avatr/">Discover</Link></li>
                <li className="mt-2 text-gray-600"><Link href="https://avatruae.com/ownership/">Ownership</Link></li>
                <li className="mt-2 text-gray-600"><Link href="https://avatruae.com/news/">News</Link></li>
                <li className="mt-2 text-gray-600"><Link href="https://avatruae.com/contact/">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <ul>
                <li className="text-xl font-semibold text-gray-800">Contact us</li>
                <li className="mt-4 text-gray-600"><a href="mailto:info@smartmobilityint.com">info@smartmobilityint.com</a></li>
                <li className="mt-2 text-gray-600"><a href="tel:80028287">800 AVATR (28287)</a></li>
                <li className="mt-4">
                  <div className="flex gap-4 text-black text-xl">
                    <a href="https://instagram.com/avatr_uae"><BsInstagram /></a>
                    <a href="https://www.youtube.com/@AVATRCARSUAE"><FaYoutube /></a>
                    <a href="https://instagram.com/avatr_uae"><FaTiktok /></a>
                    <a href="https://www.linkedin.com/company/avatruae/"><FaLinkedin /></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between text-center text-gray-600 text-sm space-y-4 md:space-y-0">
          <p>© 2025 Smart Mobility International Commercial Agencies LLC</p>

          <div className="flex items-center gap-2">
            <a href="#" className="hover:underline">Legal</a>
            <span>|</span>
            <a href="#" className="hover:underline">Policy</a>
            <span>|</span>
            <a href="#" className="hover:underline">Disclaimer</a>
          </div>

          <p>Created by Black</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
