const {
  decodeBitsToWordIndex,
  decodeBitsToWordNumber,
  getWordFromIndex,
} = require('../src/index.js')

describe('Stackbit', () => {
  describe('encode', () => {
    it('Should be able to get the BIP39 seed', () => {
      // TODO
      expect(true).toBeTruthy()
    })
  })

  describe('decode', () => {
    it('Should be able to get the BIP39 word index from bits', () => {
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

      expect(decodeBitsToWordNumber(bits1248)).toBe(1248)
      expect(decodeBitsToWordIndex(bits1248)).toBe(1247)
      expect(decodeBitsToWordNumber(bits0001)).toBe(1)
      expect(decodeBitsToWordIndex(bits0001)).toBe(0)
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
