import React from "react";
import Ad970x250 from "../ads/Ad970x250";
import Link from "next/link";

function Footer() {
  return (
    <>
      <Ad970x250 dataAdSlot="6082880703" />
      <div className="footer_Start mt-3 mb-3">
        <footer className="footer footerSiteLogos">
          <div className="container footer_Trafic">
            <div className="row">
              <Link href={"/search-cars"} className="col-sm-4 text-center pointer">
                <>
                  <img
                    className="cpx_icon-footer"
                    src="/assets/images/icons/search-cars.png"
                    alt=""
                  />
                  <div className="trafic_col">
                    <div className="title">Car Finder</div>
                  </div>
                </>
              </Link>
              <Link href={"/compare-cars"} className="col-sm-4 text-center">
                <>
                  <img
                    className="cpx_icon-footer"
                    src="/assets/images/icons/compare-cars.png"
                    alt=""
                  />
                  <div className="trafic_col">
                    <div className="title">Compare</div>
                  </div>
                </>
              </Link>
              <Link href={"/loan-calculator"} className="col-sm-4 text-center">
                <>
                  <img
                    className="cpx_icon-footer"
                    src="/assets/images/icons/emi-calculator.png"
                    alt=""
                  />
                  <div className="trafic_col">
                    <div className="title">Loan Calculator</div>
                  </div>
                </>
              </Link>
              {/* <div className="col-sm-3">
                <img
                  className="cpx_icon-footer"
                  src="assets/images/icons/insurance-calculator.png"
                  alt=""
                />
                <div className="trafic_col">
                  <div className="title">Insurance Calculator</div>
                </div>
              </div> */}
            </div>
          </div>
          <nav className="footer_Nav mb-5">
            <div className="container">
              {/* <div className="row">
                <div className="col-sm-3">
                  <div className="title">TOP 10S</div>
                  <ul>
                    <li>
                      <a href="" title="">
                        The 10 best family SUVs
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        The 10 best electric cars
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        The 10 best hatchbacks
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        The 10 best hybrid SUVs
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        The 10 best superminis
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-3">
                  <div className="title">LATEST CAR REVIEWS</div>
                  <ul>
                    <li>
                      <a href="" title="">
                        Seat Ibiza
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Peugeot 508
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Jaguar I-Pace
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Skoda Kodiaq
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Volvo XC40
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-3">
                  <div className="title">TOP BRANDS</div>
                  <ul>
                    <li>
                      <a href="" title="">
                        Peugeot
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Seat
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Volkswagen
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Ford
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Vauxhall
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-3">
                  <div className="title">QUICK SEARCH</div>
                  <ul>
                    <li>
                      <a href="" title="">
                        Top 10s
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Latest news
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Latest videos
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Used cars for sale
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
              {/* Section two */}
              <div className="row mt-3">
                <div className="col-sm-3">
                  <div className="title">WE RECOMMEND</div>
                  <ul>
                    {/* <li>
                      <a href="" title="">
                        Car for auction
                      </a>
                    </li> */}
                    <li>
                      <Link href="/search-cars" title="">
                        Search Your Car
                      </Link>
                    </li>
                    <li>
                      <Link href="/compare-cars" title="">
                        Compare Cars
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-3">
                  <div className="title">LEGAL BITS</div>
                  <ul>
                    <li>
                      <Link href="/terms-and-conditions" title="">
                        Terms and conditions
                      </Link>
                    </li>
                    {/* <li>
                      <a href="" title="">
                        Cookie policy
                      </a>
                    </li> */}
                    <li>
                      <Link href="/privacy" title="">
                        Privacy policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/code-of-conduct" title="">
                        Code of Conduct
                      </Link>
                    </li>
                    {/* <li>
                      <a href="" title="">
                        Cookie Settings
                      </a>
                    </li> */}
                  </ul>
                </div>
                <div className="col-sm-3">
                  <div className="title">ABOUT CARPRICES</div>
                  <ul>
                    <li>
                      <Link href="/about" title="">
                        Why you can trust Carprices
                      </Link>
                    </li>
                    {/* <li>
                      <a href="" title="">
                        Our journey
                      </a>
                    </li> */}
                    <li>
                      <Link href="/contact-us" title="">
                        Get in touch
                      </Link>
                    </li>
                    {/* <li>
                      <a href="" title="">
                        RSS feed
                      </a>
                    </li> */}
                    {/* <li>
                      <a href="" title="">
                        Sitemap
                      </a>
                    </li> */}
                  </ul>
                </div>
                <div className="col-sm-3">
                  {/* <div className="title">EXPERIENCE CARPRICES APP</div>
                  <ul className="row appholder">
                    <li className="col-sm-6">
                      <a href="" title="" target="_blank" rel="noopener">
                        <img
                          alt=""
                          src="assets/images/store-images/appstore.png"
                        />
                      </a>
                    </li>
                    <li className="col-sm-6 hidegpbtn">
                      <a href="" title="" target="_blank" rel="noopener">
                        <img
                          alt=""
                          src="assets/images/store-images/googleplay.png"
                        />
                      </a>
                    </li>
                  </ul> */}
                  <div className="title">AFFILIATED WITH</div>
                  <div className="footer-images">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="w-100">
                          <img
                            title=""
                            alt=""
                            src="/assets/images/logo/car-service-logo.webp"
                            className="w-50"
                          />
                        </div>
                      </div>
                      <div className="col-xs-12">
                        <div className="w-100">
                          <img
                            title=""
                            alt=""
                            src="/assets/images/logo/SLIPSTREAM-LOGO.webp"
                            className="w-50"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="footerbottom">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <p className="copyRight">© 2023 Slipstream Marketing L.L.C</p>
                </div>
                <div className="col-8">
                  <div className="SocialIcons">
                    <div className="title"><b>Connect:</b></div>
                    <ul>
                      <li>
                        <Link
                          href="https://www.facebook.com/carprices.uae/"
                          target="_blank"
                          title="Facebook"
                          rel="noopener"
                        >
                          <i className="bi bi-facebook" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://youtube.com/@carpricesuae1217"
                          target="_blank"
                          title="Youtube"
                          rel="noopener"
                        >
                          <i className="bi bi-youtube" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://www.instagram.com/carprices.ae/"
                          target="_blank"
                          title="Instagram"
                          rel="noopener"
                        >
                          <i className="bi bi-instagram" />
                        </Link>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
