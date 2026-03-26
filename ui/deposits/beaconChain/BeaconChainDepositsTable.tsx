import { useTranslation } from 'next-i18next';
import React from 'react';

import type { DepositsItem } from 'types/api/deposits';

import config from 'configs/app';
import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useLazyRenderedList from 'lib/hooks/useLazyRenderedList';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import BeaconChainDepositsTableItem from './BeaconChainDepositsTableItem';

const feature = config.features.beaconChain;

type Props = {
  top: number;
  isLoading?: boolean;
  items: Array<DepositsItem>;
  view: 'list' | 'address' | 'block';
};

const BeaconChainDepositsTable = ({ items, isLoading, top, view }: Props) => {
  const { t } = useTranslation();
  const { cutRef, renderedItemsNum } = useLazyRenderedList(items, !isLoading);

  if (!feature.isEnabled || feature.withdrawalsOnly) {
    return null;
  }

  return (
    <AddressHighlightProvider>
      <TableRoot minW="1100px">
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader w="190px">{ t('deposits.txHashLabel') }</TableColumnHeader>
            { view !== 'block' && <TableColumnHeader>{ t('deposits.blockLabel') }</TableColumnHeader> }
            { view !== 'block' && <TableColumnHeader w="180px">{ t('deposits.timestampHeader') }<TimeFormatToggle/></TableColumnHeader> }
            <TableColumnHeader>{ t('deposits.valueWithSymbol', { symbol: feature.currency.symbol }) }</TableColumnHeader>
            { view !== 'address' && <TableColumnHeader w="200px">{ t('deposits.fromLabel') }</TableColumnHeader> }
            <TableColumnHeader>{ t('deposits.pubKeyLabel') }</TableColumnHeader>
            <TableColumnHeader>{ t('deposits.signatureLabel') }</TableColumnHeader>
            <TableColumnHeader>{ t('deposits.statusLabel') }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { items.slice(0, renderedItemsNum).map((item, index) => (
            <BeaconChainDepositsTableItem key={ item.index + (isLoading ? String(index) : '') } item={ item } view={ view } isLoading={ isLoading }/>
          )) }
          <TableRow ref={ cutRef }/>
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default BeaconChainDepositsTable;
