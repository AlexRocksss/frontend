import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TransactionType } from 'types/api/transaction';

import type { BadgeProps } from 'toolkit/chakra/badge';
import { Badge } from 'toolkit/chakra/badge';

export interface Props extends BadgeProps {
  types: Array<TransactionType>;
  isLoading?: boolean;
}

const TYPES_ORDER: Array<TransactionType> = [
  'blob_transaction',
  'rootstock_remasc',
  'rootstock_bridge',
  'token_creation',
  'contract_creation',
  'token_transfer',
  'contract_call',
  'coin_transfer',
];

const TxType = ({ types, isLoading, ...rest }: Props) => {
  const { t } = useTranslation();
  const typeToShow = types.sort((t1, t2) => TYPES_ORDER.indexOf(t1) - TYPES_ORDER.indexOf(t2))[0];

  let label;
  let colorPalette: BadgeProps['colorPalette'];

  switch (typeToShow) {
    case 'contract_call':
      label = t('tx.type_contractCall');
      colorPalette = 'blue';
      break;
    case 'blob_transaction':
      label = t('tx.type_blobTxn');
      colorPalette = 'yellow';
      break;
    case 'contract_creation':
      label = t('tx.type_contractCreation');
      colorPalette = 'blue';
      break;
    case 'token_transfer':
      label = t('tx.type_tokenTransfer');
      colorPalette = 'orange';
      break;
    case 'token_creation':
      label = t('tx.type_tokenCreation');
      colorPalette = 'orange';
      break;
    case 'coin_transfer':
      label = t('tx.type_coinTransfer');
      colorPalette = 'orange';
      break;
    case 'rootstock_remasc':
      label = t('tx.type_remasc');
      colorPalette = 'blue';
      break;
    case 'rootstock_bridge':
      label = t('tx.type_bridge');
      colorPalette = 'blue';
      break;
    default:
      label = t('tx.type_transaction');
      colorPalette = 'purple';
  }

  if (!label) {
    return null;
  }

  return (
    <Badge colorPalette={ colorPalette } loading={ isLoading } { ...rest }>
      { label }
    </Badge>
  );
};

export default TxType;
