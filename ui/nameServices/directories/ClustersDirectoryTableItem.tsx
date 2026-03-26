import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ClustersDirectoryObject } from 'types/api/clusters';

import { isEvmAddress } from 'lib/address/isEvmAddress';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { TableCell, TableRow } from 'toolkit/chakra/table';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import ClustersEntity from 'ui/shared/entities/clusters/ClustersEntity';
import TimeWithTooltip from 'ui/shared/time/TimeWithTooltip';

interface Props {
  item: ClustersDirectoryObject;
  isLoading?: boolean;
  isClusterDetailsLoading?: boolean;
}

const ClustersDirectoryTableItem = ({ item, isLoading, isClusterDetailsLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <TableRow>
      <TableCell verticalAlign="middle">
        <ClustersEntity clusterName={ item.name } isLoading={ isLoading } fontWeight={ 600 }/>
      </TableCell>
      <TableCell verticalAlign="middle">
        { item.owner && (
          <AddressEntity
            address={{ hash: item.owner }}
            isLoading={ isLoading }
            fontWeight={ 500 }
            noLink={ !isEvmAddress(item.owner) }
            w="fit-content"
            maxW="100%"
          />
        ) }
        { !item.owner && <Skeleton loading={ isLoading }>—</Skeleton> }
      </TableCell>
      <TableCell verticalAlign="middle">
        <TimeWithTooltip
          timestamp={ item.createdAt }
          isLoading={ isLoading }
          enableIncrement={ true }
        />
      </TableCell>
      <TableCell verticalAlign="middle">
        <Skeleton loading={ isLoading || isClusterDetailsLoading }>
          { t('nameServices.chainCount', { count: item.chainIds?.length || 1 }) }
        </Skeleton>
      </TableCell>
    </TableRow>
  );
};

export default React.memo(ClustersDirectoryTableItem);
