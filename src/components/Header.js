import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Parallax } from 'react-scroll-parallax'

import { formatNumber } from '../helpers/utility'
import Moon from '../images/moon.png'
import Text from '../images/text.png'
import Candle from '../images/candle.png'

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  padding: 10px;
  grid-template-columns: 2fr 1fr;

  div {
    text-align: center;
    padding: 20px 0;
    font-size: 30px;
    position: relative;
  }
`

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const HeaderImage = styled.img`
  width: ${props => props.type === 'moon' && '80%'};
  margin-top: ${props => props.type === 'text' && '80px'};
  animation: ${Rotate} ${props => props.type === 'moon' && '8s infinite linear'};
`

const MoveUpDown = keyframes`
  0% { 
      transform: translateY(0); 
  }

  100% { 
      transform: translateY(-20px); 
  }
`

const CandleImage = styled.img`
  animation: ${MoveUpDown} 2s infinite linear;
`

const Info = styled.div`
  position: relative;
  margin: 0;
  padding: 0;

  .topic {
    font-size: 1.2rem;
  }
  .desc {
    font-size: 1.2rem;
  }
  span {
    display: block;
    
    span {
        font-size: 1rem;
    }
  }
`

export default ({ worldPopulation, infected, recovered, totalDeaths }) => {
  return (
    <>
      <GridContainer>
        <div>
          <Parallax y={[-150, 40]} tagOuter="figure">
            <HeaderImage src={Moon} type="moon" alt="moon" />
          </Parallax>
        </div>
        <div>
          <Parallax y={[-20, 10]} tagOuter="figure">
            <HeaderImage src={Text} type="text" alt="text" />
          </Parallax>
          <Info>
            <span className="topic">จำนวนประชากรทั่วโลก</span>
            <span className="desc">{formatNumber(worldPopulation)} คน</span>
          </Info>
          <Info>
            <span className="topic">
              จำนวนผู้ติดเชื้อ <br />
              <span>(% เมื่อเทียบกับจำนวนประชากร)</span>
            </span>
            <span className="desc">{infected.toFixed(2)} %</span>
          </Info>
          <Info>
            <span className="topic">
              จำนวนผู้ที่รักษาหาย <br />
              <span>(% เมื่อเทียบกับจำนวนติดเชื้อทั่วโลก)</span>
            </span>
            <span className="desc">{recovered.toFixed(2)} %</span>
          </Info>
          <Info>
            <span className="topic">
              จำนวนที่เสียชีวิตทั่วโลก <br />
              <span>(% เมื่อเทียบกับจำนวนผู้ติดเชื้อทั่วโลก)</span>
            </span>
            <span className="desc">{totalDeaths.toFixed(2)} %</span>
          </Info>
          <Parallax x={[-20, 10]} tagOuter="figure">
            <CandleImage src={Candle} type="candle" alt="candle" />
          </Parallax>
        </div>
      </GridContainer>
    </>
  )
}

