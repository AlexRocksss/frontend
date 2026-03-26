import { useTranslation } from 'next-i18next';
import React from 'react';

import type { OptimisticL2DepositsItem } from 'types/api/optimisticL2';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { layerLabels } from 'lib/rollups/utils';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import OptimisticDepositsTableItem from './OptimisticDepositsTableItem';

type Props = {
  items: Array<OptimisticL2DepositsItem>;
  top: number;
  isLoading?: boolean;
};

const OptimisticDepositsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot tableLayout="auto" minW="950px">
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader>{ t('deposits.parentBlockNo', { parent: layerLabels.parent }) }</TableColumnHeader>
            <TableColumnHeader>{ t('deposits.currentTxnHash', { current: layerLabels.current }) }</TableColumnHeader>
            <TableColumnHeader>
              { t('deposits.timestampHeader') }
              <TimeFormatToggle/>
            </TableColumnHeader>
            <TableColumnHeader>{ t('deposits.parentTxnHash', { parent: layerLabels.parent }) }</TableColumnHeader>
            <TableColumnHeader>{ t('deposits.parentTxnOrigin', { parent: layerLabels.parent }) }</TableColumnHeader>
            <TableColumnHeader isNumeric>{ t('deposits.gasLimitLabel') }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { items.map((item, index) => (
            <OptimisticDepositsTableItem key={ item.l2_transaction_hash + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default OptimisticDepositsTable;
