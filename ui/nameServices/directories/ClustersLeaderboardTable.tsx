import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ClustersLeaderboardObject } from 'types/api/clusters';

import { TableBody, TableHeaderSticky, TableRow, TableColumnHeader, TableRoot } from 'toolkit/chakra/table';

import ClustersLeaderboardTableItem from './ClustersLeaderboardTableItem';

interface Props {
  data: Array<ClustersLeaderboardObject>;
  isLoading?: boolean;
  top?: number;
}

const ClustersLeaderboardTable = ({ data, isLoading, top }: Props) => {
  const { t } = useTranslation();

  return (
    <TableRoot>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="5%">{ t('nameServices.rankHeader') }</TableColumnHeader>
          <TableColumnHeader width="40%">{ t('nameServices.clusterNameHeader') }</TableColumnHeader>
          <TableColumnHeader width="10%">{ t('nameServices.namesHeader') }</TableColumnHeader>
          <TableColumnHeader width="10%">{ t('nameServices.totalBackingHeader') }</TableColumnHeader>
          <TableColumnHeader width="10%">{ t('nameServices.activeChainsHeader') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data.map((item, index) => (
          <ClustersLeaderboardTableItem
            key={ `${ item.name }-${ index }${ isLoading ? '-loading' : '' }` }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(ClustersLeaderboardTable);
