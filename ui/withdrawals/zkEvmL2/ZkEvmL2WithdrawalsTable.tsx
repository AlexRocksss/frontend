import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ZkEvmL2WithdrawalsItem } from 'types/api/zkEvmL2';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { layerLabels } from 'lib/rollups/utils';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ZkEvmL2WithdrawalsTableItem from './ZkEvmL2WithdrawalsTableItem';

type Props = {
  items: Array<ZkEvmL2WithdrawalsItem>;
  top: number;
  isLoading?: boolean;
};

const ZkEvmL2WithdrawalsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot tableLayout="auto" minW="950px">
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader>{ t('withdrawals.blockLabel') }</TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.indexLabel') }</TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.currentTxnHash', { current: layerLabels.current }) }</TableColumnHeader>
            <TableColumnHeader>
              { t('withdrawals.timestampHeader') }
              <TimeFormatToggle/>
            </TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.parentTxnHash', { parent: layerLabels.parent }) }</TableColumnHeader>
            <TableColumnHeader isNumeric>{ t('withdrawals.valueLabel') }</TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.tokenLabel') }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { items.map((item, index) => (
            <ZkEvmL2WithdrawalsTableItem key={ String(item.index) + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default ZkEvmL2WithdrawalsTable;
