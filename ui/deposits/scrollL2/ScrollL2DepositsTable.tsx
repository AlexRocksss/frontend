import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ScrollL2MessageItem } from 'types/api/scrollL2';

import config from 'configs/app';
import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { layerLabels } from 'lib/rollups/utils';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ScrollL2DepositsTableItem from './ScrollL2DepositsTableItem';

type Props = {
  items: Array<ScrollL2MessageItem>;
  top: number;
  isLoading?: boolean;
};

const ScrollL2DepositsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot tableLayout="auto" minW="950px">
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader>{ t('deposits.parentBlock', { parent: layerLabels.parent }) }</TableColumnHeader>
            <TableColumnHeader>{ t('deposits.indexLabel') }</TableColumnHeader>
            <TableColumnHeader>{ t('deposits.parentTxnHash', { parent: layerLabels.parent }) }</TableColumnHeader>
            <TableColumnHeader>
              { t('deposits.timestampHeader') }
              <TimeFormatToggle/>
            </TableColumnHeader>
            <TableColumnHeader>{ t('deposits.currentTxnHash', { current: layerLabels.current }) }</TableColumnHeader>
            <TableColumnHeader isNumeric>{ t('deposits.valueWithSymbol', { symbol: config.chain.currency.symbol }) }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { items.map((item, index) => (
            <ScrollL2DepositsTableItem key={ String(item.id) + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default ScrollL2DepositsTable;
