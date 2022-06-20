import React, { useMemo, useState } from 'react';
import { useDebounceValue } from './use-debounce-value';
import Fuse from 'fuse.js';

/**
 * A simple hook to abstract and debounce search logic using Fuse.js
 */
export function useSearchInObjects<SearchObjects extends object>(
  objects: SearchObjects[],
  options?: {
    fuseOptions?: Fuse.IFuseOptions<SearchObjects>;
    debounceAmount?: number;
  },
) {
  const { debounceAmount = 200, fuseOptions } = options || {};
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounceValue(searchValue, debounceAmount);

  // filter objects based on search query using Fuse.js
  const filtered = useMemo(() => {
    if (debouncedSearchValue.trim().length === 0) return null;
    const fuse = new Fuse(objects, fuseOptions);
    return fuse.search(debouncedSearchValue).map(({ item }) => item);
  }, [debouncedSearchValue, fuseOptions, objects]);

  // onSearch handler for SearchBox component
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return {
    filtered: filtered ?? objects,
    searchValue,
    onSearch,
    searchBoxProps: { searchValue, onSearch },
  };
}
