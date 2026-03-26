import { useTranslation } from 'next-i18next';
import React from 'react';

import type { OptimisticL2TxnBatchesItem } from 'types/api/optimisticL2';
import type { ExcludeUndefined } from 'types/utils';

import type { BadgeProps } from 'toolkit/chakra/badge';
import { Badge } from 'toolkit/chakra/badge';

export interface Props extends BadgeProps {
  container: ExcludeUndefined<OptimisticL2TxnBatchesItem['batch_data_container']>;
  isLoading?: boolean;
}

const OptimisticL2TxnBatchDA = ({ container, isLoading, ...rest }: Props) => {
  const { t } = useTranslation();

  const text = (() => {
    switch (container) {
      case 'in_blob4844':
        return t('batch.eip4844Blob');
      case 'in_calldata':
        return t('batch.calldata');
      case 'in_celestia':
        return t('batch.celestiaBlob');
      case 'in_eigenda':
        return t('batch.eigenDA');
    }
  })();

  if (!text) {
    return null;
  }

  return (
    <Badge colorPalette="yellow" loading={ isLoading } { ...rest }>
      { text }
    </Badge>
  );
};

export default React.memo(OptimisticL2TxnBatchDA);
