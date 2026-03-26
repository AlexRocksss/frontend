import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ScrollL2TxnBatch } from 'types/api/scrollL2';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ScrollL2TxnBatchesTableItem from './ScrollL2TxnBatchesTableItem';

type Props = {
  items: Array<ScrollL2TxnBatch>;
  top: number;
  isLoading?: boolean;
};

const ScrollL2TxnBatchesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="1000px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('txnBatches.batchNoHeader') }</TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.containerHeader') }</TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.statusHeader') }</TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.committedBlockHeader') }</TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.committedTxnHashHeader') }</TableColumnHeader>
          <TableColumnHeader>
            { t('txnBatches.timestampLabel') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.finalizedBlockHeader') }</TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.finalizedTxnHashHeader') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('txnBatches.blocksHeader') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('txnBatches.txnHeader') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ScrollL2TxnBatchesTableItem
            key={ item.number + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ScrollL2TxnBatchesTable;
