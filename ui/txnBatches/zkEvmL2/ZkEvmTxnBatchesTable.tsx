import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ZkEvmL2TxnBatchesItem } from 'types/api/zkEvmL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ZkEvmTxnBatchesTableItem from './ZkEvmTxnBatchesTableItem';

type Props = {
  items: Array<ZkEvmL2TxnBatchesItem>;
  top: number;
  isLoading?: boolean;
};

const ZkEvmTxnBatchesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minW="1100px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="40%">{ t('txnBatches.batchNoHeader') }</TableColumnHeader>
          <TableColumnHeader width="60%">{ t('txnBatches.statusHeader') }</TableColumnHeader>
          <TableColumnHeader width="180px">
            { t('txnBatches.timestampLabel') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader width="100px">{ t('txnBatches.txnCountHeader') }</TableColumnHeader>
          <TableColumnHeader width="230px">{ t('txnBatches.verifyTxHashHeader') }</TableColumnHeader>
          <TableColumnHeader width="230px">{ t('txnBatches.sequenceHashHeader') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ZkEvmTxnBatchesTableItem
            key={ item.number + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ZkEvmTxnBatchesTable;
