import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import React from 'react';

import type { AddressTokenBalance } from 'types/api/address';

import { default as Thead } from 'ui/shared/TheadSticky';

import ERC20TokensTableItem from './ERC20TokensTableItem';
import config from 'configs/app';

interface Props {
  data: Array<AddressTokenBalance>;
  top: number;
  isLoading: boolean;
}

const ERC20TokensTable = ({ data, top, isLoading }: Props) => {
  return (
    <Table variant="simple" size="sm">
      <Thead top={ top }>
        <Tr>
          <Th width="30%">{ config.t()('Asset') }</Th>
          <Th width="30%">{ config.t()('Contract address') }</Th>
          <Th width="10%" isNumeric>{ config.t()('Price') }</Th>
          <Th width="15%" isNumeric>{ config.t()('Quantity') }</Th>
          <Th width="15%" isNumeric>{ config.t()('Value') }</Th>
        </Tr>
      </Thead>
      <Tbody>
        { data.map((item, index) => (
          <ERC20TokensTableItem key={ item.token.address + (isLoading ? index : '') } { ...item } isLoading={ isLoading }/>
        )) }
      </Tbody>
    </Table>
  );
};

export default ERC20TokensTable;
