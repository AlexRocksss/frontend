import { Box } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { AddressCoinBalanceHistoryResponse } from 'types/api/address';
import type { PaginationParams } from 'ui/shared/pagination/types';

import type { ResourceError } from 'lib/api/resources';
import { useMultichainContext } from 'lib/contexts/multichain';
import { currencyUnits } from 'lib/units';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import ActionBar, { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import Pagination from 'ui/shared/pagination/Pagination';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import AddressCoinBalanceListItem from './AddressCoinBalanceListItem';
import AddressCoinBalanceTableItem from './AddressCoinBalanceTableItem';

interface Props {
  query: UseQueryResult<AddressCoinBalanceHistoryResponse, ResourceError<unknown>> & {
    pagination: PaginationParams;
  };
}

const AddressCoinBalanceHistory = ({ query }: Props) => {
  const { t } = useTranslation();
  const multichainContext = useMultichainContext();
  const chainData = multichainContext?.chain;

  const content = query.data?.items ? (
    <>
      <Box hideBelow="lg">
        <TableRoot>
          <TableHeaderSticky top={ query.pagination.isVisible ? ACTION_BAR_HEIGHT_DESKTOP : 0 }>
            <TableRow>
              { chainData && <TableColumnHeader width="38px"/> }
              <TableColumnHeader width="20%">{ t('address.blockHeader') }</TableColumnHeader>
              <TableColumnHeader width="20%">{ t('address.txnHeader') }</TableColumnHeader>
              <TableColumnHeader width="20%">
                { t('address.timestampHeader') }
                <TimeFormatToggle/>
              </TableColumnHeader>
              <TableColumnHeader width="20%" isNumeric pr={ 1 }>{ t('address.balanceEtherHeader', { ether: currencyUnits.ether }) }</TableColumnHeader>
              <TableColumnHeader width="20%" isNumeric>{ t('address.deltaHeader') }</TableColumnHeader>
            </TableRow>
          </TableHeaderSticky>
          <TableBody>
            { query.data.items.map((item, index) => (
              <AddressCoinBalanceTableItem
                key={ item.block_number + (query.isPlaceholderData ? String(index) : '') }
                { ...item }
                page={ query.pagination.page }
                isLoading={ query.isPlaceholderData }
                chainData={ chainData }
              />
            )) }
          </TableBody>
        </TableRoot>
      </Box>
      <Box hideFrom="lg">
        { query.data.items.map((item, index) => (
          <AddressCoinBalanceListItem
            key={ item.block_number + (query.isPlaceholderData ? String(index) : '') }
            { ...item }
            page={ query.pagination.page }
            isLoading={ query.isPlaceholderData }
            chainData={ chainData }
          />
        )) }
      </Box>
    </>
  ) : null;

  const actionBar = query.pagination.isVisible ? (
    <ActionBar mt={ -6 }>
      <Pagination ml="auto" { ...query.pagination }/>
    </ActionBar>
  ) : null;

  return (
    <DataListDisplay
      mt={ 8 }
      isError={ query.isError }
      itemsNum={ query.data?.items.length }
      emptyText={ t('address.noCoinBalanceHistory') }
      actionBar={ actionBar }
    >
      { content }
    </DataListDisplay>
  );
};

export default React.memo(AddressCoinBalanceHistory);
