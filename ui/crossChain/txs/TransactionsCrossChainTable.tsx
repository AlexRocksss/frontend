import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { InterchainMessage } from '@blockscout/interchain-indexer-types';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { TableBody, TableColumnHeader, TableHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import TransactionsCrossChainTableItem from './TransactionsCrossChainTableItem';

interface Props {
  data: Array<InterchainMessage>;
  isLoading?: boolean;
  top?: number;
  stickyHeader?: boolean;
  currentAddress?: string;
}

const TransactionsCrossChainTable = ({ data, isLoading, top, stickyHeader, currentAddress }: Props) => {
  const { t } = useTranslation();
  const TableHeaderComponent = stickyHeader ? TableHeaderSticky : TableHeader;

  return (
    <AddressHighlightProvider>
      <TableRoot tableLayout="auto">
        <TableHeaderComponent top={ stickyHeader ? top : undefined }>
          <TableRow>
            <TableColumnHeader w="42px"/>
            { currentAddress && <TableColumnHeader w="44px"/> }
            <TableColumnHeader>{ t('crossChain.message') }</TableColumnHeader>
            <TableColumnHeader>
              <Flex alignItems="center" flexWrap="nowrap">
                { t('crossChain.timestamp') }
                <TimeFormatToggle/>
              </Flex>
            </TableColumnHeader>
            <TableColumnHeader>{ t('crossChain.msgSender') }</TableColumnHeader>
            <TableColumnHeader>{ t('crossChain.sourceTx') }</TableColumnHeader>
            <TableColumnHeader>{ t('crossChain.destTx') }</TableColumnHeader>
            <TableColumnHeader>{ t('crossChain.transf') }</TableColumnHeader>
            <TableColumnHeader>{ t('crossChain.sender') }</TableColumnHeader>
            <TableColumnHeader/>
            <TableColumnHeader>{ t('crossChain.recipient') }</TableColumnHeader>
            <TableColumnHeader>{ t('crossChain.protocol') }</TableColumnHeader>
          </TableRow>
        </TableHeaderComponent>
        <TableBody>
          { data.map((item, index) => (
            <TransactionsCrossChainTableItem
              key={ item.message_id + (isLoading ? String(index) : '') }
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

export default React.memo(TransactionsCrossChainTable);
