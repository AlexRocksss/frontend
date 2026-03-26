import { HStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TxAuthorization } from 'types/api/transaction';

import config from 'configs/app';
import { Skeleton } from 'toolkit/chakra/skeleton';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import ListItemMobile from 'ui/shared/ListItemMobile/ListItemMobile';
import TxAuthorizationStatus from 'ui/shared/statusTag/TxAuthorizationStatus';

interface Props extends TxAuthorization {
  isLoading?: boolean;
}

const TxAuthorizationsListItem = ({ address_hash: addressHash, authority, chain_id: chainId, nonce, isLoading, status }: Props) => {
  const { t } = useTranslation();
  return (
    <ListItemMobile rowGap={ 3 } fontSize="sm">
      <HStack gap={ 3 } w="100%">
        <Skeleton loading={ isLoading } fontWeight={ 500 }>{ t('tx.authority') }</Skeleton>
        <AddressEntity address={{ hash: authority }} isLoading={ isLoading } noIcon/>
      </HStack>
      <HStack gap={ 3 } w="100%">
        <Skeleton loading={ isLoading } fontWeight={ 500 } flexShrink={ 0 }>{ t('tx.delegatedAddress') }</Skeleton>
        <AddressEntity address={{ hash: addressHash }} isLoading={ isLoading } noIcon/>
      </HStack>
      <HStack gap={ 3 }>
        <Skeleton loading={ isLoading } fontWeight={ 500 }>{ t('tx.chain') }</Skeleton>
        <Skeleton loading={ isLoading } color="text.secondary">{ chainId === Number(config.chain.id) ? 'this' : 'any' }</Skeleton>
      </HStack>
      <HStack gap={ 3 }>
        <Skeleton loading={ isLoading } fontWeight={ 500 }>{ t('tx.noncePrefixed') }</Skeleton>
        <Skeleton loading={ isLoading } color="text.secondary">{ nonce }</Skeleton>
      </HStack>
      <HStack gap={ 3 }>
        <Skeleton loading={ isLoading } fontWeight={ 500 }>{ t('tx.status') }</Skeleton>
        <TxAuthorizationStatus status={ status } loading={ isLoading }/>
      </HStack>
    </ListItemMobile>
  );
};

export default TxAuthorizationsListItem;
