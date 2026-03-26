import { useTranslation } from 'next-i18next';
import React from 'react';

import type { AddressTokensErc20Item } from './types';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import ERC20TokensTableItem from './ERC20TokensTableItem';

interface Props {
  data: Array<AddressTokensErc20Item>;
  top: number;
  isLoading: boolean;
  hasAdditionalTokenTypes?: boolean;
}

const ERC20TokensTable = ({ data, top, isLoading, hasAdditionalTokenTypes }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="30%">{ t('address.erc20Asset') }</TableColumnHeader>
          <TableColumnHeader width="30%">{ t('address.erc20ContractAddress') }</TableColumnHeader>
          <TableColumnHeader width="10%" isNumeric>{ t('address.erc20Price') }</TableColumnHeader>
          <TableColumnHeader width="15%" isNumeric>{ t('address.erc20Quantity') }</TableColumnHeader>
          <TableColumnHeader width="15%" isNumeric>{ t('address.erc20Value') }</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data.map((item, index) => (
          <ERC20TokensTableItem
            key={ item.token.address_hash + (isLoading ? index : '') + (item.chain_values ? Object.keys(item.chain_values).join(',') : '') }
            { ...item }
            isLoading={ isLoading }
            hasAdditionalTokenTypes={ hasAdditionalTokenTypes }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default ERC20TokensTable;
