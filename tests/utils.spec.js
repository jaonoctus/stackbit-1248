const {
  isArraysEqual,
  zeroPad,
  isIntegerNumberInRange,
} = require('../src/utils')

describe('Utils', () => {
  describe('isArraysEqual', () => {
    it('Should compare two arrays', () => {
      const array1 = [0, 1, 2, 3]
      const array2 = [0, 1, 2, 3]
      const array3 = []
      const array4 = [4, 3, 2, 1]

      expect(isArraysEqual(array1, array2)).toBeTruthy()
      expect(isArraysEqual(array2, array1)).toBeTruthy()
      expect(isArraysEqual(array1, array3)).toBeFalsy()
      expect(isArraysEqual(array1, array4)).toBeFalsy()
    })

    it('Should throw an error if no array is provided', () => {
      expect(() => {
        isArraysEqual()
      }).toThrowError()
    })
  })

  describe('zeroPad', () => {
    it('Should zeropad this shit', () => {
      expect(zeroPad(1)).toBe('0001')
      expect(zeroPad(11)).toBe('0011')
      expect(zeroPad(111)).toBe('0111')
      expect(zeroPad(1111)).toBe('1111')
    })
  })

  describe('isIntegerNumberInRange', () => {
    it('Should return true for a valid integer number', () => {
      expect(isIntegerNumberInRange(1, { min: 0, max: 2048 })).toBeTruthy()
      expect(isIntegerNumberInRange(2048, { min: 0, max: 2048 })).toBeTruthy()
    })

    it('Should return false for a invalid integer number', () => {
      expect(isIntegerNumberInRange(-1, { min: 0, max: 2048 })).toBeFalsy()
      expect(isIntegerNumberInRange(2049, { min: 0, max: 2048 })).toBeFalsy()
      expect(isIntegerNumberInRange(1.5, { min: 0, max: 2048 })).toBeFalsy()
    })

    it('Should throw an error if the range is not specified', () => {
      expect(() => isIntegerNumberInRange(-1)).toThrow()
      expect(() => isIntegerNumberInRange(-1, {})).toThrow()
      expect(() => isIntegerNumberInRange(-1, { min: 0 })).toThrow()
      expect(() => isIntegerNumberInRange(-1, { max: 0 })).toThrow()
    })
  })
})
