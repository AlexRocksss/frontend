import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ZkEvmL2DepositsItem } from 'types/api/zkEvmL2';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { layerLabels } from 'lib/rollups/utils';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ZkEvmL2DepositsTableItem from './ZkEvmL2DepositsTableItem';

type Props = {
  items: Array<ZkEvmL2DepositsItem>;
  top: number;
  isLoading?: boolean;
};

const ZkEvmL2DepositsTable = ({ items, top, isLoading }: Props) => {
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
            <TableColumnHeader isNumeric>{ t('deposits.valueLabel') }</TableColumnHeader>
            <TableColumnHeader>{ t('deposits.tokenLabel') }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { items.map((item, index) => (
            <ZkEvmL2DepositsTableItem key={ String(item.index) + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default ZkEvmL2DepositsTable;
