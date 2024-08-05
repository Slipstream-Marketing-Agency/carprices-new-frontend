import React, { useEffect, useRef, useState } from 'react'
import useTranslate from '../utils/useTranslate';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { createApolloClient } from '../lib/apolloClient';
import Link from 'next/link';

export default function BlogDropDown({searchSlug,news,initialFocus}) {
    const inputRef = useRef(null); 
    const router = useRouter();
    const t = useTranslate();
    let isRtl = router.locale === 'ar';
    const client = createApolloClient();

    const [brandInput, setBrandInput] = useState('');
    const [brandOptions, setBrandOptions] = useState([]);
    const [tagOptions, setTagOptions] = useState([]);
    const [searchLoading,setSearchLoading]=useState(false)
    const [inputFieldTouched, setInputFieldTouched] = useState(false)
    const [initialScreening,setInitialScreening]=useState(true)



    const fetchBrands = async (brandInput)=>{
      try {
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
    
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
      setSearchLoading(false)
    }
    const fetchTags= async (tagInput)=>{
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
        const tags = data.articleCategories.data.map((brand) => brand.attributes);
        setTagOptions(tags)
    
        
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    
      setSearchLoading(false)
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
        
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
      setSearchLoading(false)
    }
  

    const InputFieldClicked = () => {
      setInputFieldTouched(true)
      setSearchLoading(true)


  
      if (!brandInput) {
        fetchAllBrands()
      }
      else{
      setSearchLoading(false)

      }
    }
  

    const inputFieldReset=()=>{
      setInputFieldTouched(false);setInitialScreening(true)
    }

    const handleInputFieldBlur = () => {
      setInputFieldTouched(false)
    }



    useEffect(()=>{
        if(initialFocus){
            inputRef.current.focus();
        }
      if(initialScreening){
          setInputFieldTouched(false)
      }
      if(searchSlug){
        setBrandInput(searchSlug)
      }
  },[])
    useEffect(() => {
      setInputFieldTouched(true)
      if (brandInput.trim() === '') {
        fetchAllBrands()
      }

      if (brandInput.trim() === '' ) {
        return;
      }

      if(!initialScreening){
        fetchBrands(brandInput)
        fetchTags(brandInput)
        }else{
            setInputFieldTouched(false)
        }
        setInitialScreening(false)
    
    }, [brandInput]);
  

    return (
        <div className="inputSearchContainer mt-4 position-relative">
            <i class="bi bi-search searchIcon"></i>
            <input type="text"
              ref={inputRef}
              className={`newsInputSearch ${isRtl && 'inputFieldPlaceholderTxtRight'}`}
              placeholder={t.searchByBrandOrTags}
              value={brandInput}
              onClick={InputFieldClicked}
              onChange={(e) => setBrandInput(e.target.value)}
            
          />    

{((brandOptions.length > 0 || tagOptions.length>0) && inputFieldTouched) && <ul className="relatedDataList">
                {(inputFieldTouched && brandInput == '') && <li className={`allBrandsTxt p-2 ${isRtl && 'text-end'}`}>{t.allBrands}</li>}
                {(inputFieldTouched && brandOptions.length>0 && brandInput != '') && <li className={`allBrandsTxt p-2 ${isRtl && 'text-end'}`}>{`${!isRtl ? 'Brand(s)' : t.brands}`}</li>}
                {brandOptions?.map((brand, index) => (
                  <Link legacyBehavior href={`/${news ? 'news' : 'reviews' }/brand/${brand?.attributes?.slug}`}><li className="border-bottom p-2 searchResultItem cursor_pointer" key={index}  onClick={()=>{setBrandInput(brand?.attributes?.name);inputFieldReset();}}>{brand?.attributes?.name}</li></Link>
                ))}
                {(inputFieldTouched && tagOptions.length>0 && brandInput != '') && <li className={`allBrandsTxt p-2 ${isRtl && 'text-end'}`}>{`${!isRtl ? 'Tag(s)' : t.tags}`}</li>}
                {tagOptions?.map((tag, index) => (
                  <Link legacyBehavior href={`/${news ? 'news' : 'reviews' }/tag/${tagOptions[index]?.slug}`}><li className="border-bottom p-2 searchResultItem cursor_pointer" key={index}  >{tag?.name}</li></Link>
                ))}
                {/* {(inputFieldTouched && brandOptions.length==0) && <li className="allBrandsTxt p-2">No result found</li>} */}
    
              </ul>}
              
    
    
              {(inputFieldTouched && !searchLoading ) && <span aria-hidden="true" className="fs-2 cursor_pointer" onClick={() => {setBrandInput('');setInputFieldTouched(false)}}>&times;</span>}
             {(searchLoading) && <div className="spinnerItem"></div>}
            </div>
    );
  };
