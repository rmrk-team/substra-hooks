import React from 'react';
import {
  Box,
  Flex,
  useRadio,
  RadioProps,
  useColorMode,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { encodeAddress } from '@polkadot/util-crypto';
import { ISystemProperties } from '@substra-hooks/core';
import { BiLink } from '@react-icons/all-files/bi/BiLink';
import { BiCopy } from '@react-icons/all-files/bi/BiCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { WalletAccount } from '../../lib/types';
import { shortenAccountId } from '../../lib/utils/shorten-account-id';
import IdentityAvatar from '../common/identity-avatar';
import { useScreenSize } from '../../lib/utils/use-screen-size';

interface IProps extends RadioProps {
  account: WalletAccount;
  systemProperties: ISystemProperties;
}

const AccountRadio = ({ account, systemProperties, ...restProps }: IProps) => {
  const toast = useToast();
  const isDark = useColorMode().colorMode === 'dark';
  const { getInputProps, getCheckboxProps } = useRadio(restProps);
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  const { isSm } = useScreenSize();
  const address = isSm
    ? shortenAccountId(encodeAddress(account.address, systemProperties.ss58Format), true, 6)
    : account.address;

  const onCopyRef = () => {
    toast({
      title: 'Copied your referral link.',
      duration: 1000,
    });
  };

  const onCopyAddress = () => {
    toast({
      title: 'Copied your address.',
      duration: 1000,
    });
  };

  return (
    <Box as="label" data-name="account-radio">
      <input {...input} />
      <Flex
        {...checkbox}
        p={3}
        align="center"
        borderRadius="2xl"
        position={'relative'}
        cursor="pointer"
        borderWidth="2px"
        borderStyle="solid"
        borderColor="gray.100"
        _checked={{
          borderColor: 'pink.400',
        }}
        _hover={{
          backgroundColor: isDark ? 'gray.900' : 'gray.100',
        }}>
        <Flex position={'absolute'} top={2} right={2}>
          <CopyToClipboard text={`https://singular.app?ref=${address}`} onCopy={onCopyRef}>
            <IconButton
              title="Copy referal link"
              size={'xs'}
              variant={'ghost'}
              icon={<BiLink fontSize="xs" />}
              aria-label="Copy referal link"
            />
          </CopyToClipboard>
          <CopyToClipboard text={address} onCopy={onCopyAddress}>
            <IconButton
              title="Copy address"
              size={'xs'}
              variant={'ghost'}
              icon={<BiCopy fontSize="xs" />}
              aria-label="Copy address"
            />
          </CopyToClipboard>
        </Flex>
        <Box pr={3}>
          <IdentityAvatar size={44} id={account.address} />
        </Box>
        <Box w={'100%'} overflow={'hidden'}>
          <Box pb={2} lineHeight="1em">
            {account.name}
          </Box>
          <Box
            fontSize="xs"
            lineHeight="1em"
            color={isDark ? 'white' : 'gray.500'}
            w={'100%'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
            whiteSpace={'nowrap'}>
            {address}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AccountRadio;
