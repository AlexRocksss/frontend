import { useTranslation } from 'next-i18next';
import React from 'react';

import type { AddressWithdrawalsItem } from 'types/api/address';
import type { BlockWithdrawalsItem } from 'types/api/block';
import type { WithdrawalsItem } from 'types/api/withdrawals';

import config from 'configs/app';
import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useLazyRenderedList from 'lib/hooks/useLazyRenderedList';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import BeaconChainWithdrawalsTableItem from './BeaconChainWithdrawalsTableItem';

const feature = config.features.beaconChain;

type Props = {
  top: number;
  isLoading?: boolean;
} & ({
  items: Array<WithdrawalsItem>;
  view: 'list';
} | {
  items: Array<AddressWithdrawalsItem>;
  view: 'address';
} | {
  items: Array<BlockWithdrawalsItem>;
  view: 'block';
});

const BeaconChainWithdrawalsTable = ({ items, isLoading, top, view }: Props) => {
  const { t } = useTranslation();
  const { cutRef, renderedItemsNum } = useLazyRenderedList(items, !isLoading);

  if (!feature.isEnabled) {
    return null;
  }

  return (
    <AddressHighlightProvider>
      <TableRoot style={{ tableLayout: 'auto' }} minW="950px">
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader>{ t('withdrawals.indexLabel') }</TableColumnHeader>
            <TableColumnHeader>{ t('withdrawals.validatorIndexLabel') }</TableColumnHeader>
            { view !== 'block' && <TableColumnHeader>{ t('withdrawals.blockLabel') }</TableColumnHeader> }
            { view !== 'address' && <TableColumnHeader>{ t('withdrawals.toLabel') }</TableColumnHeader> }
            { view !== 'block' && <TableColumnHeader>{ t('withdrawals.timestampHeader') }<TimeFormatToggle/></TableColumnHeader> }
            <TableColumnHeader>{ t('withdrawals.valueWithSymbol', { symbol: feature.currency.symbol }) }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { view === 'list' && (items as Array<WithdrawalsItem>).slice(0, renderedItemsNum).map((item, index) => (
            <BeaconChainWithdrawalsTableItem key={ item.index + (isLoading ? String(index) : '') } item={ item } view="list" isLoading={ isLoading }/>
          )) }
          { view === 'address' && (items as Array<AddressWithdrawalsItem>).slice(0, renderedItemsNum).map((item, index) => (
            <BeaconChainWithdrawalsTableItem key={ item.index + (isLoading ? String(index) : '') } item={ item } view="address" isLoading={ isLoading }/>
          )) }
          { view === 'block' && (items as Array<BlockWithdrawalsItem>).slice(0, renderedItemsNum).map((item, index) => (
            <BeaconChainWithdrawalsTableItem key={ item.index + (isLoading ? String(index) : '') } item={ item } view="block" isLoading={ isLoading }/>
          )) }
          <TableRow ref={ cutRef }/>
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default BeaconChainWithdrawalsTable;
