import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import styles from './countryInfoStyles.module.scss'
import { ThemeContext } from '../../ThemeContext/themeContext'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ScrollBar from 'react-perfect-scrollbar'

const getLanguages = (country) => {
    let result = '';
    country.languages.forEach(language => {
        if (result !== '') result = result + '-' + language.name
        else result += language.name
    });
    return result
}
const getCurrencies = (currencies) => {
    let res = '';
    if (currencies) {
        res = currencies[0].code + '-' + currencies[0].name
    } else {
        res += 'No information'
    }
    return res
}

const getCountryNameByCode = async (code) => {

    const result = await axios.get(`https://restcountries.com/v2/alpha?codes=${code}`)
    return result.data
}

function CountryInfo(props) {
    const themeContext = useContext(ThemeContext)
    const [countriesBorder, setCountriesBorder] = useState([]);

    const country = useSelector(state => state.Countries.country)


    useEffect(() => {
        if (country && country.borders) {
            getCountryNameByCode(country.borders)
                .then(res => {
                    const countryName = res.map(country => country.name)
                    setCountriesBorder(countryName)
                })
                .catch((err) => console.log(err))
        }
    }, [country])

    // console.log(countriesBorder);

    return (
        <ScrollBar style={{maxHeight:'70vh',overflow:'hidden'}}>
        <div className={styles.countryInfo} >
            {
                country && (        //thêm cái này để fix bug nếu country ban đầu k có giá trị thì nó k đọc được nên lỗi, nên phải thêm cái này(chưa rõ lắm)
                    <>
                        <h3 className={styles.countryName}>{country.name}</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td className={styles.countryInfo__title}>Native name</td>
                                    <td>:</td>
                                    <td className={styles.countryInfo__value}>{country.nativeName}</td>
                                </tr>
                                <tr>
                                    <td className={styles.countryInfo__title}>Official</td>
                                    <td>:</td>
                                    <td className={styles.countryInfo__value}>{country.altSpellings}</td>
                                </tr>
                                <tr>
                                    <td className={styles.countryInfo__title}>Population</td>
                                    <td>:</td>
                                    <td className={styles.countryInfo__value}>{new Intl.NumberFormat().format(country.population)}</td>
                                </tr>
                                <tr>
                                    <td className={styles.countryInfo__title}>Region</td>
                                    <td>:</td>
                                    <td className={styles.countryInfo__value}>{country.region}</td>
                                </tr>
                                <tr>
                                    <td className={styles.countryInfo__title}>Sub Region</td>
                                    <td>:</td>
                                    <td className={styles.countryInfo__value}>{country.subregion}</td>
                                </tr>
                                <tr>
                                    <td className={styles.countryInfo__title}>Capital</td>
                                    <td>:</td>
                                    <td className={styles.countryInfo__value}>{country.capital}</td>
                                </tr>
                                <tr>
                                    <td className={styles.countryInfo__title}>Top level domain</td>
                                    <td>:</td>
                                    <td className={styles.countryInfo__value}>{country.topLevelDomain}</td>
                                </tr>
                                <tr>
                                    <td className={styles.countryInfo__title}>Currencies</td>
                                    <td>:</td>
                                    <td className={styles.countryInfo__value}>{getCurrencies(country.currencies)}</td>
                                </tr>
                                <tr>
                                    <td className={styles.countryInfo__title}>Languages</td>
                                    <td>:</td>
                                    <td className={styles.countryInfo__value}>{getLanguages(country)}</td>
                                </tr>
                                <tr>
                                    <td className={styles.countryInfo__title}>Border Countries</td>
                                    <td>:</td>
                                    <td className={styles.borderList}>
                                        {
                                            countriesBorder.length > 0 && countriesBorder.map(country => (
                                                <Link to={`/country/${country}` }  key={country} >
                                                    <div className={clsx(styles.borderItem, themeContext.theme)}>{country}</div>
                                                </Link>
                                            ))
                                        }
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </>
                )
            }

        </div>
        </ScrollBar>
    )
}

export default CountryInfo
