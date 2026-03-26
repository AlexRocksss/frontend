import { useTranslation } from 'next-i18next';
import React from 'react';

import type { AddressTags, AddressTag } from 'types/api/account';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import AddressTagTableItem from './AddressTagTableItem';

interface Props {
  data?: AddressTags;
  onEditClick: (data: AddressTag) => void;
  onDeleteClick: (data: AddressTag) => void;
  isLoading: boolean;
  top: number;
}

const AddressTagTable = ({ data, onDeleteClick, onEditClick, isLoading, top }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minWidth="600px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="60%">{ t('privateTags.addressHeader') }</TableColumnHeader>
          <TableColumnHeader width="40%">{ t('privateTags.privateTagHeader') }</TableColumnHeader>
          <TableColumnHeader width="116px"></TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data?.map((item: AddressTag, index: number) => (
          <AddressTagTableItem
            item={ item }
            key={ item.id + (isLoading ? String(index) : '') }
            onDeleteClick={ onDeleteClick }
            onEditClick={ onEditClick }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default AddressTagTable;
