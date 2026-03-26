import { useTranslation } from 'next-i18next';
import React from 'react';

import type * as bens from '@blockscout/bens-types';

import { TableBody, TableColumnHeader, TableColumnHeaderSortable, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import NameDomainHistoryTableItem from './NameDomainHistoryTableItem';
import type { SortField, Sort } from './utils';
import { sortFn } from './utils';

interface Props {
  history: bens.ListDomainEventsResponse | undefined;
  domain: bens.DetailedDomain | undefined;
  isLoading?: boolean;
  sort: Sort;
  onSortToggle: (field: SortField) => void;
}

const NameDomainHistoryTable = ({ history, domain, isLoading, sort, onSortToggle }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot>
      <TableHeaderSticky top={ 0 }>
        <TableRow>
          <TableColumnHeader width="25%">{ t('nameDomain.txnHash') }</TableColumnHeader>
          <TableColumnHeaderSortable
            width="25%"
            pl={ 9 }
            sortField="timestamp"
            sortValue={ sort }
            onSortToggle={ onSortToggle }
            contentAfter={ <TimeFormatToggle/> }
          >
            { t('nameDomain.timestamp') }
          </TableColumnHeaderSortable>
          <TableColumnHeader width="25%">{ t('nameDomain.from') }</TableColumnHeader>
          <TableColumnHeader width="25%">{ t('nameDomain.method') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        {
          history?.items
            .slice()
            .sort(sortFn(sort))
            .map((item, index) => <NameDomainHistoryTableItem key={ index } event={ item } domain={ domain } isLoading={ isLoading }/>)
        }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(NameDomainHistoryTable);
