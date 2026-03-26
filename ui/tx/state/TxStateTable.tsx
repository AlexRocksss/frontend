import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TxStateChange } from 'types/api/txStateChanges';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TxStateTableItem from 'ui/tx/state/TxStateTableItem';

interface Props {
  data: Array<TxStateChange>;
  isLoading?: boolean;
  top: number;
}

const TxStateTable = ({ data, isLoading, top }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <TableRoot minWidth="1000px" w="100%">
        <TableHeaderSticky top={ top }>
          <TableRow>
            <TableColumnHeader width="140px">{ t('tx.type') }</TableColumnHeader>
            <TableColumnHeader width="160px">{ t('tx.address') }</TableColumnHeader>
            <TableColumnHeader width="33%" isNumeric>{ t('tx.before') }</TableColumnHeader>
            <TableColumnHeader width="33%" isNumeric>{ t('tx.after') }</TableColumnHeader>
            <TableColumnHeader width="33%" isNumeric>{ t('tx.change') }</TableColumnHeader>
            <TableColumnHeader width="150px" minW="80px" maxW="150px">{ t('tx.tokenId') }</TableColumnHeader>
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { data.map((item, index) => <TxStateTableItem data={ item } key={ index } isLoading={ isLoading }/>) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default React.memo(TxStateTable);
