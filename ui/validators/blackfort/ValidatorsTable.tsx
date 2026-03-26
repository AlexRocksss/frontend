import { useTranslation } from 'next-i18next';
import React from 'react';

import type {
  ValidatorBlackfort,
  ValidatorsBlackfortSortingField,
  ValidatorsBlackfortSortingValue,
} from 'types/api/validators';

import { currencyUnits } from 'lib/units';
import { TableBody, TableColumnHeader, TableColumnHeaderSortable, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import getNextSortValue from 'ui/shared/sort/getNextSortValue';

import { VALIDATORS_BLACKFORT_SORT_SEQUENCE } from './utils';
import ValidatorsTableItem from './ValidatorsTableItem';

interface Props {
  data: Array<ValidatorBlackfort>;
  sort: ValidatorsBlackfortSortingValue;
  setSorting: ({ value }: { value: Array<string> }) => void;
  isLoading?: boolean;
  top: number;
}

const ValidatorsTable = ({ data, sort, setSorting, isLoading, top }: Props) => {
  const { t } = useTranslation();

  const onSortToggle = React.useCallback((field: ValidatorsBlackfortSortingField) => {
    const value = getNextSortValue<ValidatorsBlackfortSortingField, ValidatorsBlackfortSortingValue>(VALIDATORS_BLACKFORT_SORT_SEQUENCE, field)(sort);
    setSorting({ value: [ value ] });
  }, [ sort, setSorting ]);

  return (
    <TableRoot>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeaderSortable
            sortField="address_hash"
            sortValue={ sort }
            onSortToggle={ onSortToggle }
            indicatorPosition="right"
          >
            { t('validators.addressHeader') }
          </TableColumnHeaderSortable>
          <TableColumnHeader>{ t('validators.nameHeader') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('validators.commissionHeader') }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('validators.selfBondedHeader', { ether: currencyUnits.ether }) }</TableColumnHeader>
          <TableColumnHeader isNumeric>{ t('validators.delegatedAmountHeader', { ether: currencyUnits.ether }) }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data.map((item, index) => (
          <ValidatorsTableItem
            key={ item.address.hash + (isLoading ? index : '') }
            data={ item }
            isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(ValidatorsTable);
