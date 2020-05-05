import React from 'react'
import styled, { keyframes } from 'styled-components'

import { formatNumber } from '../helpers/utility'
import Frame from '../images/frame.png'

const Container = styled.div`
    max-width: 1273px;
    margin: 0 auto;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 60px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 200px 100px;
  background: url(${Frame});
  background-attachment: scroll;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top center;
  padding-bottom: 1355px;

  div {
    text-align: center;
    padding: 20px 0;
    position: relative;
    font-size: 1rem;

    span {
      display: block;
    }
  }
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

const FlagImage = styled.img`
  width: 200px;
  display: block;
  margin: 0 auto;
`

export default ({ data }) => {
  return (
    <Container>
      <GridContainer>
        {data.map(item => {
          return (
            <>
              <div key={`${item.Slug}-${item.numericCode}`}>
                <FlagImage src={item.flag} alt={item.demonym} />
                {item.Country}
                {` (${item.CountryCode})`}
                {` (${item.timezones[0]})`}
                <span>
                  สกุลเงิน {item.currencies[0].name} ({item.currencies[0].code})
                </span>
                <span>{`จำนวนผู้ติดเชื้อ ${formatNumber(
                  item.TotalConfirmed
                )} คน`}</span>
              </div>
            </>
          )
        })}
      </GridContainer>
    </Container>
  )
}
