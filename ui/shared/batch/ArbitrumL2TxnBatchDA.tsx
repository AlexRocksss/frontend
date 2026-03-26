import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ArbitrumL2TxnBatchesItem } from 'types/api/arbitrumL2';

import { Badge } from 'toolkit/chakra/badge';

export interface Props {
  dataContainer: ArbitrumL2TxnBatchesItem['batch_data_container'];
  isLoading?: boolean;
}

const ArbitrumL2TxnBatchDA = ({ dataContainer, isLoading }: Props) => {
  const { t } = useTranslation();

  let text: string;

  if (dataContainer === null) {
    return null;
  }

  switch (dataContainer) {
    case 'in_blob4844':
      text = t('batch.blob');
      break;
    case 'in_anytrust':
      text = t('batch.anyTrust');
      break;
    case 'in_calldata':
      text = t('batch.calldata');
      break;
    case 'in_celestia':
      text = t('batch.celestia');
      break;
    default:
      text = '';
  }

  if (!text) {
    return null;
  }

  return (
    <Badge loading={ isLoading } colorPalette={ dataContainer === 'in_blob4844' ? 'yellow' : 'gray' }>
      { text }
    </Badge>
  );
};

export default ArbitrumL2TxnBatchDA;
