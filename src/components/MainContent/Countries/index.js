// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

import styled from "styled-components"
import Country from "./Country"
import { getCountries, getCountriesByName, getCountriesByRegion } from '../../Store/Actions/countriesActions'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import ScrollBar from 'react-perfect-scrollbar'
import { useParams } from "react-router";
import Loading from "../../Loading/Loading";
function Countries() {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.Countries.countries)       //cái này chấm đến cái countriesReducers
    // console.log(countries);
    const slug = useParams();
    const loading = useSelector(state => state.Countries.loading)

    console.log('hello', slug.regionName);
    console.log('hello', slug.name);



    useEffect(() => {
        if (slug.regionName) dispatch(getCountriesByRegion(slug.regionName))
        else if (slug.name){
            dispatch(getCountriesByName(slug.name));
            // console.log(getCountriesByName(slug.name))
        }
        else dispatch(getCountries())      //lấy tất các quốc gia
    }, [dispatch, slug.regionName, slug.name])

    return (
        <>
            {
                loading ? (<Loading /> ):
                    (
                        <ScrollBar style={{ maxHeight: '70vh', overflow: 'hidden' }}>
                            <CountriesContainer>
                                {countries.map((country, index) => (
                                    <Country country={country} key={index}></Country>
                                ))}
                                {/* <Country></Country> */}
                            </CountriesContainer>
                        </ScrollBar>
                     )
             }
         </>
    )
}

export default Countries

const CountriesContainer = styled.div`
width: 100%;
display: grid;
grid-template-columns: repeat(4,1fr);
gap: 12px;
padding: 4px 1px;

@media screen and (max-width:1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
@media screen and (max-width:768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
}
@media screen and (max-width:480px) {
    grid-template-columns: repeat(1, auto);
}


`

