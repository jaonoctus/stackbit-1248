const { isArraysEqual } = require('../src/utils')

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
})
