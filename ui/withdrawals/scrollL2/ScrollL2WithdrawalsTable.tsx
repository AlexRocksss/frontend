import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ScrollL2MessageItem } from 'types/api/scrollL2';

import config from 'configs/app';
import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { layerLabels } from 'lib/rollups/utils';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ScrollL2WithdrawalsTableItem from './ScrollL2WithdrawalsTableItem';

type Props = {
  items: Array<ScrollL2MessageItem>;
  top: number;
  isLoading?: boolean;
};

const ScrollL2WithdrawalsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot tableLayout="auto" minW="950px">
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader>{ t('withdrawals.currentBlock', { current: layerLabels.current }) }</TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.indexLabel') }</TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.currentTxnHash', { current: layerLabels.current }) }</TableColumnHeader>
            <TableColumnHeader>
              { t('withdrawals.timestampHeader') }
              <TimeFormatToggle/>
            </TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.parentTxnHash', { parent: layerLabels.parent }) }</TableColumnHeader>
            <TableColumnHeader isNumeric>{ t('withdrawals.valueWithSymbol', { symbol: config.chain.currency.symbol }) }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { items.map((item, index) => (
            <ScrollL2WithdrawalsTableItem key={ String(item.id) + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default ScrollL2WithdrawalsTable;
