import { useTranslation } from 'next-i18next';
import React from 'react';

import type { OptimisticL2DisputeGamesItem } from 'types/api/optimisticL2';

import { layerLabels } from 'lib/rollups/utils';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import OptimisticL2DisputeGamesTableItem from './OptimisticL2DisputeGamesTableItem';

type Props = {
  items: Array<OptimisticL2DisputeGamesItem>;
  top: number;
  isLoading?: boolean;
};

const OptimisticL2DisputeGamesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto" minW="950px">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader>{ t('disputeGames.indexLabel') }</TableColumnHeader>
          <TableColumnHeader>{ t('disputeGames.gameTypeLabel') }</TableColumnHeader>
          <TableColumnHeader>{ t('disputeGames.addressLabel') }</TableColumnHeader>
          <TableColumnHeader>{ t('disputeGames.currentBlockNo', { current: layerLabels.current }) }</TableColumnHeader>
          <TableColumnHeader>
            { t('disputeGames.timestampHeader') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{ t('disputeGames.statusLabel') }</TableColumnHeader>
          <TableColumnHeader>
            { t('disputeGames.resolvedHeader') }
            <TimeFormatToggle/>
          </TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => (
          <OptimisticL2DisputeGamesTableItem
            key={ String(item.index) + (isLoading ? index : '') }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default OptimisticL2DisputeGamesTable;
