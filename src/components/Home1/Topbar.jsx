import React, { useState } from "react";
import Link from "next/link";
import useTranslate from "@/src/utils/useTranslate";
import { useRouter } from "next/router";
import LiveSearch from "../Dropdown";
import { gql } from "@apollo/client";
import { createApolloClient } from "@/src/lib/apolloClient";
import { LanguageSwitcher } from "../LanguageSwitcher";
function Topbar() {
  const router = useRouter();
  const { locales, asPath, locale: currentLocale } = useRouter();
  const t = useTranslate();
  let isRtl = router.locale === 'ar';



  const [isLoading, setIsLoading] = useState(false);
    const [brandOptions,setBrandOptions]=useState([])
    const [tagOptions,setTagOptions]=useState([])
    const client = createApolloClient();


    const fetchBrands = async (brandInput) => {
        try {
            setIsLoading(true);
          const { data } = await client.query({
            query: gql`
            query {
              carBrands(filters:{name:{containsi:"${brandInput}"}}) {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
            `,
          });
    
    
          const brands = data.carBrands.data;
          setBrandOptions(brands)
        //   console.log(brands);
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
        finally {
            setIsLoading(false); // Set loading to false when the request is complete
        }

      }
      const fetchTags = async (tagInput) => {
        try {
          const { data } = await client.query({
            query: gql`
            query{
              articleCategories(filters:{name:{containsi:"${tagInput}"}}){
                data{
                  attributes{
                    name
                    slug
                    articles{
                      data{
                        attributes{
                          title
                          slug
                          
                        }
                      }
                    }
                  }
                }
              }
            }
            `,
          });
          const tags = data.articleCategories.data
          setTagOptions(tags)
    
        //   console.log("tags", tags);
        } catch (error) {
          console.error('Error fetching brands:', error);
        } finally {
            setIsLoading(false); // Set loading to false when the request is complete
        }
  
      }
    
      const fetchAllBrands = async () => {
    
        try {
          const { data } = await client.query({
            query: gql`
            query SearchBrands {
              carBrands(pagination: { limit:-1 },sort:"name:asc") {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
            `,
          });
    
          setBrandOptions(data.carBrands.data);
          // console.log("all brands",data);
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
        setSearchLoading(false)
      }
    


    const [results, setResults] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleChange = (e) => {
      fetchBrands(e.target.value)
      fetchTags(e.target.value)
      const { target } = e;
      if (!target.value.trim()) return setResults([]);

    // const filteredValue = profiles.filter((profile) =>
    //   profile.name.toLowerCase().startsWith(target.value.toLowerCase())
    // );
    const filteredValue = brandOptions.map((brand) =>
       brand.attributes.name
    );
    console.log("filtered brands",filteredValue);
    const tagsfilteredValue = tagOptions.map((tag) =>
       tag.attributes.name
    );
    console.log("filtered tags",tagsfilteredValue);
    console.log(filteredValue);
    setResults([...tagsfilteredValue,...filteredValue]);
    console.log("results",results);
  };
  return (
    <div className={`top-bar ${isRtl && 'flex-row-reverse'}`}>
      <div className="company-logo">
        <Link legacyBehavior href="/">
          <a>
            <img
              src="/assets/img/car-prices-logo.png"
              alt="logo"
              width={200}
              height={120}
            />
          </a>
        </Link>
      </div>
      <div className="search-area">
        <form>
          {/* <div className="form-inner">
            <input type="text" placeholder={t.searchForBrandandCars} />
            <button type="submit">
              <i className="bi bi-search" />
            </button>
          </div> */}

          {/* test input begins */}
          <div style={{zIndex:'99969696969669696969'}}>

        <LiveSearch
        results={results}
        value={selectedProfile ? selectedProfile.name : ""}
        renderItem={(item) => <p>{item}</p>}
        onChange={handleChange}
        onSelect={(item) => setSelectedProfile(item)}
      />
    </div>
          {/* test input ends */}
        </form>
      </div>
      <div className="topbar-right">
        <ul>
          <li>
            {/* <button
              type="button"
              className="primary-btn1"
              data-bs-toggle="modal"
              data-bs-target="#signUpModal01"
            >
              {locale === "en" ? "English" : "عربي"}
            </button> */}
          </li>
        </ul>
        <ul className="d-flex justify-content-center align-items-center">
                {locales.map((locale, idx) => {
                  // Only show Arabic if the current locale is English, and vice versa
                  if (
                    (currentLocale === "en" && locale === "ar") ||
                    (currentLocale === "ar" && locale === "en")
                  ) {
                    return (
                      <div key={idx}>
                        {/* <Link
                          href={asPath}
                          locale={locale}
                          key={locale}
                          className="mx-2"
                        >
                        
                            <button
              type="button"
              className={`${
                currentLocale === locale
                  ? "fw-bold text-primary"
                  : "fw-bold text-primary"
              } primary-btn1 text-white`}
            
            >
                            {locale === "en" ? "English" : "عربي"}
                            </button>
                        </Link> */}
                        <LanguageSwitcher />
                      </div>
                    );
                  }
                  return null; // Do not render anything for other cases
                })}
              </ul>
      </div>
    </div>
  );
}

export default Topbar;
