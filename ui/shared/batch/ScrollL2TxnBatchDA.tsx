import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ScrollL2TxnBatch } from 'types/api/scrollL2';
import type { ExcludeUndefined } from 'types/utils';

import { Badge } from 'toolkit/chakra/badge';

export interface Props {
  container: ExcludeUndefined<ScrollL2TxnBatch['data_availability']['batch_data_container']>;
  isLoading?: boolean;
}

const ScrollL2TxnBatchDA = ({ container, isLoading }: Props) => {
  const { t } = useTranslation();

  const text = (() => {
    switch (container) {
      case 'in_blob4844':
        return t('batch.eip4844Blob');
      case 'in_calldata':
        return t('batch.calldata');
    }
  })();

  return (
    <Badge colorPalette="yellow" loading={ isLoading }>
      { text }
    </Badge>
  );
};

export default React.memo(ScrollL2TxnBatchDA);
