import { useTranslation } from 'next-i18next';
import React from 'react';

import type { AddressMudTables } from 'types/api/address';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import AddressMudTablesTableItem from './AddressMudTablesTableItem';

type Props = {
  items: AddressMudTables['items'];
  isLoading: boolean;
  top: number;
  hash: string;
};

//sorry for the naming
const AddressMudTablesTable = ({ items, isLoading, top, hash }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot style={{ tableLayout: 'auto' }}>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="24px"></TableColumnHeader>
          <TableColumnHeader>{ t('address.fullNameHeader') }</TableColumnHeader>
          <TableColumnHeader>{ t('address.tableIdHeader') }</TableColumnHeader>
          <TableColumnHeader>{ t('address.typeHeader') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <AddressMudTablesTableItem
            key={ item.table.table_id + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
            hash={ hash }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default AddressMudTablesTable;
