import { useTranslation } from 'next-i18next';
import React from 'react';

import type { HotContract, HotContractsSortingField, HotContractsSortingValue } from 'types/api/contracts';

import { currencyUnits } from 'lib/units';
import { TableBody, TableColumnHeader, TableColumnHeaderSortable, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import getNextSortValue from 'ui/shared/sort/getNextSortValue';

import HotContractsTableItem from './HotContractsTableItem';
import { SORT_SEQUENCE } from './utils';

interface Props {
  items: Array<HotContract> | undefined;
  isLoading?: boolean;
  sort: HotContractsSortingValue;
  setSorting: ({ value }: { value: Array<string> }) => void;
  exchangeRate: string | null;
};

const HotContractsTable = ({ items, isLoading, sort, setSorting, exchangeRate }: Props) => {
  const { t } = useTranslation();

  const onSortToggle = React.useCallback((field: HotContractsSortingField) => {
    const value = getNextSortValue<HotContractsSortingField, HotContractsSortingValue>(SORT_SEQUENCE, field)(sort);
    setSorting({ value: [ value ] });
  }, [ sort, setSorting ]);

  return (
    <TableRoot minWidth="900px">
      <TableHeaderSticky top={ ACTION_BAR_HEIGHT_DESKTOP }>
        <TableRow>
          <TableColumnHeader width="25%">{ t('hotContracts.contractHeader') }</TableColumnHeader>
          <TableColumnHeaderSortable
            width="25%"
            isNumeric
            sortField="transactions_count"
            sortValue={ sort }
            onSortToggle={ onSortToggle }
            disabled={ isLoading }
          >
            { t('hotContracts.txnCountHeader') }
          </TableColumnHeaderSortable>
          <TableColumnHeaderSortable
            width="25%"
            isNumeric
            sortField="total_gas_used"
            sortValue={ sort }
            onSortToggle={ onSortToggle }
            disabled={ isLoading }
          >
            { t('hotContracts.gasUsedHeader') }
          </TableColumnHeaderSortable>
          <TableColumnHeader width="25%" isNumeric>{ t('hotContracts.balanceHeader', { ether: currencyUnits.ether }) }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items?.map((item, index) => (
          <HotContractsTableItem key={ index } isLoading={ isLoading } data={ item } exchangeRate={ exchangeRate }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default HotContractsTable;
