import { useTranslation } from 'next-i18next';
import React from 'react';

import type { InteropMessage } from 'types/api/interop';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import InteropMessagesTableItem from './InteropMessagesTableItem';

interface Props {
  items?: Array<InteropMessage>;
  top: number;
  isLoading?: boolean;
}

const InteropMessagesTable = ({ items, top, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot tableLayout="auto">
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader/>
          <TableColumnHeader>{ t('interopMessages.messageCol') }</TableColumnHeader>
          <TableColumnHeader>
            { t('interopMessages.timestamp') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          <TableColumnHeader>{ t('interopMessages.status') }</TableColumnHeader>
          <TableColumnHeader>{ t('interopMessages.sourceTx') }</TableColumnHeader>
          <TableColumnHeader>{ t('interopMessages.destinationTx') }</TableColumnHeader>
          <TableColumnHeader>{ t('interopMessages.sender') }</TableColumnHeader>
          <TableColumnHeader>{ t('interopMessages.inOut') }</TableColumnHeader>
          <TableColumnHeader>{ t('interopMessages.target') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items?.map((item, index) => (
          <InteropMessagesTableItem
            key={ item.init_transaction_hash + '_' + index }
            item={ item }
            isLoading={ isLoading }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(InteropMessagesTable);
