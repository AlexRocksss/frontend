import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { SmartContractCreationStatus } from 'types/api/contract';

import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import ContractCreationStatus from 'ui/shared/statusTag/ContractCreationStatus';

import ContractDetailsInfoItem from './ContractDetailsInfoItem';

interface Props {
  addressHash: string;
  txHash: string;
  creationStatus: SmartContractCreationStatus | null;
  isLoading: boolean;
}

const ContractDetailsInfoCreator = ({ addressHash, txHash, creationStatus, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <ContractDetailsInfoItem
      label={ t('address.contractInfoCreator') }
      isLoading={ isLoading }
      contentProps={{ gridColumn: { lg: '2 / span 3' } }}
    >
      <Flex alignItems="center" flexWrap="wrap" columnGap={ 2 } rowGap={ 2 }>
        <AddressEntity
          address={{ hash: addressHash }}
          truncation="constant"
          noIcon
        />
        { t('address.contractInfoAtTxn') }
        <TxEntity hash={ txHash } truncation="constant" noIcon/>
        { creationStatus && <ContractCreationStatus status={ creationStatus }/> }
      </Flex>
    </ContractDetailsInfoItem>
  );
};

export default React.memo(ContractDetailsInfoCreator);
