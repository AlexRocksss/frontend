import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ArbitrumL2TxnBatchesItem } from 'types/api/arbitrumL2';

import { layerLabels } from 'lib/rollups/utils';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ArbitrumL2TxnBatchesTableItem from './ArbitrumL2TxnBatchesTableItem';

type Props = {
  items: Array<ArbitrumL2TxnBatchesItem>;
  top: number;
  isLoading?: boolean;
};

const ArbitrumL2TxnBatchesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="1000px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('txnBatches.batchNoHeader') }</TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.parentStatusHeader', { parent: layerLabels.parent }) }</TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.parentBlockHeader', { parent: layerLabels.parent }) }</TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.blockCountHeader') }</TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.parentTxnHeader', { parent: layerLabels.parent }) }</TableColumnHeader>
          <TableColumnHeader>
            { t('txnBatches.timestampLabel') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{ t('txnBatches.txnCountHeader') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <ArbitrumL2TxnBatchesTableItem
            key={ item.number + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ArbitrumL2TxnBatchesTable;
