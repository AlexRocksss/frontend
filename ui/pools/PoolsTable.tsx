import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Pool } from 'types/api/pools';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import { ACTION_BAR_HEIGHT_DESKTOP } from 'ui/shared/ActionBar';

import PoolsTableItem from './PoolsTableItem';

type Props = {
  items: Array<Pool>;
  page: number;
  isLoading?: boolean;
  top?: number;
};

const PoolsTable = ({ items, page, isLoading, top }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot minWidth="900px">
      <TableHeaderSticky top={ top ?? ACTION_BAR_HEIGHT_DESKTOP }>
        <TableRow>
          <TableColumnHeader width="70%">{ t('pools.pool') }</TableColumnHeader>
          <TableColumnHeader width="30%">{ t('pools.dex') } </TableColumnHeader>
          <TableColumnHeader width="130px" isNumeric>{ t('pools.liquidity') }</TableColumnHeader>
          <TableColumnHeader width="75px" isNumeric>{ t('pools.viewIn') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <PoolsTableItem key={ item.pool_id + (isLoading ? index : '') } item={ item } index={ index } page={ page } isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default PoolsTable;
