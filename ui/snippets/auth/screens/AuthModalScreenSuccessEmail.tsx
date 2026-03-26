import { chakra, Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Screen } from '../types';
import type { UserInfo } from 'types/api/account';

import config from 'configs/app';
import { Button } from 'toolkit/chakra/button';

interface Props {
  email: string;
  onConnectWallet: (screen: Screen) => void;
  onClose: () => void;
  isAuth?: boolean;
  profile: UserInfo | undefined;
}

const AuthModalScreenSuccessEmail = ({ email, onConnectWallet, onClose, isAuth, profile }: Props) => {
  const { t } = useTranslation();
  const handleConnectWalletClick = React.useCallback(() => {
    onConnectWallet({ type: 'connect_wallet', isAuth: true, loginToRewards: true });
  }, [ onConnectWallet ]);

  if (isAuth) {
    return (
      <Box>
        <Text>
          { t('auth.linkedToEmail_pre') }{ ' ' }
          <chakra.span fontWeight="700">{ email }</chakra.span>{ ' ' }
          { t('auth.linkedToEmail_post') }
        </Text>
        <Button
          mt={ 6 }
          variant="outline"
          onClick={ onClose }
        >
          { t('auth.gotIt') }
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Text>
        <chakra.span fontWeight="700">{ email }</chakra.span>{ ' ' }
        { t('auth.emailUsedToLogin_post') }
      </Text>
      { !profile?.address_hash && config.features.blockchainInteraction.isEnabled ? (
        <>
          <Text mt={ 6 }>{ t('auth.addWeb3Wallet') }</Text>
          <Button mt={ 6 } onClick={ handleConnectWalletClick }>{ t('auth.connectWalletBtn') }</Button>
        </>
      ) : (
        <Button
          variant="outline"
          mt={ 6 }
          onClick={ onClose }
        >
          { t('auth.gotIt') }
        </Button>
      ) }
    </Box>
  );
};

export default React.memo(AuthModalScreenSuccessEmail);
