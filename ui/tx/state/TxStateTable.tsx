import {
  Table,
  Tbody,
  Tr,
  Th,
} from '@chakra-ui/react';
import React from 'react';

import type { TxStateChange } from 'types/api/txStateChanges';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { default as Thead } from 'ui/shared/TheadSticky';
import TxStateTableItem from 'ui/tx/state/TxStateTableItem';
import config from 'configs/app';

interface Props {
  data: Array<TxStateChange>;
  isLoading?: boolean;
  top: number;
}

const TxStateTable = ({ data, isLoading, top }: Props) => {
  return (
    <AddressHighlightProvider>
      <Table variant="simple" minWidth="1000px" size="sm" w="100%">
        <Thead top={ top }>
          <Tr>
            <Th width="140px">{ config.t()('Type') }</Th>
            <Th width="160px">{ config.t()('Address') }</Th>
            <Th width="33%" isNumeric>{ config.t()('Before') }</Th>
            <Th width="33%" isNumeric>{ config.t()('After') }</Th>
            <Th width="33%" isNumeric>{ config.t()('Change') }</Th>
            <Th width="150px" minW="80px" maxW="150px">{ config.t()('Token') } ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          { data.map((item, index) => <TxStateTableItem data={ item } key={ index } isLoading={ isLoading }/>) }
        </Tbody>
      </Table>
    </AddressHighlightProvider>
  );
};

export default React.memo(TxStateTable);
