import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ZkSyncBatch } from 'types/api/zkSyncL2';

import { layerLabels } from 'lib/rollups/utils';
import { Skeleton } from 'toolkit/chakra/skeleton';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';

interface Props {
  isLoading: boolean;
  data: Pick<
    ZkSyncBatch,
  'commit_transaction_hash' |
  'commit_transaction_timestamp' |
  'prove_transaction_hash' |
  'prove_transaction_timestamp' |
  'execute_transaction_hash' |
  'execute_transaction_timestamp'
  >;
}

const ZkSyncL2TxnBatchHashesInfo = ({ isLoading, data }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('txnBatches.commitTxHashHint', { parent: layerLabels.parent }) }
        isLoading={ isLoading }
      >
        { t('txnBatches.commitTxHashLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow >
        { data.commit_transaction_hash ? (
          <>
            <TxEntityL1
              isLoading={ isLoading }
              hash={ data.commit_transaction_hash }
              maxW="100%"
            />
            { data.commit_transaction_timestamp && (
              <DetailedInfoTimestamp timestamp={ data.commit_transaction_timestamp } isLoading={ isLoading }/>
            ) }
          </>
        ) : <Skeleton loading={ isLoading }>{ t('txnBatches.pending') }</Skeleton> }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('txnBatches.proveTxHashHint', { parent: layerLabels.parent }) }
        isLoading={ isLoading }
      >
        { t('txnBatches.proveTxHashLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        { data.prove_transaction_hash ? (
          <>
            <TxEntityL1
              isLoading={ isLoading }
              hash={ data.prove_transaction_hash }
              maxW="100%"
            />
            { data.prove_transaction_timestamp && (
              <DetailedInfoTimestamp timestamp={ data.prove_transaction_timestamp } isLoading={ isLoading }/>
            ) }
          </>
        ) : <Skeleton loading={ isLoading }>{ t('txnBatches.pending') }</Skeleton> }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('txnBatches.executeTxHashHint', { parent: layerLabels.parent }) }
        isLoading={ isLoading }
      >
        { t('txnBatches.executeTxHashLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        { data.execute_transaction_hash ? (
          <>
            <TxEntityL1
              isLoading={ isLoading }
              hash={ data.execute_transaction_hash }
              maxW="100%"
            />
            { data.execute_transaction_timestamp && (
              <DetailedInfoTimestamp timestamp={ data.execute_transaction_timestamp } isLoading={ isLoading }/>
            ) }
          </>
        ) : <Skeleton loading={ isLoading }>{ t('txnBatches.pending') }</Skeleton> }
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(ZkSyncL2TxnBatchHashesInfo);
