import { useTranslation } from 'next-i18next';
import React from 'react';

import type { MudWorldItem } from 'types/api/mudWorlds';

import { currencyUnits } from 'lib/units';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import MudWorldsTableItem from './MudWorldsTableItem';

type Props = {
  items: Array<MudWorldItem>;
  top: number;
  isLoading?: boolean;
};

const MudWorldsTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot style={{ tableLayout: 'auto' }}>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('addresses.address') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('addresses.balance', { ether: currencyUnits.ether }) }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('addresses.txnCount') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <MudWorldsTableItem
            key={ String(item.address.hash) + (isLoading ? index : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default MudWorldsTable;
