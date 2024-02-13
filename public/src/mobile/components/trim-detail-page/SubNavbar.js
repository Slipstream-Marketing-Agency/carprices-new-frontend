import React from 'react'

export default function SubNavbar() {
  return (
    <div className="modelOverview">
    <nav className="modelNav">
      <div className="container">
        <div className="modelNavInner">
          <ul>
            <li className="">
              <a title=" Price" href="">
                Price
              </a>
            </li>
            <li className="">
              <span
                title="Compare"
                className=""
                data-dropdown-text="more"
              >
                Compare
                <i />
              </span>
            </li>
            <li className="">
              <a title=" Images" href="">
                Images
              </a>
            </li>
            <li className="">
              <a title=" Specs" href="">
                Specs
              </a>
            </li>
            <li className="">
              <a title=" User Reviews" href="">
                User Reviews
              </a>
            </li>
            <li className="">
              <a title=" Variants" href="">
                Variants
              </a>
            </li>
            <li className="">
              <span title="More" className="" data-dropdown-text="more">
                More
                <i />
              </span>
              <div className="ModelDropDown visually-hidden">
                <div className="ArrowTop hidden-sm hidden-xs hidden-md" />
                <ul className="">
                  <li>
                    <a title=" Mileage" href="/maruti/swift/mileage">
                      <span className="icon-cd-milage" /> Mileage
                    </a>
                  </li>
                  <li>
                    <a title=" Colours" href="/maruti/swift/colors">
                      <span className="icon-colors" /> Colours
                    </a>
                  </li>
                  <li>
                    <a title="Toyota  News" href="/maruti/swift/news">
                      <span className="icon-news" /> News
                    </a>
                  </li>
                  <li>
                    <a
                      title=" Spare Parts"
                      href="/maruti/swift/spare-parts-price"
                    >
                      <span className="icon-spare-parts" /> Spare Parts
                    </a>
                  </li>
                  <li>
                    <a
                      title=" Service Cost"
                      href="/maruti/swift/service-cost"
                    >
                      <span className="icon-service-cost" /> Service Cost
                    </a>
                  </li>
                  <li>
                    <a href="#expertReview" title=" Expert Reviews">
                      <span className="icon-expert-review" /> Expert
                      Reviews
                    </a>
                  </li>
                  <li>
                    <a
                      title=" Frequently Asked Questions"
                      href="/car-faqs/maruti-swift.html"
                    >
                      <span className="icon-faq" /> FAQs
                    </a>
                  </li>
                  <li>
                    <span className="loannavtab">
                      <span className="icon-dealers" /> Dealers
                    </span>
                  </li>
                  <li>
                    <a title=" Brochure" href="/maruti/swift/brochures">
                      <span className="icon-brochure" /> Brochure
                    </a>
                  </li>
                  <li>
                    <a
                      title="Toyota  Emi"
                      href="/maruti-swift/car-loan-emi-calculator.htm"
                    >
                      <span className="icon-emi-calculator" /> Emi
                    </a>
                  </li>
                  <li>
                    <div className="buttonHolder">
                      <span className="loannavtab">
                        <span className="icon-loans" /> Loan
                      </span>
                    </div>
                  </li>
                  <li>
                    <a
                      href="https://www.insurancedekho.com/car-insurance/maruti/swift?utm_source=cardekho&utm_medium=Inlink&utm_campaign=modelpages"
                      title="Toyota  Insurance"
                      target="_blank"
                      rel="noopener"
                    >
                      <span className="icon-insurancelogo" />
                      Insurance
                    </a>
                  </li>
                  <li>
                    <a
                      href="/used-maruti-swift+cars+in+chennai"
                      title="Second Hand Toyota "
                    >
                      <span className="icon-new-car" /> Second Hand Toyota
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  )
}
