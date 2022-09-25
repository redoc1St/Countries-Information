import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    createContext,
} from 'react'

// import React from 'react';
import ReactDOM from 'react-dom';
import { useParams } from "react-router";

import { ThemeContext } from '../../ThemeContext/themeContext'
import { GiWorld, GiEarthAsiaOceania } from "react-icons/gi";
import { FaChevronDown } from 'react-icons/fa'
import styled from 'styled-components';
// import Option from './Option/Option';
import Options from './Option/Options';

export const FilterContext = createContext();

function Filter(props) {
    // const themeContext = useContext(ThemeContext);
    // FaGlobeAfrica, FaGlobeAmericas, FaGlobeAsia, FaGlobeEurope 

    const themeContext = useContext(ThemeContext);
    const refSelect = useRef(null);
    const [isShowOptions, setIsShowOptions] = useState(false)
    const {regionName}= useParams();
    const [valueOption, setValueOption] = useState("All");
    // const slug = useParams();


    const handleOptions = (e) => {  //khi click vào thì chuyển thành true
        if (refSelect.current) setIsShowOptions(refSelect.current.contains(e.target))   ;
        // console.log(refSelect.current.contains(e.target))
    }

    useEffect(()=>{         //cứ khi nào regionName lấy ở thanh url thay đổi thì lại update vào cái dropdownlist theo
        if(regionName) setValueOption(regionName)
        else setValueOption('All')
    },[regionName])

    useEffect(() => {
        //     if (slug.regionName) {
        //         setValueOption(slug.regionName)
        //     } else setValueOption('All')
        // }, [slug.regionName]
        if (isShowOptions) {
            document.addEventListener('click', handleOptions);
            return () => {
                document.removeEventListener('click', handleOptions);       //kiểu khi click ra bên ngoài thì chuyển thành false
            }
        }
    },[isShowOptions]
    )


    // const getValueOption = useCallback((value) => {
    //     setValueOption(value);
    // }, []);

    // const valueFilterContext = { getValueOption, valueOption };


    return (
        // <FilterContext.Provider value={valueFilterContext}>

            <FilterPane>
                <h3>Filter by regions:</h3>
                <SelectPane>

                    <Select className={themeContext.theme}
                        ref={refSelect}
                        onClick={handleOptions}
                    >
                        <span style={{ marginLeft: '10px' }}>{valueOption}</span>
                        <FaChevronDown style={{ marginRight: '10px' }} />
                    </Select>
                    <Options isShowOptions={isShowOptions}/>


                </SelectPane>
            </FilterPane>
        // </FilterContext.Provider>

    )
}
export default Filter

const FilterPane = styled.div`
max-width: 160px;
width: 100%;
margin-top: 20px;
h3{
    font-size: 18px;
    font-weight: 600;
    text-shadow: var(--TextShadow);
}
`
const SelectPane = styled.div`
width: 100%;
margin-top: 8px;
position: relative;
/* background-color: #ccc; */
/* padding-left: 15px; */
`

const Select = styled.div`
padding: 0;
display: flex;
align-items: center;
justify-content: space-between;
border-radius: 4px;
height: 34px;
user-select: none;
span{
    font-size: 18px;
    font-weight: bold;
}
`

// const OptionPane = styled.ul`
// width: 100%;
// margin-top: 2px;
// border-radius: 4px;
// position: absolute;
// overflow: hidden;
// z-index: 10;
// `

// const OptionItem = styled.li`
//     display: flex;
//     align-items: center;
//     font-size: 18px;
//     font-weight: 500;
//     cursor: pointer;
//     padding: 4px 8px;
//     &:hover{
//         font-weight: bold;
//         background: var(--SelectOptionBackground);
//     }

//     span{
//     margin-left: 5px;
// }
// `
