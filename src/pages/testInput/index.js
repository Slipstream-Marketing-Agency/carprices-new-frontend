import LiveSearch from '@/src/components/Dropdown';

import Dropdown from '@/src/components/Dropdown'
import { createApolloClient } from '@/src/lib/apolloClient';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

  
export default function index({ news, totalNews, currentPage, totalPages, fullData }) {
    const [isLoading, setIsLoading] = useState(false);
    const [brandOptions,setBrandOptions]=useState([])
    const [tagOptions,setTagOptions]=useState([])
    const client = createApolloClient();
    const router = useRouter()

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
    <div>
        {isLoading && <p>Loading...</p>}
        <LiveSearch
        results={results}
        value={selectedProfile ? selectedProfile.name : ""}
        renderItem={(item) => <p>{item}</p>}
        onChange={handleChange}
        onSelect={(item) => setSelectedProfile(item)}
      />
    </div>
  )
}


