import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TransactionTags, TransactionTag } from 'types/api/account';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import TransactionTagTableItem from './TransactionTagTableItem';

interface Props {
  data?: TransactionTags;
  isLoading: boolean;
  onEditClick: (data: TransactionTag) => void;
  onDeleteClick: (data: TransactionTag) => void;
  top: number;
}

const TransactionTagTable = ({ data, isLoading, onDeleteClick, onEditClick, top }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minWidth="600px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="75%">{ t('privateTags.transactionHeader') }</TableColumnHeader>
          <TableColumnHeader width="25%">{ t('privateTags.privateTagHeader') }</TableColumnHeader>
          <TableColumnHeader width="108px"></TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data?.map((item, index) => (
          <TransactionTagTableItem
            key={ item.id + (isLoading ? String(index) : '') }
            item={ item }
            isLoading={ isLoading }
            onDeleteClick={ onDeleteClick }
            onEditClick={ onEditClick }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default TransactionTagTable;
