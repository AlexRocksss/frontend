import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ClustersLeaderboardObject } from 'types/api/clusters';

import { Skeleton } from 'toolkit/chakra/skeleton';
import { TableCell, TableRow } from 'toolkit/chakra/table';
import ClustersEntity from 'ui/shared/entities/clusters/ClustersEntity';

interface Props {
  item: ClustersLeaderboardObject;
  isLoading?: boolean;
}

const ClustersLeaderboardTableItem = ({ item, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell verticalAlign="middle">
        <Skeleton loading={ isLoading }>
          #{ item.rank }
        </Skeleton>
      </TableCell>
      <TableCell verticalAlign="middle">
        <ClustersEntity clusterName={ item.name } isLoading={ isLoading } fontWeight={ 600 }/>
      </TableCell>
      <TableCell verticalAlign="middle">
        <Skeleton loading={ isLoading }>
          { item.nameCount }
        </Skeleton>
      </TableCell>
      <TableCell verticalAlign="middle">
        <Skeleton loading={ isLoading }>
          { (parseFloat(item.totalWeiAmount) / 1e18).toFixed(2) } ETH
        </Skeleton>
      </TableCell>
      <TableCell verticalAlign="middle">
        <Skeleton loading={ isLoading }>
          { t('nameServices.chainCount', { count: item.chainIds.length }) }
        </Skeleton>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ClustersLeaderboardTableItem);
