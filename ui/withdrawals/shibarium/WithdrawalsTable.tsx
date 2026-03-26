import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ShibariumWithdrawalsItem } from 'types/api/shibarium';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { layerLabels } from 'lib/rollups/utils';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import WithdrawalsTableItem from './WithdrawalsTableItem';

type Props = {
  items: Array<ShibariumWithdrawalsItem>;
  top: number;
  isLoading?: boolean;
};

const WithdrawalsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot tableLayout="auto" minW="950px">
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader>{ t('withdrawals.currentBlockNo', { current: layerLabels.current }) }</TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.currentTxnHash', { current: layerLabels.current }) }</TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.parentTxnHash', { parent: layerLabels.parent }) }</TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.userLabel') }</TableColumnHeader>
            <TableColumnHeader>
              { t('withdrawals.timestampHeader') }
              <TimeFormatToggle/>
            </TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { items.map((item, index) => (
            <WithdrawalsTableItem key={ `${ item.l2_transaction_hash }-${ index }` } item={ item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default WithdrawalsTable;
