import React from 'react'
import styled from 'styled-components'

import { formatNumber } from '../helpers/utility'
import Frame from '../images/frame.png'
import Shape from '../images/shape.png'

export default ({ data, covidDataGlobal }) => {
  return (
    <Container>
      <GlobalInfo>
        <span>จำนวนผู้ติดเชื้อทั่วโลก {formatNumber(covidDataGlobal.TotalConfirmed)} คน</span>
      </GlobalInfo>
      <GridContainer>
        {data.map(item => {
          return (
            <>
              <div key={`${item.Slug}-${item.numericCode}`}>
                <ImageContainer>
                  <FlagImage src={item.flag} alt={item.demonym} />
                </ImageContainer>
                <InfoContainer>
                  <span className="country">
                    {item.Country}
                    {` (${item.CountryCode})`}
                    {` (${item.timezones[0]})`}
                  </span>
                  <span className="currencies">
                    สกุลเงิน {item.currencies[0].name} (
                    {item.currencies[0].code})
                  </span>
                  <span className="confirmed">{`จำนวนผู้ติดเชื้อ ${formatNumber(
                    item.TotalConfirmed
                  )} คน`}</span>
                </InfoContainer>
              </div>
            </>
          )
        })}
      </GridContainer>
    </Container>
  )
}

const Container = styled.div `
  max-width: 1273px;
  margin: 0 auto;
  background: url(${Frame});
  background-attachment: scroll;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top center;
`

const GridContainer = styled.div `
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 60px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 100px 100px;
  padding-bottom: 1355px;

  @media (max-width: 888px) {
    padding: 40px 100px;
    grid-gap: 20px;
  }

  @media (max-width: 607px) {
    padding: 0;
  }

  div {
    text-align: center;
    position: relative;
    font-size: 1rem;
    transition: all .3s ease-out;

    span {
      display: block;
    }

    &:hover {
      transform: scale(1.1);
    }

    @media (max-width: 1019px) {
      grid-gap: 6px;
    }

    @media (max-width: 888px) {
      grid-gap: 0px;
    }
  }
`

const FlagImage = styled.img `
  width: 200px;
  display: block;
  margin: 0 auto;

  @media (max-width: 1019px) {
    width: 100px;
  }

  @media (max-width: 607px) {
    width: 60px;
  }
`

const ImageContainer = styled.div `
    display: block;
    height: 150px;
    padding: 0;

    @media (max-width: 1019px) {
      height: auto;
    }
`

const InfoContainer = styled.div `
  display: block;
  line-height: 1.5;

  .country {
    color: #a0de59;

    @media (max-width: 888px) {
      font-size: .7rem;
    }

    @media (max-width: 607px) {
      font-size: .4rem;
    }
  }
  .currencies {
    font-size: .9rem;

    @media (max-width: 888px) {
      font-size: .7rem;
    }

    @media (max-width: 607px) {
      font-size: .5rem;
    }
  }
  .confirmed {
    font-size: .8rem;
    color: #adbcbf;

    @media (max-width: 888px) {
      font-size: .7rem;
    }

    @media (max-width: 607px) {
      font-size: .5rem;
    }
  }
`

const GlobalInfo = styled.div `
  display: flex;
  justify-content: center;
  padding-top: 170px;
  font-size: 1.2rem;
  letter-spacing: 1px;
  color: #FFE1A3;

  &::before, ::after {
    content: url(${Shape});
    margin: 0 15px;
  }

  @media (max-width: 888px) {
    padding-top: 70px;
    font-size: .7rem;
  }

  @media (max-width: 607px) {
    padding-top: 30px;
    font-size: .5rem;
    margin: 5px;

    &::before, ::after {
      display: none;
    }
  }
`
