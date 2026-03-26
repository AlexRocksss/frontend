import { Box, Text, Flex } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Transaction } from 'types/api/transaction';

import { route } from 'nextjs/routes';

import config from 'configs/app';
import { useMultichainContext } from 'lib/contexts/multichain';
import { currencyUnits } from 'lib/units';
import { Link } from 'toolkit/chakra/link';
import BlobEntity from 'ui/shared/entities/blob/BlobEntity';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import TextSeparator from 'ui/shared/TextSeparator';
import TxFee from 'ui/shared/tx/TxFee';
import Utilization from 'ui/shared/Utilization/Utilization';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';

const TxAdditionalInfoContent = ({ tx }: { tx: Transaction }) => {
  const { t } = useTranslation();
  const multichainContext = useMultichainContext();

  const sectionProps = {
    borderBottom: '1px solid',
    borderColor: 'border.divider',
    paddingBottom: 4,
  };

  const sectionTitleProps = {
    color: 'text.secondary',
    fontWeight: 600,
    marginBottom: 3,
  };

  return (
    <>
      <TxStatus status={ tx.status } errorText={ tx.status === 'error' ? tx.result : undefined } mb={ 3 }/>
      { tx.blob_versioned_hashes && tx.blob_versioned_hashes.length > 0 && (
        <Box { ...sectionProps } mb={ 4 }>
          <Flex alignItems="center" justifyContent="space-between">
            <Text { ...sectionTitleProps }>{ t('tx.blobsCount', { count: tx.blob_versioned_hashes.length }) }</Text>
            { tx.blob_versioned_hashes.length > 3 && (
              <Link
                href={ route({ pathname: '/tx/[hash]', query: { hash: tx.hash, tab: 'blobs' } }) }
                mb={ 3 }
              >
                view all
              </Link>
            ) }
          </Flex>
          <Flex flexDir="column" rowGap={ 3 }>
            { tx.blob_versioned_hashes.slice(0, 3).map((hash, index) => (
              <Flex key={ hash } columnGap={ 2 }>
                <Box fontWeight={ 500 }>{ index + 1 }</Box>
                <BlobEntity hash={ hash } noIcon/>
              </Flex>
            )) }
          </Flex>
        </Box>
      ) }
      <Box { ...sectionProps } mb={ 4 }>
        <Text { ...sectionTitleProps }>{ t('tx.value') }</Text>
        <NativeCoinValue
          amount={ tx.value }
          exchangeRate={ tx.exchange_rate }
          historicalExchangeRate={ tx.historic_exchange_rate }
          noTooltip
        />
      </Box>
      { !config.UI.views.tx.hiddenFields?.tx_fee && (tx.stability_fee !== undefined || tx.fee.value !== null) && (
        <Box { ...sectionProps } mb={ 4 }>
          <Text { ...sectionTitleProps }>{ t('tx.transactionFee') }</Text>
          <TxFee tx={ tx } rowGap={ 0 } noTooltip/>
        </Box>
      ) }
      { tx.gas_used !== null && (
        <Box { ...sectionProps } mb={ 4 }>
          <Text { ...sectionTitleProps }>{ t('tx.gasLimitAndUsage') }</Text>
          <Flex>
            <Text>{ BigNumber(tx.gas_used).toFormat() }</Text>
            <TextSeparator/>
            <Text>{ BigNumber(tx.gas_limit).toFormat() }</Text>
            <Utilization ml={ 4 } value={ Number(BigNumber(tx.gas_used).dividedBy(BigNumber(tx.gas_limit)).toFixed(2)) }/>
          </Flex>
        </Box>
      ) }
      { !config.UI.views.tx.hiddenFields?.gas_fees &&
        (tx.base_fee_per_gas !== null || tx.max_fee_per_gas !== null || tx.max_priority_fee_per_gas !== null) && (
        <Box { ...sectionProps } mb={ 4 }>
          <Text { ...sectionTitleProps }>{ t('tx.gasFees', { gwei: currencyUnits.gwei }) }</Text>
          { tx.base_fee_per_gas !== null && (
            <Box>
              <Text as="span" fontWeight="500">{ t('tx.base') }</Text>
              <NativeCoinValue
                amount={ tx.base_fee_per_gas }
                units="gwei"
                unitsTooltip="wei"
                noSymbol
                fontWeight="700"
              />
            </Box>
          ) }
          { tx.max_fee_per_gas !== null && (
            <Box mt={ 1 }>
              <Text as="span" fontWeight="500">{ t('tx.max') }</Text>
              <NativeCoinValue
                amount={ tx.max_fee_per_gas }
                units="gwei"
                unitsTooltip="wei"
                noSymbol
                fontWeight="700"
              />
            </Box>
          ) }
          { tx.max_priority_fee_per_gas !== null && (
            <Box mt={ 1 }>
              <Text as="span" fontWeight="500">{ t('tx.maxPriority') }</Text>
              <NativeCoinValue
                amount={ tx.max_priority_fee_per_gas }
                units="gwei"
                unitsTooltip="wei"
                noSymbol
                fontWeight="700"
              />
            </Box>
          ) }
        </Box>
      ) }
      { !(tx.blob_versioned_hashes && tx.blob_versioned_hashes.length > 0) && (
        <Box { ...sectionProps } mb={ 4 }>
          <Text { ...sectionTitleProps }>{ t('tx.others') }</Text>
          <Box>
            <Text as="span" fontWeight="500">{ t('tx.txnType') }</Text>
            <Text fontWeight="600" as="span">{ tx.type }</Text>
            { tx.type === 2 && <Text fontWeight="400" as="span" ml={ 1 } color="text.secondary">(EIP-1559)</Text> }
          </Box>
          <Box mt={ 1 }>
            <Text as="span" fontWeight="500">{ t('tx.noncePrefixed') }</Text>
            <Text fontWeight="600" as="span">{ tx.nonce }</Text>
          </Box>
          <Box mt={ 1 }>
            <Text as="span" fontWeight="500">{ t('tx.positionPrefixed') }</Text>
            <Text fontWeight="600" as="span">{ tx.position }</Text>
          </Box>
        </Box>
      ) }
      <Link href={ route({ pathname: '/tx/[hash]', query: { hash: tx.hash } }, multichainContext) }>{ t('tx.moreDetails') }</Link>
    </>
  );
};

export default React.memo(TxAdditionalInfoContent);
