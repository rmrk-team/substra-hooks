import React from 'react';
import { Box, Flex, Button, Link, useColorMode } from '@chakra-ui/react';
import { HiDownload } from '@react-icons/all-files/hi/HiDownload';
import { CheckIcon } from '@chakra-ui/icons';

interface IProps {
  installed?: boolean;
  installUrl?: string;
  title: string;
  logo: {
    src: string;
    alt: string;
  };
  onClick: () => void;
  disabled?: boolean;
}

const WalletButton = ({
  installed,
  installUrl,
  title,
  logo: { src, alt },
  onClick,
  disabled,
}: IProps) => {
  const isDark = useColorMode().colorMode === 'dark';
  const connected = installed && disabled;

  const content = (
    <Button
      data-name={'wallet-switch'}
      onClick={onClick}
      variant={'unstyled'}
      w={'100%'}
      h={'auto'}
      p={3}
      disabled={connected}
      borderWidth="2px"
      borderStyle="solid"
      borderColor="gray.100"
      borderRadius="2xl"
      _hover={{
        backgroundColor: disabled ? 'initial' : isDark ? 'gray.900' : 'gray.100',
      }}>
      <Flex align={'center'} justify={'space-between'}>
        <Flex align={'center'}>
          <Flex align={'center'} justify={'center'} w={'44px'} h={'44px'}>
            <Box as={'img'} src={src} alt={alt} w={'100%'} />
          </Flex>
          <Box ml={3}>{title}</Box>
        </Flex>
        {!installed && (
          <Box fontSize={'xl'} color={isDark ? 'gray.100' : 'gray.500'}>
            <HiDownload />
          </Box>
        )}
      </Flex>
    </Button>
  );

  return installed ? (
    content
  ) : installUrl ? (
    <Link
      href={installUrl}
      isExternal
      w={'100%'}
      _hover={{
        textDecoration: 'none',
      }}>
      {content}
    </Link>
  ) : null;
};

export default WalletButton;
