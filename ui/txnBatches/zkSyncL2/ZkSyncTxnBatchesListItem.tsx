import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ZkSyncBatchesItem } from 'types/api/zkSyncL2';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { Link } from 'toolkit/chakra/link';
import BatchEntityL2 from 'ui/shared/entities/block/BatchEntityL2';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';
import ZkSyncL2TxnBatchStatus from 'ui/shared/statusTag/ZkSyncL2TxnBatchStatus';
import TimeWithTooltip from 'ui/shared/time/TimeWithTooltip';

const rollupFeature = config.features.rollup;

type Props = { item: ZkSyncBatchesItem; isLoading?: boolean };

const ZkSyncTxnBatchesListItem = ({ item, isLoading }: Props) => {
  const { t } = useTranslation();
  if (!rollupFeature.isEnabled || rollupFeature.type !== 'zkSync') {
    return null;
  }

  return (
    <ListItemMobileGrid.Container gridTemplateColumns="110px auto">

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('txnBatches.batchNoHeader') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <BatchEntityL2
          isLoading={ isLoading }
          number={ item.number }
          textStyle="sm"
          fontWeight={ 600 }
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('txnBatches.statusHeader') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <ZkSyncL2TxnBatchStatus status={ item.status } isLoading={ isLoading }/>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('txnBatches.ageHeader') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TimeWithTooltip
          timestamp={ item.timestamp }
          fallbackText={ t('txnBatches.undefined') }
          isLoading={ isLoading }
          display="inline-block"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('txnBatches.txnCountHeader') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Link
          href={ route({ pathname: '/batches/[number]', query: { number: item.number.toString(), tab: 'txs' } }) }
          loading={ isLoading }
          fontWeight={ 600 }
          minW="40px"
        >
          { item.transactions_count }
        </Link>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('txnBatches.commitTxHeader') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        { item.commit_transaction_hash ? (
          <TxEntityL1
            isLoading={ isLoading }
            hash={ item.commit_transaction_hash }
            textStyle="sm"
            truncation="constant_long"
            noCopy
          />
        ) : <Text>{ t('txnBatches.pending') }</Text> }
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('txnBatches.proveTxHeader') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        { item.prove_transaction_hash ? (
          <TxEntityL1
            isLoading={ isLoading }
            hash={ item.prove_transaction_hash }
            textStyle="sm"
            truncation="constant_long"
            noCopy
          />
        ) : <Text>{ t('txnBatches.pending') }</Text> }
      </ListItemMobileGrid.Value>

    </ListItemMobileGrid.Container>
  );
};

export default ZkSyncTxnBatchesListItem;
