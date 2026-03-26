import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ClustersLeaderboardObject } from 'types/api/clusters';

import { Skeleton } from 'toolkit/chakra/skeleton';
import ClustersEntity from 'ui/shared/entities/clusters/ClustersEntity';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';

interface Props {
  item: ClustersLeaderboardObject;
  isLoading?: boolean;
}

const ClustersLeaderboardListItem = ({ item, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <ListItemMobileGrid.Container>
      <ListItemMobileGrid.Label isLoading={ isLoading }>
        { t('nameServices.rankLabel') }
      </ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton loading={ isLoading }>
          #{ item.rank }
        </Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>
        { t('nameServices.clusterNameLabel') }
      </ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <ClustersEntity clusterName={ item.name } isLoading={ isLoading } fontWeight={ 500 }/>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>
        { t('nameServices.namesLabel') }
      </ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton loading={ isLoading }>
          { item.nameCount }
        </Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>
        { t('nameServices.backingLabel') }
      </ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton loading={ isLoading }>
          { (parseFloat(item.totalWeiAmount) / 1e18).toFixed(2) } ETH
        </Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>
        { t('nameServices.networkPresenceLabel') }
      </ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton loading={ isLoading }>
          { t('nameServices.chainCount', { count: item.chainIds.length }) }
        </Skeleton>
      </ListItemMobileGrid.Value>
    </ListItemMobileGrid.Container>
  );
};

export default React.memo(ClustersLeaderboardListItem);
