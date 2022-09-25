import styled from 'styled-components'
import SwitchMode from './SwitchMode'
import { ThemeContext } from '../ThemeContext/themeContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom';
function Header() {
    const themeContext = useContext(ThemeContext);
    return (
        <HeaderPane className={themeContext.theme}>
            <Link to='/'>
                <span>Where in the world</span>
            </Link>
            <SwitchMode></SwitchMode>

        </HeaderPane>
 
    )
}
export default Header

const HeaderPane = styled.div`
height:  8vh;
display: flex;
align-items: center;
justify-content: space-between;
/* background-color: #c3c3c3; */
padding: 0 40px;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.6), 0 6px 20px 0 rgba(0,0,0,0.6) ;
z-index: 020;
span{
    font-size: 24px;
    font-weight: bold;
    text-shadow:  2px 3px 3px 0 rgba(0,0,0,0.6);
    cursor: pointer;
    user-select: none;
    /* text-decoration: none; */
   
}
`