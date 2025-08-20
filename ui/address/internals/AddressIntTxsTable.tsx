import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import React from 'react';

import type { InternalTransaction } from 'types/api/internalTransaction';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { currencyUnits } from 'lib/units';
import { default as Thead } from 'ui/shared/TheadSticky';

import AddressIntTxsTableItem from './AddressIntTxsTableItem';
import config from "configs/app";
import { useTranslations } from 'next-intl';

interface Props {
  data: Array<InternalTransaction>;
  currentAddress: string;
  isLoading?: boolean;
}

const AddressIntTxsTable = ({ data, currentAddress, isLoading }: Props) => {
  const t = useTranslations();
  
  return (
    <AddressHighlightProvider>
      <Table variant="simple" size="sm">
        <Thead top={ 68 }>
          <Tr>
            <Th width="15%">{ t("Parent txn hash") }</Th>
            <Th width="15%">{ t("Type") }</Th>
            <Th width="10%">{ t("Block") }</Th>
            <Th width="40%">{ t("From/To") }</Th>
            <Th width="20%" isNumeric>
              { t("Value") } { currencyUnits.ether }
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          { data.map((item, index) => (
            <AddressIntTxsTableItem
              key={ item.transaction_hash + '_' + index }
              { ...item }
              currentAddress={ currentAddress }
              isLoading={ isLoading }
            />
          )) }
        </Tbody>
      </Table>
    </AddressHighlightProvider>

  );
};

export default AddressIntTxsTable;
