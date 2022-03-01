const {
  decodeBitsToWordIndex,
  decodeBitsToWordNumber,
  getWordFromIndex,
  encodeWordNumberToBits,
  encodeWordIndexToBits,
} = require('../src/index.js')

//  1   2   4   8
//  x             = 1
//      x         = 2
//          x     = 4
//              x = 8
const bits1248 = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
]

//  1   2   4   8
//                = 0
//                = 0
//                = 0
//  x             = 1
const bits0001 = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 0],
]

//  1   2   4   8
//      x         = 2
//                = 0
//          x     = 4
//  x             = 1
const bits2048 = [
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
]

describe('Stackbit', () => {
  describe('encode', () => {
    it('Should be able to get the bits from BIP39 word index', () => {
      expect(encodeWordNumberToBits(1)).toEqual(bits0001)
      expect(encodeWordIndexToBits(0)).toEqual(bits0001)
      expect(encodeWordNumberToBits(1248)).toEqual(bits1248)
      expect(encodeWordIndexToBits(1247)).toEqual(bits1248)
      expect(encodeWordNumberToBits(2048)).toEqual(bits2048)
      expect(encodeWordIndexToBits(2047)).toEqual(bits2048)
    })

    it('Should thow an error if a given number is out of range', () => {
      expect(() => {
        encodeWordNumberToBits(0)
      }).toThrow()

      expect(() => {
        encodeWordNumberToBits(2049)
      }).toThrow()

      expect(() => {
        encodeWordIndexToBits(-1)
      }).toThrow()

      expect(() => {
        encodeWordIndexToBits(2048)
      }).toThrow()
    })

    it('Should thow an error if the input is not a number', () => {
      expect(() => {
        encodeWordIndexToBits('1')
      }).toThrow()

      expect(() => {
        encodeWordIndexToBits([2049])
      }).toThrow()

      expect(() => {
        encodeWordIndexToBits(null)
      }).toThrow()

      expect(() => {
        encodeWordIndexToBits({})
      }).toThrow()

      expect(() => {
        encodeWordIndexToBits([])
      }).toThrow()

      expect(() => {
        encodeWordNumberToBits('1')
      }).toThrow()

      expect(() => {
        encodeWordNumberToBits([2049])
      }).toThrow()

      expect(() => {
        encodeWordNumberToBits(null)
      }).toThrow()

      expect(() => {
        encodeWordNumberToBits({})
      }).toThrow()

      expect(() => {
        encodeWordNumberToBits([])
      }).toThrow()
    })
  })

  describe('decode', () => {
    it('Should be able to get the BIP39 word index from bits', () => {
      expect(decodeBitsToWordNumber(bits0001)).toBe(1)
      expect(decodeBitsToWordIndex(bits0001)).toBe(0)
      expect(decodeBitsToWordNumber(bits1248)).toBe(1248)
      expect(decodeBitsToWordIndex(bits1248)).toBe(1247)
      expect(decodeBitsToWordNumber(bits2048)).toBe(2048)
      expect(decodeBitsToWordIndex(bits2048)).toBe(2047)
    })

    it('Should throw an error if no index is provided', () => {
      expect(() => decodeBitsToWordNumber()).toThrowError()
      expect(() => decodeBitsToWordIndex()).toThrowError()
    })

    it('Should return the correct BIP39 word given an index', () => {
      expect(getWordFromIndex(0)).toEqual('abandon')
      expect(getWordFromIndex(1247)).toEqual('orbit')
      expect(getWordFromIndex(2047)).toEqual('zoo')
    })

    it('Should throw an error if the index is out of range', () => {
      // indexes rage: 0-2047
      expect(() => {
        getWordFromIndex(2048)
      }).toThrowError()
      expect(() => {
        getWordFromIndex(9999)
      }).toThrowError()
      expect(() => {
        getWordFromIndex(-1)
      }).toThrowError()
    })
  })
})
