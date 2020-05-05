import numeral from 'numeral'

export const formatNumber = number =>
         typeof number === 'number'
           ? numeral(number).format('0,0.[00]')
           : number.toString()

export const findPercentage = (percent, total) => (percent / 100) * total

export const percentage = (data, total) => (data / total) * 100

export const mergeByCountryCode = (a1, a2) =>
  a1.map(itm => ({
    ...a2.find(item => item.CountryCode === itm.alpha2Code && item),
    ...itm
  }))

export const sortedData = data => data.sort((a, b) =>
  a.TotalConfirmed < b.TotalConfirmed ? 1 : -1
)
