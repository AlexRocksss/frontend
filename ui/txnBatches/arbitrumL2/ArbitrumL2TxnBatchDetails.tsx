import { GridItem } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import type { ArbitrumL2TxnBatch } from 'types/api/arbitrumL2';

import { route } from 'nextjs-routes';

import type { ResourceError } from 'lib/api/resources';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import { layerLabels } from 'lib/rollups/utils';
import { CollapsibleDetails } from 'toolkit/chakra/collapsible';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import isCustomAppError from 'ui/shared/AppError/isCustomAppError';
import ArbitrumL2TxnBatchDA from 'ui/shared/batch/ArbitrumL2TxnBatchDA';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import BlockEntityL1 from 'ui/shared/entities/block/BlockEntityL1';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import PrevNext from 'ui/shared/PrevNext';

import ArbitrumL2TxnBatchDetailsAnyTrustDA from './ArbitrumL2TxnBatchDetailsAnyTrustDA';
import ArbitrumL2TxnBatchDetailsCelestiaDA from './ArbitrumL2TxnBatchDetailsCelestiaDA';

interface Props {
  query: UseQueryResult<ArbitrumL2TxnBatch, ResourceError>;
}

const ArbitrumL2TxnBatchDetails = ({ query }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isPlaceholderData, isError, error } = query;

  const handlePrevNextClick = React.useCallback((direction: 'prev' | 'next') => {
    if (!data) {
      return;
    }

    const increment = direction === 'next' ? +1 : -1;
    const nextId = String(data.number + increment);

    router.push({ pathname: '/batches/[number]', query: { number: nextId } }, undefined);
  }, [ data, router ]);

  if (isError) {
    if (isCustomAppError(error)) {
      throwOnResourceLoadError({ isError, error });
    }

    return <DataFetchAlert/>;
  }

  if (!data) {
    return null;
  }

  const blocksCount = data.end_block_number - data.start_block_number + 1;

  return (
    <DetailedInfo.Container
      templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(min-content, 200px) minmax(0, 1fr)' }}
    >
      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={ t('txnBatches.batchNumberHint', { current: layerLabels.current, parent: layerLabels.parent }) }
      >
        { t('txnBatches.batchNumberLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { data.number }
        </Skeleton>
        <PrevNext
          ml={ 6 }
          onClick={ handlePrevNextClick }
          prevLabel={ t('txnBatches.prevBatchLabel') }
          nextLabel={ t('txnBatches.nextBatchLabel') }
          isPrevDisabled={ data.number === 0 }
          isLoading={ isPlaceholderData }
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={ t('txnBatches.timestampHint', { parent: layerLabels.parent }) }
      >
        { t('txnBatches.timestampLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        { data.commitment_transaction.timestamp ?
          <DetailedInfoTimestamp timestamp={ data.commitment_transaction.timestamp } isLoading={ isPlaceholderData }/> :
          t('txnBatches.undefined')
        }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={ t('txnBatches.transactionsHint') }
      >
        { t('txnBatches.transactionsLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Link loading={ isPlaceholderData } href={ route({ pathname: '/batches/[number]', query: { number: data.number.toString(), tab: 'txs' } }) }>
          { data.transactions_count.toLocaleString() } transaction{ data.transactions_count === 1 ? '' : 's' }
        </Link>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={ t('txnBatches.blocksHint', { current: layerLabels.current }) }
      >
        { t('txnBatches.blocksLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Link loading={ isPlaceholderData } href={ route({ pathname: '/batches/[number]', query: { number: data.number.toString(), tab: 'blocks' } }) }>
          { blocksCount.toLocaleString() } block{ blocksCount === 1 ? '' : 's' }
        </Link>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={ t('txnBatches.parentTxHashHint', { parent: layerLabels.parent }) }
      >
        { t('txnBatches.parentTxHashLabel', { parent: layerLabels.parent }) }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <TxEntityL1
          isLoading={ isPlaceholderData }
          hash={ data.commitment_transaction.hash }
          maxW="100%"
          noCopy
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={ t('txnBatches.parentBlockHint', { parent: layerLabels.parent }) }
      >
        { t('txnBatches.parentBlockLabel', { parent: layerLabels.parent }) }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <BlockEntityL1
          isLoading={ isPlaceholderData }
          number={ data.commitment_transaction.block_number }
        />
      </DetailedInfo.ItemValue>

      { data.data_availability.batch_data_container && (
        <>
          <DetailedInfo.ItemLabel
            isLoading={ isPlaceholderData }
            hint={ t('txnBatches.batchDataContainerHint') }
          >
            { t('txnBatches.batchDataContainerLabel') }
          </DetailedInfo.ItemLabel><DetailedInfo.ItemValue>
            <ArbitrumL2TxnBatchDA dataContainer={ data.data_availability.batch_data_container } isLoading={ isPlaceholderData }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={ t('txnBatches.beforeAccHint') }
      >
        { t('txnBatches.beforeAccLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue flexWrap="nowrap" >
        <Skeleton loading={ isPlaceholderData } overflow="hidden">
          <HashStringShortenDynamic hash={ data.before_acc_hash }/>
        </Skeleton>
        <CopyToClipboard text={ data.before_acc_hash } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
        hint={ t('txnBatches.afterAccHint') }
      >
        { t('txnBatches.afterAccLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue flexWrap="nowrap">
        <Skeleton loading={ isPlaceholderData } overflow="hidden">
          <HashStringShortenDynamic hash={ data.after_acc_hash }/>
        </Skeleton>
        <CopyToClipboard text={ data.after_acc_hash } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      { (data.data_availability.batch_data_container === 'in_anytrust' || data.data_availability.batch_data_container === 'in_celestia') && (
        <CollapsibleDetails
          loading={ isPlaceholderData }
          mt={ 6 }
          gridColumn={{ base: undefined, lg: '1 / 3' }}
          text={ [ t('txnBatches.showDataAvailability'), t('txnBatches.hideDataAvailability') ] }
        >
          <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>

          { data.data_availability.batch_data_container === 'in_anytrust' && (
            <ArbitrumL2TxnBatchDetailsAnyTrustDA data={ data.data_availability }/>
          ) }
          { data.data_availability.batch_data_container === 'in_celestia' && (
            <ArbitrumL2TxnBatchDetailsCelestiaDA data={ data.data_availability }/>
          ) }
        </CollapsibleDetails>
      ) }
    </DetailedInfo.Container>
  );
};

export default ArbitrumL2TxnBatchDetails;
