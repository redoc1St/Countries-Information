import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FilterContext } from '../Filter';

// const HOME_PATH = process.env.REACT_APP_PUBLIC_URL;

function Option(props) {    
    const {region}=props;
//   const filterContext = useContext(FilterContext);  
  const navigate = useNavigate();
  
  const handleValueOption = () => {
    console.log(region.value)
    if(region.value!=='All'){
      navigate(`/region/${region.value}`)
    }else{
      navigate('/')
    }
    // filterContext.getValueOption(region.value);    
    // if (region.value!=='All') navigate(`${HOME_PATH}region/${region.value}`)
    // else navigate(HOME_PATH)    
  }    
  
  return (    
    <OptionItem onClick={handleValueOption}>
      <region.icon/>
      <div>{region.value}</div>
    </OptionItem>    
  );
}

export default (Option);

const OptionItem = styled.div`
  display: flex;
  align-items: center;  
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;  
  padding: 4px 8px;  

  &:hover {
    background: var(--SelectOptionBackground);
    font-weight: bold;
  }

  div {
    margin-left: 4px;
  }
  
`