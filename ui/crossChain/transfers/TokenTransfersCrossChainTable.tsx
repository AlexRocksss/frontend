import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { InterchainTransfer } from '@blockscout/interchain-indexer-types';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import TokenTransfersCrossChainTableItem from './TokenTransfersCrossChainTableItem';
import { getItemKey } from './utils';

interface Props {
  data: Array<InterchainTransfer>;
  isLoading?: boolean;
  top?: number;
  currentAddress?: string;
}

const TokenTransfersCrossChainTable = ({ data, isLoading, top, currentAddress }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot tableLayout="auto">
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader w="42px"/>
            { currentAddress && <TableColumnHeader w="44px"/> }
            <TableColumnHeader>{ t('crossChain.sourceToken') }</TableColumnHeader>
            <TableColumnHeader/>
            <TableColumnHeader>{ t('crossChain.targetToken') }</TableColumnHeader>
            <TableColumnHeader>{ t('crossChain.sourceTx') }</TableColumnHeader>
            <TableColumnHeader>{ t('crossChain.destTx') }</TableColumnHeader>
            <TableColumnHeader>{ t('crossChain.protocol') }</TableColumnHeader>
            <TableColumnHeader>{ t('crossChain.message') }</TableColumnHeader>
            <TableColumnHeader>
              <Flex alignItems="center" flexWrap="nowrap">
                { t('crossChain.timestamp') }
                <TimeFormatToggle/>
              </Flex>
            </TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { data.map((item, index) => (
            <TokenTransfersCrossChainTableItem
              key={ getItemKey(item, isLoading ? index : undefined) }
              data={ item }
              isLoading={ isLoading }
              currentAddress={ currentAddress }
            />
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default React.memo(TokenTransfersCrossChainTable);
