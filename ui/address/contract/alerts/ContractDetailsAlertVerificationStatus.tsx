import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Address } from 'types/api/address';
import type { SmartContract } from 'types/api/contract';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';

import ContractDetailsVerificationButton from '../ContractDetailsVerificationButton';

interface Props {
  data: SmartContract | undefined;
  isLoading: boolean;
  addressData: Address;
}

const ContractDetailsAlertVerificationStatus = ({ data, isLoading, addressData }: Props) => {
  const { t } = useTranslation();
  if (!data || !data.is_verified) {
    return null;
  }

  const sourceElement = (() => {
    if (data?.is_verified_via_eth_bytecode_db) {
      return (
        <>
          <span>{ data.is_partially_verified ? t('address.contractPartiallyVerifiedViaDb') : t('address.contractVerifiedViaDb') }</span>
          <Link
            href="https://docs.blockscout.com/devs/verification/ethereum-bytecode-database-microservice"
            external
          >
            Blockscout Bytecode Database
          </Link>
        </>
      );
    }

    if (data?.is_verified_via_sourcify) {
      return (
        <>
          <span>{ data.is_partially_verified ? t('address.contractPartiallyVerifiedViaSourcify') : t('address.contractVerifiedViaSourcify') }</span>
          { data.sourcify_repo_url && <Link href={ data.sourcify_repo_url } textStyle="md" external>{ t('address.viewInSourcifyRepo') }</Link> }
        </>
      );
    }

    return null;
  })();

  if (!data.is_partially_verified) {
    return (
      <Alert status="success" loading={ isLoading } descriptionProps={{ whiteSpace: 'pre-wrap' }}>
        <span>{ t('address.contractVerifiedExact') }{ sourceElement ? '. ' : '' }</span>
        { sourceElement }
      </Alert>
    );
  }

  return (
    <Alert status="success" loading={ isLoading } descriptionProps={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 2, columnGap: 3 }}>
      <span>{ data.is_partially_verified ? t('address.contractVerifiedPartial') : t('address.contractVerifiedExact') }{ sourceElement ? '.' : '' }</span>
      <ContractDetailsVerificationButton
        isLoading={ isLoading }
        addressHash={ addressData.hash }
      />
      { sourceElement && <Box w="100%">{ sourceElement }</Box> }
    </Alert>
  );
};

export default React.memo(ContractDetailsAlertVerificationStatus);
