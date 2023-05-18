import React from 'react';
import { Box, useToast } from '@chakra-ui/react';
import Identicon from '@polkadot/react-identicon';
import Image from 'next/image';
import copy from 'copy-to-clipboard';
import { shortenAccountId } from '../../lib/utils/shorten-account-id';

interface IProps {
  size: number;
  id: string;
  userpicUrl?: string;
}

const IdentityAvatar = ({ userpicUrl, size, id }: IProps) => {
  const toast = useToast();

  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    event.preventDefault();
    toast({
      title: `Address ${shortenAccountId(id, true)} copied to clipboard.`,
      duration: 3000,
      position: 'top',
    });
    copy(id);
    return false;
  };

  return (
    <Box
      cursor={'pointer'}
      data-name="identity-avatar"
      position={'relative'}
      overflow={'hidden'}
      w={`${size}px`}
      h={`${size}px`}
      onClickCapture={onClick}
      borderRadius={'100%'}>
      {userpicUrl ? (
        <Box
          w={'100%'}
          h={'100%'}
          borderRadius={'100%'}
          overflow={'hidden'}
          position={'relative'}
          cursor="copy">
          <Image alt={id} src={userpicUrl} fill style={{
            objectFit: 'cover'
          }} quality={50} />
        </Box>
      ) : (
        <Identicon size={size} value={id} theme="polkadot" />
      )}
    </Box>
  );
};

export default IdentityAvatar;
