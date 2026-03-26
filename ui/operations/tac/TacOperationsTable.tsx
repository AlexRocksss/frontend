import { useTranslation } from 'next-i18next';
import React from 'react';

import type * as tac from '@blockscout/tac-operation-lifecycle-types';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import TacOperationsTableItem from './TacOperationsTableItem';

type Props = {
  items: Array<tac.OperationBriefDetails>;
  isLoading?: boolean;
};

const TacOperationsTable = ({ items, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot minW="950px">
        <TableHeaderSticky top={ 68 }>
          <TableRow>
            <TableColumnHeader w="200px">{ t('operations.status') }</TableColumnHeader>
            <TableColumnHeader w="100%">{ t('operations.operation') }</TableColumnHeader>
            <TableColumnHeader w="200px">
              { t('operations.timestamp') }
              <TimeFormatToggle/>
            </TableColumnHeader>
            <TableColumnHeader w="250px">{ t('operations.sender') }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { items.map((item, index) => (
            <TacOperationsTableItem key={ String(item.operation_id) + (isLoading ? index : '') } item={ item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default TacOperationsTable;
