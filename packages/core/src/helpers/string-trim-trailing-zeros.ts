export const stringTrimTrailingZeros = (price: string) => {
  // if not containing a dot, we do not need to do anything
  if (price.indexOf('.') === -1) {
    return price;
  }

  let cutFrom = price.length - 1;

  // as long as the last character is a 0, remove it
  do {
    if (price[cutFrom] === '0') {
      cutFrom--;
    }
  } while (price[cutFrom] === '0');

  // final check to make sure we end correctly
  if (price[cutFrom] === '.') {
    cutFrom--;
  }

  return price.substr(0, cutFrom + 1);
};
