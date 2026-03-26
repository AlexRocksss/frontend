import { Box, Separator, Flex, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { NavLink } from './types';
import type { UserInfo } from 'types/api/account';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { useMarketplaceContext } from 'lib/contexts/marketplace';
import shortenString from 'lib/shortenString';
import { Button } from 'toolkit/chakra/button';
import { Link } from 'toolkit/chakra/link';
import { Hint } from 'toolkit/components/Hint/Hint';
import { TruncatedText } from 'toolkit/components/truncation/TruncatedText';
import useLogout from 'ui/snippets/auth/useLogout';

import UserWalletAutoConnectAlert from '../../UserWalletAutoConnectAlert';
import UserProfileContentWallet from '../common/UserProfileContentWallet';
import UserProfileContentNavLink from './UserProfileContentNavLink';

interface Props {
  data: UserInfo | undefined;
  onClose: () => void;
  onLogin: () => void;
  onAddEmail: () => void;
  onAddAddress: () => void;
}

const UserProfileContent = ({ data, onClose, onLogin, onAddEmail, onAddAddress }: Props) => {
  const { t } = useTranslation();
  const { isAutoConnectDisabled } = useMarketplaceContext();
  const logout = useLogout();

  const navLinks: Array<NavLink> = [
    {
      text: t('userProfile.myProfile'),
      href: route({ pathname: '/auth/profile' }),
      icon: 'profile' as const,
    },
    {
      text: t('userProfile.watchList'),
      href: route({ pathname: '/account/watchlist' }),
      icon: 'star_outline' as const,
    },
    {
      text: t('userProfile.privateTags'),
      href: route({ pathname: '/account/tag-address' }),
      icon: 'private_tags' as const,
    },
    {
      text: t('userProfile.apiKeys'),
      href: route({ pathname: '/account/api-key' }),
      icon: 'API' as const,
    },
    {
      text: t('userProfile.customAbi'),
      href: route({ pathname: '/account/custom-abi' }),
      icon: 'ABI' as const,
    },
    config.features.addressVerification.isEnabled && {
      text: t('userProfile.verifiedAddrs'),
      href: route({ pathname: '/account/verified-addresses' }),
      icon: 'verified' as const,
    },
  ].filter(Boolean) as Array<NavLink>;

  const handleLogoutClick = React.useCallback(() => {
    logout();
    onClose();
  }, [ logout, onClose ]);

  if (!data) {
    return (
      <Box>
        { isAutoConnectDisabled && <UserWalletAutoConnectAlert/> }
        { config.features.blockchainInteraction.isEnabled && <UserProfileContentWallet onClose={ onClose }/> }
        <Button mt={ 3 } onClick={ onLogin } size="sm" w="100%">{ t('userProfile.logIn') }</Button>
      </Box>
    );
  }

  return (
    <Box>
      { isAutoConnectDisabled && <UserWalletAutoConnectAlert/> }

      <Box textStyle="xs" fontWeight="500" px={ 1 } mb="1">{ t('userProfile.account') }</Box>
      <Box
        textStyle="xs"
        fontWeight="500"
        borderColor="border.divider"
        borderWidth="1px"
        borderRadius="base"
        color="text.secondary"
      >
        { config.features.blockchainInteraction.isEnabled && (
          <Flex p={ 2 } borderColor="border.divider" borderBottomWidth="1px">
            <Box>{ t('userProfile.address') }</Box>
            <Hint
              label={ t('userProfile.addressHint') + (config.features.rewards.isEnabled ? ' ' + t('userProfile.addressHintMerits') : '') } // eslint-disable-line max-len
              boxSize={ 4 }
              ml={ 1 }
            />
            { data?.address_hash ?
              <Box ml="auto">{ shortenString(data?.address_hash) }</Box> : <Link ml="auto" onClick={ onAddAddress }>{ t('userProfile.addAddress') }</Link> }
          </Flex>
        ) }
        <Flex p={ 2 } columnGap={ 4 }>
          <Box mr="auto">{ t('userProfile.email') }</Box>
          { data?.email ?
            <TruncatedText text={ data.email }/> : <Link onClick={ onAddEmail }>{ t('userProfile.addEmail') }</Link> }
        </Flex>
      </Box>

      { config.features.blockchainInteraction.isEnabled && <UserProfileContentWallet onClose={ onClose } mt={ 3 }/> }

      <VStack as="ul" gap="0" alignItems="flex-start" overflow="hidden" mt={ 4 }>
        { navLinks.map((item) => (
          <UserProfileContentNavLink
            key={ item.text }
            { ...item }
            onClick={ onClose }
          />
        )) }
      </VStack>

      <Separator my={ 1 }/>

      <UserProfileContentNavLink
        text={ t('userProfile.signOut') }
        icon="sign_out"
        onClick={ handleLogoutClick }
      />
    </Box>
  );
};

export default React.memo(UserProfileContent);
