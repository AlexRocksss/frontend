import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ShibariumDepositsItem } from 'types/api/shibarium';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { layerLabels } from 'lib/rollups/utils';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import DepositsTableItem from './DepositsTableItem';

type Props = {
  items: Array<ShibariumDepositsItem>;
  top: number;
  isLoading?: boolean;
};

const DepositsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot tableLayout="auto" minW="950px">
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader>{ t('deposits.parentBlockNo', { parent: layerLabels.parent }) }</TableColumnHeader>
            <TableColumnHeader>{ t('deposits.parentTxnHash', { parent: layerLabels.parent }) }</TableColumnHeader>
            <TableColumnHeader>{ t('deposits.currentTxnHash', { current: layerLabels.current }) }</TableColumnHeader>
            <TableColumnHeader>{ t('deposits.userLabel') }</TableColumnHeader>
            <TableColumnHeader>
              { t('deposits.timestampHeader') }
              <TimeFormatToggle/>
            </TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { items.map((item, index) => (
            <DepositsTableItem key={ `${ item.l2_transaction_hash }-${ index }` } item={ item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default DepositsTable;
