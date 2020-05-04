import numeral from 'numeral'

export const formatNumber = number =>
         typeof number === 'number'
           ? numeral(number).format('0,0.[00]')
           : number.toString()

export const percentage = (percent, total) => ((percent / 100) * total)
