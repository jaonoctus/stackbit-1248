const isArraysEqual = (a = [], b = []) => {
  if (a.length === 0 && b.length === 0) {
    throw new Error('you must provide arrays to compare')
  }

  return a.length === b.length && a.every((v, i) => v === b[i])
}

const zeroPad = number => {
  const places = 4

  return String(number).padStart(places, '0')
}

const isIntegerNumberInRange = (number, range) => {
  if (!range || range.min === undefined || range.max === undefined) {
    throw new Error('you should specify the range')
  }

  if (typeof number !== 'number') {
    return false
  }

  if (number < range.min || number > range.max) {
    return false
  }

  return Number.isInteger(number)
}

module.exports.isArraysEqual = isArraysEqual
module.exports.isIntegerNumberInRange = isIntegerNumberInRange
module.exports.zeroPad = zeroPad
