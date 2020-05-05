import React from 'react';
import useSWR from 'swr'
import axios from 'axios'
import get from 'lodash/get'
import styled from 'styled-components'

import {
  percentage,
  mergeByCountryCode,
  findPercentage,
  sortedData,
} from './helpers/utility'
import Loading from './components/Loading'
import GlobalStyles from './styles/global-styles'
import Header from './components/Header'
import Content from './components/Content'

const apiCountries = 'https://restcountries.eu/rest/v2/all'
const apiCovid19 = 'https://api.covid19api.com/summary'

const fetcher = url => axios.get(url)

function App() {

  const { data: countriesData, countriesError } = useSWR(apiCountries, fetcher)
  const { data: covidData, covidError } = useSWR(apiCovid19, fetcher)

  if (!countriesData || !covidData) {
    return <Loading />
  }

  if (countriesError || covidError) {
    return <p>Error...</p>
  }

  //จำนวนประชากรทั่วโลก
  const worldPopulation = countriesData && countriesData.data.reduce(
    (sum, data) => sum + data.population,
    0
  ) 

  //ข้อมูลผู้ติดเชื้อรวมทั่วโลก
  const covidDataGlobal = get(covidData, 'data.Global')

  //ข้อมูลผู้ติดเชื้อรายประเทศ
  const covidDataByCountry = get(covidData, 'data.Countries')

  //จำนวนผู้ติดเชื้อ (% เมื่อเทียบกับจำนวนประชากร)
  const infected = percentage(covidDataGlobal.TotalConfirmed, worldPopulation) 

  //จำนวนผู้ที่รักษาหาย (% เมื่อเทียบกับจำนวนติดเชื้อทั่วโลก)
  const recovered = percentage(covidDataGlobal.TotalRecovered, covidDataGlobal.TotalConfirmed)
  
  //จำนวนที่เสียชีวิตทั่วโลก (% เมื่อเทียบกับจำนวนผู้ติดเชื้อทั่วโลก)
  const totalDeaths = percentage(covidDataGlobal.TotalDeaths, covidDataGlobal.TotalConfirmed)

  //Complete Data รายประเทศ
  const completeDataByCountry = mergeByCountryCode(countriesData.data, covidDataByCountry)

  //เลือกเฉพาะประเทศที่มีเปอร์เซนต์ผู้ติดเชื้อสูง (% เมื่อเทียบกับจำนวนติดเชื้อทั่วโลก) มากกว่า 10%
  const percentageOfInfected = findPercentage(5, covidDataGlobal.TotalConfirmed)
  const mostInfectedCountry = completeDataByCountry.filter(
    item => item.TotalConfirmed > percentageOfInfected
  )
  
  //เรียงจากสูงไปต่ำ
  const data = sortedData(mostInfectedCountry)
  console.log(data, 'sortedData=================')

  return (
    <div>
      <GlobalStyles />
      <Header
        worldPopulation={worldPopulation}
        infected={infected}
        recovered={recovered}
        totalDeaths={totalDeaths}
      />
      <Content data={data}/>
    </div>
  )
}

export default App;
