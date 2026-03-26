import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ClustersDirectoryObject } from 'types/api/clusters';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { TableBody, TableHeaderSticky, TableRow, TableColumnHeader, TableRoot } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ClustersDirectoryTableItem from './ClustersDirectoryTableItem';

interface Props {
  data: Array<ClustersDirectoryObject>;
  isLoading?: boolean;
  top?: number;
  isClusterDetailsLoading?: boolean;
}

const ClustersDirectoryTable = ({ data, isLoading, top, isClusterDetailsLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <AddressHighlightProvider>
      <TableRoot>
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader width="40%">{ t('nameServices.clusterNameHeader') }</TableColumnHeader>
            <TableColumnHeader width="40%">{ t('nameServices.addressHeader') }</TableColumnHeader>
            <TableColumnHeader width="180px">
              { t('nameServices.joinedHeader') }
              <TimeFormatToggle/>
            </TableColumnHeader>
            <TableColumnHeader width="20%">{ t('nameServices.activeChainsHeader') }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { data.map((item, index) => (
            <ClustersDirectoryTableItem
              key={ `${ item.name }-${ index }${ isLoading ? '-loading' : '' }` }
              item={ item }
              isLoading={ isLoading }
              isClusterDetailsLoading={ isClusterDetailsLoading }
            />
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default React.memo(ClustersDirectoryTable);
