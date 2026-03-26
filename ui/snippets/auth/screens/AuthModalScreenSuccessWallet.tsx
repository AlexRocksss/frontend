import { chakra, Box, Text, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Screen } from '../types';
import type { UserInfo } from 'types/api/account';

import config from 'configs/app';
import shortenString from 'lib/shortenString';
import { Button } from 'toolkit/chakra/button';

interface Props {
  address: string;
  onAddEmail: (screen: Screen) => void;
  onClose: () => void;
  isAuth?: boolean;
  profile: UserInfo | undefined;
  rewardsToken?: string;
}

const AuthModalScreenSuccessWallet = ({ address, onAddEmail, onClose, isAuth, profile, rewardsToken }: Props) => {
  const { t } = useTranslation();
  const handleAddEmailClick = React.useCallback(() => {
    onAddEmail({ type: 'email', isAuth: true });
  }, [ onAddEmail ]);

  if (isAuth) {
    return (
      <Box>
        <Text>
          { t('auth.linkedToWallet_pre') }{ ' ' }
          <chakra.span fontWeight="700">{ shortenString(address) }</chakra.span>{ ' ' }
          { t('auth.linkedToWallet_post') }
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
        { t('auth.walletLoggedIn_pre') }{ ' ' }
        <chakra.span fontWeight="700">{ shortenString(address) }</chakra.span>{ ' ' }
        { t('auth.walletLoggedIn_post') }
        { Boolean(rewardsToken) && ` ${ t('auth.walletLoggedIn_merits') }` }.
      </Text>
      { !profile?.email ? (
        <>
          <Text mt={ 6 }>
            { t('auth.addEmailDesc_pre') } { config.features.rewards.isEnabled ? t('auth.addEmailDesc_merits') + ' ' : ' ' }
            { t('auth.addEmailDesc_post') }
          </Text>
          <Flex mt={ 6 } gap={ 6 }>
            <Button onClick={ handleAddEmailClick }>{ t('auth.addEmailBtn') }</Button>
            <Button variant="link" onClick={ onClose }>{ t('auth.doItLater') }</Button>
          </Flex>
        </>
      ) : (
        <Button
          mt={ 6 }
          variant="outline"
          onClick={ onClose }
        >
          { t('auth.gotIt') }
        </Button>
      ) }
    </Box>
  );
};

export default React.memo(AuthModalScreenSuccessWallet);
