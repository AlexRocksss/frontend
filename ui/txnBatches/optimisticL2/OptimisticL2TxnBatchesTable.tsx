import { useTranslation } from 'next-i18next';
import React from 'react';

import type { OptimisticL2TxnBatchesItem } from 'types/api/optimisticL2';

import { layerLabels } from 'lib/rollups/utils';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import OptimisticL2TxnBatchesTableItem from './OptimisticL2TxnBatchesTableItem';

type Props = {
  items: Array<OptimisticL2TxnBatchesItem>;
  top: number;
  isLoading?: boolean;
};

const OptimisticL2TxnBatchesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="850px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('txnBatches.batchIdLabel') }</TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.storageHeader') }</TableColumnHeader>
          <TableColumnHeader>
            { t('txnBatches.timestampLabel') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('txnBatches.parentTxnCountHeader', { parent: layerLabels.parent }) }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('txnBatches.currentBlocksHeader', { current: layerLabels.current }) }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('txnBatches.txnHeader') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <OptimisticL2TxnBatchesTableItem
            key={ item.number + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default OptimisticL2TxnBatchesTable;
