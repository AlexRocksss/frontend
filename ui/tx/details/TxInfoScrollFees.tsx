import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Transaction } from 'types/api/transaction';

import { layerLabels } from 'lib/rollups/utils';
import { Skeleton } from 'toolkit/chakra/skeleton';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoNativeCoinValue from 'ui/shared/DetailedInfo/DetailedInfoNativeCoinValue';
import TextSeparator from 'ui/shared/TextSeparator';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';

type Props = {
  data: Transaction;
  isLoading: boolean;
};

export const TxInfoScrollFees = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      { data.scroll?.l1_fee !== undefined && (
        <>
          <DetailedInfo.ItemLabel

            hint={ t('tx.hintScrollL1DataFee', { parent: layerLabels.parent }) }
            isLoading={ isLoading }
          >
            { t('tx.scrollL1DataFee', { parent: layerLabels.parent }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfoNativeCoinValue
            amount={ data.scroll?.l1_fee }
            exchangeRate={ data.exchange_rate }
            historicalExchangeRate={ data.historic_exchange_rate }
            hasExchangeRateToggle
            loading={ isLoading }
          />
        </>
      ) }

      { data.scroll?.l2_fee !== undefined && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintScrollExecutionFee', { current: layerLabels.current }) }
            isLoading={ isLoading }
          >
            { t('tx.scrollExecutionFee') }
          </DetailedInfo.ItemLabel>
          <DetailedInfoNativeCoinValue
            amount={ data.scroll?.l2_fee.value }
            exchangeRate={ data.exchange_rate }
            historicalExchangeRate={ data.historic_exchange_rate }
            hasExchangeRateToggle
            loading={ isLoading }
          />
        </>
      ) }

      { data.scroll?.l1_fee_commit_scalar !== undefined && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintScrollCommitScalar') }
            isLoading={ isLoading }
          >
            { t('tx.scrollCommitScalar', { parent: layerLabels.parent }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfoNativeCoinValue
            amount={ String(data.scroll?.l1_fee_commit_scalar) }
            exchangeRate={ data.exchange_rate }
            historicalExchangeRate={ data.historic_exchange_rate }
            hasExchangeRateToggle
            loading={ isLoading }
          />
        </>
      ) }

      { data.scroll?.l1_fee_overhead !== undefined && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintScrollFeeOverhead') }
            isLoading={ isLoading }
          >
            { t('tx.scrollFeeOverhead', { parent: layerLabels.parent }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfoNativeCoinValue
            amount={ String(data.scroll?.l1_fee_overhead) }
            exchangeRate={ data.exchange_rate }
            historicalExchangeRate={ data.historic_exchange_rate }
            hasExchangeRateToggle
            loading={ isLoading }
          />
        </>
      ) }
      { (data.scroll?.l1_base_fee !== undefined || data.scroll?.l1_fee_scalar !== undefined) && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.scrollGasFees', { parent: layerLabels.parent }) }
            isLoading={ isLoading }
          >
            { t('tx.scrollGasFees', { parent: layerLabels.parent }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { data.scroll?.l1_base_fee !== undefined && (
              <Skeleton loading={ isLoading }>
                <Text as="span" fontWeight="500">{ t('tx.base') }</Text>
                <NativeCoinValue
                  amount={ String(data.scroll?.l1_base_fee || 0) }
                  units="gwei"
                  unitsTooltip="wei"
                  noSymbol
                  fontWeight="600"
                />
              </Skeleton>
            ) }
            { data.scroll?.l1_fee_scalar !== undefined && (
              <Skeleton loading={ isLoading }>
                <TextSeparator/>
                <Text as="span" fontWeight="500">{ t('tx.scalar') }</Text>
                <NativeCoinValue
                  amount={ String(data.scroll?.l1_fee_scalar || 0) }
                  units="gwei"
                  unitsTooltip="wei"
                  noSymbol
                  fontWeight="600"
                />
              </Skeleton>
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }
      { (data.scroll?.l1_blob_base_fee !== undefined || data.scroll?.l1_fee_blob_scalar !== undefined) && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.scrollBlobFees', { parent: layerLabels.parent }) }
            isLoading={ isLoading }
          >
            { t('tx.scrollBlobFees', { parent: layerLabels.parent }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { data.scroll?.l1_blob_base_fee !== undefined && (
              <Skeleton loading={ isLoading }>
                <Text as="span" fontWeight="500">{ t('tx.base') }</Text>
                <NativeCoinValue
                  amount={ String(data.scroll?.l1_blob_base_fee || 0) }
                  units="gwei"
                  unitsTooltip="wei"
                  noSymbol
                  fontWeight="600"
                />
              </Skeleton>
            ) }
            { data.scroll?.l1_fee_blob_scalar !== undefined && (
              <Skeleton loading={ isLoading }>
                <TextSeparator/>
                <Text as="span" fontWeight="500">{ t('tx.scalar') }</Text>
                <NativeCoinValue
                  amount={ String(data.scroll?.l1_fee_blob_scalar || 0) }
                  units="gwei"
                  unitsTooltip="wei"
                  noSymbol
                  fontWeight="600"
                />
              </Skeleton>
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }
    </>
  );
};

export default TxInfoScrollFees;
