import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ValidatorsZilliqaItem } from 'types/api/validators';

import config from 'configs/app';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import ValidatorsTableItem from './ValidatorsTableItem';

interface Props {
  data: Array<ValidatorsZilliqaItem>;
  isLoading?: boolean;
  top?: number;
}

const ValidatorsTable = ({ data, isLoading, top }: Props) => {
  const { t } = useTranslation();
  return (
    <TableRoot>
      <TableHeaderSticky top={ top }>
        <TableRow>
          <TableColumnHeader width="50%">{ t('validators.blsPublicKeyHeader') }</TableColumnHeader>
          <TableColumnHeader width="15%">{ t('validators.indexHeader') }</TableColumnHeader>
          <TableColumnHeader width="35%" isNumeric>
            { t('validators.stakedHeader', { symbol: config.chain.currency.symbol }) }
          </TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { data.map((item, index) => (
          <ValidatorsTableItem
            key={ item.bls_public_key + (isLoading ? index : '') }
            data={ item }
            isLoading={ isLoading }/>
        )) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(ValidatorsTable);
