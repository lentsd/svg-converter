export const round = (value) => {
    return value
      .toFixed(3)
      .replace(/0+$/, '')
      .replace(/\.$/, '')
  }
  