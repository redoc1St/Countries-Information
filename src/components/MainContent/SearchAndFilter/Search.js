// import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { MdSearch } from 'react-icons/md'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Search(props) {
    const [valueInput, setValueInput] = useState('')
    const navigate = useNavigate();


    const handleKeyDown = (e) => {  //xử lý enter
        console.log(e.keyCode);     //khi enter không thì nó cũng ra 13 nên mới co if bên dưới
        if (e.keyCode === 13) {
            (valueInput!=='')?navigate(`/search/${valueInput}`):navigate('/')
        }
    }

    return (

        <SearchPane>
            <h3>Search Country:</h3>
            <SearchElement>
                <input type="text"
                    placeholder='Input the and enter to search..'
                    onChange={e => setValueInput(e.target.value)}
                    value={valueInput}
                    onKeyDown={handleKeyDown}

                />
                <Link to={valueInput!==''?`/search/${valueInput}`:'' }  style={{ width: '40px', height: '100%' }}>
                <div>
                    <MdSearch className='icon' />
                </div>
                </Link>
            </SearchElement>
            {/* <input type='text'></input> */}

        </SearchPane>
    )
}
export default Search;
const SearchPane = styled.div`
    max-width: 320px;
    width: 100%;
    margin-top: 20px;
    h3{
        font-size: 18px;
        font-weight: 600;
        text-shadow: var(--TextShadow);
    }
`
const SearchElement = styled.div`
margin-top: 8px;
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
height: 34px;
background-color: #fff;
box-shadow: var(--BoxShadow);
border-radius: 5px;
overflow: hidden;

.icon{
    height: 100%;
    width: 100%;
    padding: 5px;
    text-align: center;
    cursor: pointer;
    justify-content: space-between;
    background: #aaa !important;
    /* margin: %; */
    /* box-shadow: none !important; */
    opacity: 75%;
    //cái dưới này để xử lý lúc mà chuột chạy qua cái icon search thì nó đổi màu
    transition: opacity 0.2s linear;
    &:hover{
        opacity: 1;
    }
}
input{
    border: 0;
    outline: none;
    width:100%;
    font-size: 18px;
    font-weight: 500;
}
`