const { isArraysEqual, zeroPad, isIntegerNumberInRange } = require('./utils')

const BIT_SET = [
  // 1, 2, 4, 8
  [0, 0, 0, 0], // 0
  [1, 0, 0, 0], // 1
  [0, 1, 0, 0], // 2
  [1, 1, 0, 0], // 3
  [0, 0, 1, 0], // 4
  [1, 0, 1, 0], // 5
  [0, 1, 1, 0], // 6
  [1, 1, 1, 0], // 7
  [0, 0, 0, 1], // 8
  [1, 0, 0, 1], // 9
]

const decodeBitsToWordNumber = (bits = []) => {
  if (bits.length === 0) {
    throw new Error('should provide some bits')
  }

  return parseInt(
    bits.map(bit => BIT_SET.findIndex(k => isArraysEqual(bit, k))).join(''),
    10,
  )
}

const decodeBitsToWordIndex = (bits = []) => {
  return decodeBitsToWordNumber(bits) - 1
}

const getWordFromIndex = index => {
  const { BIP39_WORD_LIST } = require('./BIP39WordList')
  const word = BIP39_WORD_LIST[index]

  if (word === undefined) {
    throw new Error(`index ${index} is out of range (0-2047)`)
  }

  return word
}

const encodeWordNumberToBits = wordNumber => {
  if (!isIntegerNumberInRange(wordNumber, { min: 1, max: 2048 })) {
    throw new Error('invalid number')
  }

  return zeroPad(wordNumber)
    .split('')
    .map(text => parseInt(text, 10))
    .map(n => BIT_SET[n])
}

const encodeWordIndexToBits = wordIndex => {
  if (!isIntegerNumberInRange(wordIndex, { min: 0, max: 2047 })) {
    throw new Error('invalid wordIndex')
  }

  return encodeWordNumberToBits(wordIndex + 1)
}

module.exports.decodeBitsToWordIndex = decodeBitsToWordIndex
module.exports.decodeBitsToWordNumber = decodeBitsToWordNumber
module.exports.encodeWordNumberToBits = encodeWordNumberToBits
module.exports.getWordFromIndex = getWordFromIndex
module.exports.encodeWordIndexToBits = encodeWordIndexToBits
