import { Box, Text } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { UserInfo } from 'types/api/account';

import config from 'configs/app';
import { Button } from 'toolkit/chakra/button';
import { Heading } from 'toolkit/chakra/heading';
import { Link } from 'toolkit/chakra/link';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';

interface Props {
  profileQuery: UseQueryResult<UserInfo, unknown>;
  onAddWallet: () => void;
}

const MyProfileWallet = ({ profileQuery, onAddWallet }: Props) => {
  const { t } = useTranslation();

  return (
    <section>
      <Heading level="2" mb={ 3 }>{ t('myProfile.linkedWallet') }</Heading>
      <Text mb={ 3 } >
        { t('myProfile.walletUsedForLogin') }{ ' ' }
        { config.features.rewards.isEnabled && (
          <>
            { t('myProfile.andParticipation') }
            <Link external href="https://docs.blockscout.com/using-blockscout/merits" ml={ 1 }>
              { t('myProfile.learnMore') }
            </Link>
          </>
        ) }
      </Text>
      { profileQuery.data?.address_hash ? (
        <Box px={ 3 } py="18px" bgColor={{ _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' }} borderRadius="base">
          <AddressEntity
            address={{ hash: profileQuery.data.address_hash }}
            fontWeight="500"
            noAltHash
          />
        </Box>
      ) : <Button size="sm" onClick={ onAddWallet }>{ t('myProfile.linkWallet') }</Button> }
    </section>
  );
};

export default React.memo(MyProfileWallet);
