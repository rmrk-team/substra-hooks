/**
 * Shorten long addresses byt adding ellipsis in between
 * @param id
 * @param inMiddle
 * @param sliceSize
 */
export const shortenAccountId = (id: string, inMiddle?: boolean, sliceSize: number = 4) => {
  if (id) {
    const beginning = id.slice(0, inMiddle ? sliceSize : 12);
    const end = id.slice(-sliceSize);

    return inMiddle ? `${beginning}...${end}` : `${beginning}${id.length > 12 ? '...' : ''}`;
  }

  return '';
};
