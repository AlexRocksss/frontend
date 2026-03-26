import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import StatsWidget from 'ui/shared/stats/StatsWidget';

interface Props {
  totalHcu: number;
  maxDepthHcu: number;
  operationCount: number;
  isLoading?: boolean;
}

const TxFHEOperationsStats = ({ totalHcu, maxDepthHcu, operationCount, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: '1fr', lg: 'repeat(3, calc(33.333% - 8px))' }}
      gap={ 3 }
      mb={ 6 }
    >
      <StatsWidget
        label={ t('fheOperations.totalHcuLabel') }
        hint={ t('fheOperations.totalHcuHint') }
        value={ (totalHcu || 0).toLocaleString() }
        isLoading={ isLoading }
      />
      <StatsWidget
        label={ t('fheOperations.maxDepthHcuLabel') }
        hint={ t('fheOperations.maxDepthHcuHint') }
        value={ (maxDepthHcu || 0).toLocaleString() }
        isLoading={ isLoading }
      />
      <StatsWidget
        label={ t('fheOperations.operationsLabel') }
        hint={ t('fheOperations.operationsHint') }
        value={ operationCount.toLocaleString() }
        isLoading={ isLoading }
      />
    </Box>
  );
};

export default React.memo(TxFHEOperationsStats);
