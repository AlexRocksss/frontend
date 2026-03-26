import { useTranslation } from 'next-i18next';
import React from 'react';

import type { InternalTransaction } from 'types/api/internalTransaction';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { currencyUnits } from 'lib/units';
import { TableBody, TableColumnHeader, TableColumnHeaderSortable, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TxInternalsTableItem from 'ui/tx/internals/TxInternalsTableItem';
import type { Sort, SortField } from 'ui/tx/internals/utils';

interface Props {
  data: Array<InternalTransaction>;
  sort: Sort;
  onSortToggle: (field: SortField) => void;
  top: number;
  isLoading?: boolean;
}

const TxInternalsTable = ({ data, sort, onSortToggle, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot>
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader width="28%">{ t('tx.type') }</TableColumnHeader>
            <TableColumnHeader width="40%">{ t('tx.fromTo') }</TableColumnHeader>
            <TableColumnHeaderSortable
              width="16%"
              isNumeric
              sortField="value"
              sortValue={ sort }
              onSortToggle={ onSortToggle }
            >
              { t('tx.valueEther', { ether: currencyUnits.ether }) }
            </TableColumnHeaderSortable>
            <TableColumnHeaderSortable
              width="16%"
              isNumeric
              sortField="gas-limit"
              sortValue={ sort }
              onSortToggle={ onSortToggle }
            >
              { t('tx.gasLimit') }
            </TableColumnHeaderSortable>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { data.map((item, index) => (
            <TxInternalsTableItem key={ item.index.toString() + (isLoading ? index : '') } { ...item } isLoading={ isLoading }/>
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default TxInternalsTable;
