import React from 'react';
import useSWR from 'swr'
import axios from 'axios'
import get from 'lodash/get'

import { formatNumber, percentage } from './helpers/utility'
import logo from './logo.svg';
import './App.css';

const apiCountries = 'https://restcountries.eu/rest/v2/all'
const apiCovid19 = 'https://api.covid19api.com/summary'

const fetcher = url => axios.get(url)

function App() {

  const { data: countriesData, countriesError } = useSWR(apiCountries, fetcher)
  const { data: covidData, covidError } = useSWR(apiCovid19, fetcher)

  console.log(countriesData, 'countriesData')
  console.log(covidData, 'covidData')

  if (!countriesData || !covidData) {
    return <p>Loading...</p>
  }

  if (countriesError || covidError) {
    return <p>Error...</p>
  }

  //จำนวนประชากรทั่วโลก
  const worldPopulation = countriesData && countriesData.data.reduce(
    (sum, data) => sum + data.population,
    0
  ) 

  //ประเทศทั่วโลก
  const allCountries =
    countriesData && countriesData.data.map(countrie => countrie.name)

  //ข้อมูลผู้ติดเชื้อรวมทั่วโลก
  const covidDataGlobal = get(covidData, 'data.Global')

  //ข้อมูลผู้ติดเชื้อรายประเทศ
  const covidDataByCountry = get(covidData, 'data.Countries')

  //จำนวนผู้ติดเชื้อ (% เมื่อเทียบกับจำนวนประชากร)
  const infected = percentage(covidDataGlobal.TotalConfirmed, worldPopulation) 
  console.log(infected.toFixed(2), 'จำนวนผู้ติดเชื้อ (% เมื่อเทียบกับจำนวนประชากร) 0.05%')

  //จำนวนผู้ที่รักษาหาย (% เมื่อเทียบกับจำนวนติดเชื้อทั่วโลก)
  const recovered = percentage(covidDataGlobal.TotalRecovered, covidDataGlobal.TotalConfirmed)
  console.log(Math.floor(recovered), 'จำนวนผู้ที่รักษาหาย (% เมื่อเทียบกับจำนวนติดเชื้อทั่วโลก 32%')
  
  //จำนวนที่เสียชีวิตทั่วโลก (% เมื่อเทียบกับจำนวนผู้ติดเชื้อทั่วโลก)
  const totalDeaths = percentage(covidDataGlobal.TotalDeaths, covidDataGlobal.TotalConfirmed)
  console.log(Math.floor(totalDeaths), 'จำนวนที่เสียชีวิตทั่วโลก (% เมื่อเทียบกับจำนวนผู้ติดเชื้อทั่วโลก) 7%')

  // const sortedData = data.Countries.sort((a, b) =>
  //   a.TotalConfirmed < b.TotalConfirmed ? 1 : -1
  // )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          World Population{' '}
          <code> {formatNumber(worldPopulation)} คน</code>
        </p>
      </header>
    </div>
  )
}

export default App;
