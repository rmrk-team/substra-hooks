import React, { ChangeEvent } from 'react';
import { Input, InputGroup, InputLeftElement, useColorMode } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface IProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  placeholder?: string;
}

const SearchBox = ({ onSearch, searchValue, placeholder = undefined }: IProps) => {
  const isDark = useColorMode().colorMode === 'dark';

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" h="100%" w="30px" fontSize="sm">
        <SearchIcon />
      </InputLeftElement>
      <Input
        pl="30px"
        type="text"
        borderRadius="5px"
        placeholder={
          placeholder ?? 'Search by name'
        }
        onChange={onSearch}
        size="sm"
        value={searchValue}
        backgroundColor={isDark ? 'gray.800' : 'white'}
      />
    </InputGroup>
  );
};

export default SearchBox;
