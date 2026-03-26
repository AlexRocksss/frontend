import type { ButtonProps } from '@chakra-ui/react';
import { Box, HStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import useIsMobile from 'lib/hooks/useIsMobile';
import shortenString from 'lib/shortenString';
import { Button } from 'toolkit/chakra/button';
import { Tooltip } from 'toolkit/chakra/tooltip';

import UserIdenticon from '../UserIdenticon';

interface Props {
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  isPending?: boolean;
  isAutoConnectDisabled?: boolean;
  address?: string;
  domain?: string;
}

const UserWalletButton = ({ size, variant, isPending, isAutoConnectDisabled, address, domain, ...rest }: Props, ref: React.ForwardedRef<HTMLButtonElement>) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const content = (() => {
    if (!address) {
      return t('userProfile.connect');
    }

    const text = domain || shortenString(address);

    return (
      <HStack gap={ 2 }>
        <UserIdenticon address={ address } isAutoConnectDisabled={ isAutoConnectDisabled }/>
        <Box display={{ base: 'none', md: 'block' }}>{ text }</Box>
      </HStack>
    );
  })();

  return (
    <Tooltip
      content={ t('userProfile.walletConnectTooltip') }
      disabled={ isMobile || Boolean(address) }
      openDelay={ 500 }
      disableOnMobile
    >
      <span>
        <Button
          ref={ ref }
          size={ size }
          variant={ variant }
          selected={ Boolean(address) }
          highlighted={ isAutoConnectDisabled }
          px={{ base: 2.5, lg: 3 }}
          fontWeight={ address ? 700 : 600 }
          loading={ isPending }
          loadingText={ isMobile ? undefined : t('userProfile.connecting') }
          { ...rest }
        >
          { content }
        </Button>
      </span>
    </Tooltip>
  );
};

export default React.memo(React.forwardRef(UserWalletButton));
