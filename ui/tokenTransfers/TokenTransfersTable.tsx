import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TokenTransfer } from 'types/api/tokenTransfer';
import type { ClusterChainConfig } from 'types/multichain';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';
import TokenTransferTableItem from 'ui/tokenTransfers/TokenTransfersTableItem';

interface Props {
  items?: Array<TokenTransfer>;
  top: number;
  isLoading?: boolean;
  chainData?: ClusterChainConfig;
}

const TokenTransferTable = ({ items, top, isLoading, chainData }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot minW="950px" tableLayout="auto">
        <TableHeaderSticky top={ top }>
          <TableRow>
            { chainData && <TableColumnHeader width="38px"/> }
            <TableColumnHeader>
              { t('tokenTransfers.txnHash') }
              <TimeFormatToggle/>
            </TableColumnHeader>
            <TableColumnHeader>{ t('tokenTransfers.method') }</TableColumnHeader>
            <TableColumnHeader>{ t('tokenTransfers.block') }</TableColumnHeader>
            <TableColumnHeader>{ t('tokenTransfers.fromTo') }</TableColumnHeader>
            <TableColumnHeader>{ t('tokenTransfers.tokenId') }</TableColumnHeader>
            <TableColumnHeader isNumeric>{ t('tokenTransfers.amount') }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { items?.map((item, index) => (
            <TokenTransferTableItem
              key={ item.transaction_hash + item.log_index + (isLoading ? index : '') + (chainData ? chainData.id : '') }
              item={ item }
              isLoading={ isLoading }
              chainData={ chainData }
            />
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default React.memo(TokenTransferTable);
