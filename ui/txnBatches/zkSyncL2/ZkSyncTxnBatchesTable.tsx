import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ZkSyncBatchesItem } from 'types/api/zkSyncL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ZkSyncTxnBatchesTableItem from './ZkSyncTxnBatchesTableItem';

type Props = {
  items: Array<ZkSyncBatchesItem>;
  top: number;
  isLoading?: boolean;
};

const ZkSyncTxnBatchesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minW="1000px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="40%">{ t('txnBatches.batchNoHeader') }</TableColumnHeader>
          <TableColumnHeader width="60%">{ t('txnBatches.statusHeader') }</TableColumnHeader>
          <TableColumnHeader width="180px">
            { t('txnBatches.timestampLabel') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader width="120px">{ t('txnBatches.txnCountHeader') }</TableColumnHeader>
          <TableColumnHeader width="210px">{ t('txnBatches.commitTxHeader') }</TableColumnHeader>
          <TableColumnHeader width="210px">{ t('txnBatches.proveTxHeader') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ZkSyncTxnBatchesTableItem
            key={ item.number + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ZkSyncTxnBatchesTable;
