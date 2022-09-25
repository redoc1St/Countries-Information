import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'
import styles from './SwitchStyles.module.css'
import { useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../ThemeContext/themeContext'
import { useContext } from 'react'

function SwitchMode() {
    const themeContext = useContext(ThemeContext)
    const refInput = useRef();
    const refCircle = useRef();
    const refToggle = useRef();
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        refInput.current.checked = isDark
        setIsDark(refInput.current.checked)
    }, [isDark])

    useEffect(() => {
        const changeBackgroundButton = () => {
            if (isDark) {
                refCircle.current.style.background = '#222'
                refToggle.current.style.background = '#fff'
            } else {
                refCircle.current.style.background = '#fff'
                refToggle.current.style.background = 'var(--ToggleButtonBackground)'

            }
        }
        changeBackgroundButton();
        document.addEventListener('resize', changeBackgroundButton);
        return () => {
            document.removeEventListener('resize', changeBackgroundButton);
        }
    }, [isDark])

    const handleToggle = () => {
        refInput.current.checked = !refInput.current.checked;
        setIsDark(refInput.current.checked);
        themeContext.toggleTheme();     //bên themeContext.js
    }

    return (
        <div className={styles.toggleButton} ref={refToggle} onClick={handleToggle}>
            <input type="checkbox" className={styles.Input} ref={refInput} />
            <div className={styles.Icon}>
                {
                    (isDark) ? <BsFillMoonFill />:<BsFillSunFill /> 
                }
                {/* <BsFillSunFill/> */}
            </div>
            <div className={styles.Circle} ref={refCircle}></div>
            {/* <BsFillMoonFill></BsFillMoonFill> */}

        </div>
    )
}
export default SwitchMode