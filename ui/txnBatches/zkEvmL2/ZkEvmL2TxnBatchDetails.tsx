import { Text } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import { ZKEVM_L2_TX_BATCH_STATUSES } from 'types/api/zkEvmL2';
import type { ZkEvmL2TxnBatch } from 'types/api/zkEvmL2';

import { route } from 'nextjs-routes';

import type { ResourceError } from 'lib/api/resources';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import { formatZkEvmL2TxnBatchStatus } from 'lib/rollups/utils';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import isCustomAppError from 'ui/shared/AppError/isCustomAppError';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import PrevNext from 'ui/shared/PrevNext';
import VerificationSteps from 'ui/shared/verificationSteps/VerificationSteps';

const verificationSteps = ZKEVM_L2_TX_BATCH_STATUSES.map(formatZkEvmL2TxnBatchStatus);

interface Props {
  query: UseQueryResult<ZkEvmL2TxnBatch, ResourceError>;
}

const ZkEvmL2TxnBatchDetails = ({ query }: Props) => {
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

  return (
    <DetailedInfo.Container
      templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(min-content, 200px) minmax(0, 1fr)' }}
    >
      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
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
      >
        { t('txnBatches.statusLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <VerificationSteps
          steps={ verificationSteps }
          currentStep={ formatZkEvmL2TxnBatchStatus(data.status) }
          isLoading={ isPlaceholderData }
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
      >
        { t('txnBatches.timestampLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        { data.timestamp ? <DetailedInfoTimestamp timestamp={ data.timestamp } isLoading={ isPlaceholderData }/> : t('txnBatches.undefined') }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
      >
        { t('txnBatches.verifyTxHashLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        { data.verify_transaction_hash ? (
          <TxEntityL1
            isLoading={ isPlaceholderData }
            hash={ data.verify_transaction_hash }
            maxW="100%"
            noCopy
          />
        ) : <Text>{ t('txnBatches.pending') }</Text> }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
      >
        { t('txnBatches.transactionsLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          <Link href={ route({ pathname: '/batches/[number]', query: { number: data.number.toString(), tab: 'txs' } }) }>
            { data.transactions.length } transaction{ data.transactions.length === 1 ? '' : 's' }
          </Link>
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemDivider/>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
      >
        { t('txnBatches.globalExitRootLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue
        flexWrap="nowrap"
      >
        <Skeleton loading={ isPlaceholderData } overflow="hidden">
          <HashStringShortenDynamic hash={ data.global_exit_root }/>
        </Skeleton>
        <CopyToClipboard text={ data.global_exit_root } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
      >
        { t('txnBatches.accInputHashLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue
        flexWrap="nowrap"
      >
        <Skeleton loading={ isPlaceholderData } overflow="hidden">
          <HashStringShortenDynamic hash={ data.acc_input_hash }/>
        </Skeleton>
        <CopyToClipboard text={ data.acc_input_hash } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
      >
        { t('txnBatches.sequenceTxHashLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        { data.sequence_transaction_hash ? (
          <TxEntityL1
            isLoading={ isPlaceholderData }
            hash={ data.sequence_transaction_hash }
            maxW="100%"
            noCopy
          />
        ) : <Text>{ t('txnBatches.pending') }</Text> }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        isLoading={ isPlaceholderData }
      >
        { t('txnBatches.stateRootLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue
        flexWrap="nowrap"
      >
        <Skeleton loading={ isPlaceholderData } overflow="hidden">
          <HashStringShortenDynamic hash={ data.state_root }/>
        </Skeleton>
        <CopyToClipboard text={ data.state_root } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>
    </DetailedInfo.Container>
  );
};

export default ZkEvmL2TxnBatchDetails;
