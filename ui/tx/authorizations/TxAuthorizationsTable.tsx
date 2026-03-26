import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TxAuthorization } from 'types/api/transaction';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import TxAuthorizationsTableItem from './TxAuthorizationsTableItem';

interface Props {
  data: Array<TxAuthorization> | undefined;
  isLoading?: boolean;
}

const TxAuthorizationsTable = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot>
        <TableHeaderSticky>
          <TableRow>
            <TableColumnHeader width="50%">{ t('tx.authority') }</TableColumnHeader>
            <TableColumnHeader width="50%">{ t('tx.delegatedAddress') }</TableColumnHeader>
            <TableColumnHeader width="120px">{ t('tx.chain') }</TableColumnHeader>
            <TableColumnHeader width="120px">{ t('tx.noncePrefixed') }</TableColumnHeader>
            <TableColumnHeader width="200px">{ t('tx.status') }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { data?.map((item, index) => (
            <TxAuthorizationsTableItem key={ item.nonce.toString() + (isLoading ? index : '') } { ...item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default TxAuthorizationsTable;
