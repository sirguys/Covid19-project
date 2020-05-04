import numeral from 'numeral'

export const formatNumber = number =>
         typeof number === 'number'
           ? numeral(number).format('0,0.[00]')
           : number.toString()

export const findPercentage = (percent, total) => (percent / 100) * total

export const percentage = (data, total) => (data / total) * 100
