const isArraysEqual = (a = [], b = []) => {
  if (a.length === 0 && b.length === 0) {
    throw new Error('you must provide arrays to compare')
  }

  return a.length === b.length && a.every((v, i) => v === b[i])
}

module.exports.isArraysEqual = isArraysEqual
