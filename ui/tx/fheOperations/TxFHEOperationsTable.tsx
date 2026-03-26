import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FheOperation } from 'types/api/fheOperations';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { TableBody, TableColumnHeader, TableHeader, TableRoot, TableRow } from 'toolkit/chakra/table';
import TxFHEOperationsTableItem from 'ui/tx/fheOperations/TxFHEOperationsTableItem';

interface Props {
  data: Array<FheOperation>;
  isLoading?: boolean;
}

const TxFHEOperationsTable = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <AddressHighlightProvider>
      <Box maxW="100%" overflowX="auto" hideBelow="lg">
        <TableRoot tableLayout="fixed" minWidth="900px" w="100%">
          <TableHeader>
            <TableRow>
              <TableColumnHeader width="10%">{ t('tx.index') }</TableColumnHeader>
              <TableColumnHeader width="15%">{ t('tx.operation') }</TableColumnHeader>
              <TableColumnHeader width="12%">{ t('tx.type') }</TableColumnHeader>
              <TableColumnHeader width="12%">{ t('tx.fheType') }</TableColumnHeader>
              <TableColumnHeader width="12%">{ t('tx.mode') }</TableColumnHeader>
              <TableColumnHeader width="12%">{ t('tx.hcuCost') }</TableColumnHeader>
              <TableColumnHeader width="12%">{ t('tx.hcuDepth') }</TableColumnHeader>
              <TableColumnHeader width="24%">{ t('tx.caller') }</TableColumnHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            { data.map((op) => (
              <TxFHEOperationsTableItem
                key={ op.log_index }
                { ...op }
                isLoading={ isLoading }
              />
            )) }
          </TableBody>
        </TableRoot>
      </Box>
    </AddressHighlightProvider>
  );
};

export default React.memo(TxFHEOperationsTable);
