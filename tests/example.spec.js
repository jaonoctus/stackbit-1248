const sum = (a = 0, b = 0) => parseInt(a, 10) + parseInt(b, 10)

describe('Example test', () => {
  it('Should sum two numbers', () => {
    expect(sum(1, 2)).toBe(3)
    expect(sum('1', '2')).toBe(3)
  })
})
