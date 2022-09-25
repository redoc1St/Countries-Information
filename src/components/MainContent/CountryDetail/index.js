// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

import { useEffect } from "react";
import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components"
import { getCountryByName } from "../../Store/Actions/countriesActions";
import { ThemeContext } from "../../ThemeContext/themeContext"
import CountryInfo from "./CountryInfo";

function CountryDetail(props) {
    const themeContext = useContext(ThemeContext);
    const {countryName} = useParams();      //const slug = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const country = useSelector(state => state.Countries.country)

    // console.log(countryName);           //slug.countryName
    
    useEffect(() => {
            dispatch(getCountryByName(countryName))
    }, [countryName,dispatch])

    return (
        <Wrapper>
            <div className={`goback-btn  ${themeContext.theme}`}
                onClick={() => navigate(-1)}
            >Go back</div>
            <CountryContainer>
                <div className="flagCountry">
                   
                    <img src={country? country.flag:'http://via.placeholder.com/300x200?text=Image+Error'} alt="" />         {/* để cái đầu cho nếu nước k có cờ thì đỡ lỗi */}     
                </div>
                <CountryInfo />
            </CountryContainer>
        </Wrapper>
    )
}
export default CountryDetail

const Wrapper = styled.div`
    padding-top: 20px;
    .goback-btn{
        display: block;
        width: 80px;
        height: 28px;
        line-height: 28px;
        padding: 2px 4px;  // trên dưới 2 px, trái phải 4px
        text-align:  center;
        font-weight: 500;
        margin-left: 10px;
        filter: brightness(0.9);
        transition: all 0.2s linear;
        user-select: none;
        border-radius: 5px;
        &:hover{
            filter: brightness(1);
            font-weight: bold;
            cursor: pointer;
            user-select: none;
        }
    }
`

const CountryContainer = styled.div`
    display: flex;  // muốn để 2 bên thì đây để là flex
    flex-direction: row;
    margin-top: 30px;
    @media only screen and (max-width: 800px) {
        flex-direction: column;
        align-items: center;
    }
    .flagCountry{
        max-width: 400px;
        width: 100%;
        height: 100%;
        margin-bottom: 12px;
        box-shadow:  var( --BoxShadow);
        img{
            width: 100%;
            height: 100%;
        }
    }
`