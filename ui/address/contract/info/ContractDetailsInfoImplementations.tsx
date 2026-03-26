import { useTranslation } from 'next-i18next';
import React from 'react';

import type { AddressImplementation } from 'types/api/addressParams';
import type { SmartContractProxyType } from 'types/api/contract';

import ContainerWithScrollY from 'ui/shared/ContainerWithScrollY';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';

import ContractDetailsInfoItem from './ContractDetailsInfoItem';

interface Props {
  implementations: Array<AddressImplementation>;
  proxyType?: SmartContractProxyType;
}

const ContractDetailsInfoImplementations = ({ implementations, proxyType }: Props) => {
  const { t } = useTranslation();
  const implLabel = implementations.length > 1 ? t('address.contractInfoImplementations') : t('address.contractInfoImplementation');
  const label = proxyType === 'eip7702' ? t('address.contractInfoDelegatedTo') : implLabel;
  return (
    <ContractDetailsInfoItem
      label={ label }
      contentProps={{ gridColumn: { lg: '2 / span 3' }, position: 'relative' }}
    >
      <ContainerWithScrollY gradientHeight={ 48 } maxH="200px" w="100%">
        { implementations.map((item) => (
          <AddressEntity
            key={ item.address_hash }
            address={{
              hash: item.address_hash,
              filecoin: { robust: item.filecoin_robust_address },
              name: item.name,
              is_contract: true,
            }}
            noIcon
          />
        )) }
      </ContainerWithScrollY>
    </ContractDetailsInfoItem>
  );
};

export default React.memo(ContractDetailsInfoImplementations);
