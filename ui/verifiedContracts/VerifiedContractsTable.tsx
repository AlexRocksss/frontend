import { useTranslation } from 'next-i18next';
import React from 'react';

import type { VerifiedContract } from 'types/api/contracts';
import type { VerifiedContractsSortingField, VerifiedContractsSortingValue } from 'types/api/verifiedContracts';

import { useMultichainContext } from 'lib/contexts/multichain';
import { currencyUnits } from 'lib/units';
import { TableBody, TableColumnHeader, TableColumnHeaderSortable, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import getNextSortValue from 'ui/shared/sort/getNextSortValue';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';
import { SORT_SEQUENCE } from 'ui/verifiedContracts/utils';

import VerifiedContractsTableItem from './VerifiedContractsTableItem';

interface Props {
  data: Array<VerifiedContract>;
  sort: VerifiedContractsSortingValue;
  setSorting: ({ value }: { value: Array<string> }) => void;
  isLoading?: boolean;
}

const VerifiedContractsTable = ({ data, sort, setSorting, isLoading }: Props) => {
  const { t } = useTranslation();
  const multichainContext = useMultichainContext();
  const chainData = multichainContext?.chain;

  const onSortToggle = React.useCallback((field: VerifiedContractsSortingField) => {
    const value = getNextSortValue<VerifiedContractsSortingField, VerifiedContractsSortingValue>(SORT_SEQUENCE, field)(sort);
    setSorting({ value: [ value ] });
  }, [ sort, setSorting ]);

  return (
    <TableRoot minW="1100px">
      <TableHeaderSticky top={ ACTION_BAR_HEIGHT_DESKTOP }>
        <TableRow>
          { chainData && <TableColumnHeader width="38px"/> }
          <TableColumnHeader width="50%">{ t('verifiedContracts.contractHeader') }</TableColumnHeader>
          <TableColumnHeaderSortable
            width="130px"
            isNumeric
            sortField="balance"
            sortValue={ sort }
            onSortToggle={ onSortToggle }
            disabled={ isLoading }
          >
            { t('verifiedContracts.balanceHeader', { ether: currencyUnits.ether }) }
          </TableColumnHeaderSortable>
          <TableColumnHeaderSortable
            width="130px"
            isNumeric
            sortField="transactions_count"
            sortValue={ sort }
            onSortToggle={ onSortToggle }
            disabled={ isLoading }
          >
            { t('verifiedContracts.txsHeader') }
          </TableColumnHeaderSortable>
          <TableColumnHeader width="50%">{ t('verifiedContracts.languageHeader') }</TableColumnHeader>
          <TableColumnHeader width="80px">{ t('verifiedContracts.settingsHeader') }</TableColumnHeader>
          <TableColumnHeader width="200px">
            { t('verifiedContracts.verifiedHeader') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader width="130px">{ t('verifiedContracts.licenseHeader') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data.map((item, index) => (
          <VerifiedContractsTableItem
            key={ item.address.hash + (isLoading ? index : '') }
            data={ item }
            isLoading={ isLoading }
            chainData={ chainData }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(VerifiedContractsTable);
