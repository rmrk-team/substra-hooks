import {
  formatPrice,
  bigIntPriceToNumber,

} from '../../src/helpers/format-price';

// Test formatPrice
describe('utils: formatPrice', () => {
  const systemProperties = {
    ss58Format: 2,
    tokenDecimals: 12,
    tokenSymbol: 'KSM',
  };
  it('Should return formatted price', () => {
    expect(formatPrice(BigInt(1.2e12), systemProperties)).toEqual('1.2000 KSM');
  });

  it('Should return formatted fixed price', () => {
    expect(formatPrice(BigInt(1.2e12), systemProperties, true)).toEqual('1.2 KSM');
  });

  it('Should return formatted price if string is passed', () => {
    expect(formatPrice('1000000000000', systemProperties, true)).toEqual('1 KSM');
  });

  it('Should return formatted price if number is passed', () => {
    expect(formatPrice(2, systemProperties, true)).toEqual('2 KSM');
  });
});

describe('utils: bigIntPriceToNumber', () => {
  const systemProperties = {
    ss58Format: 2,
    tokenDecimals: 12,
    tokenSymbol: 'KSM',
  };
  it('Should return fixed price to be displayed to user', () => {
    expect(bigIntPriceToNumber(BigInt(1.2e12), systemProperties)).toEqual(1.2);
  });

  it('Should return fixed price to be displayed to user', () => {
    expect(bigIntPriceToNumber(BigInt(0), systemProperties)).toEqual(0);
  });

  it('Should return fixed price to be displayed to user', () => {
    expect(bigIntPriceToNumber(BigInt(4.31e12), systemProperties)).toEqual(4.31);
  });
});



