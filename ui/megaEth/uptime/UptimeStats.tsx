import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { UptimeRealTimeData } from 'types/api/megaEth';

import StatsWidget from 'ui/shared/stats/StatsWidget';

interface Props {
  realtimeData: UptimeRealTimeData | null;
}

const UptimeStats = ({ realtimeData }: Props) => {
  const { t } = useTranslation();

  return (
    <Box
      columnGap={ 2 }
      rowGap={ 2 }
      mb={ 8 }
      display="grid"
      gridTemplateColumns={{ base: '1fr', lg: 'repeat(4, 1fr)' }}
    >
      <StatsWidget
        label={ t('megaEth.currentTps') }
        hint={ t('megaEth.currentTpsHint') }
        value={ realtimeData ? Number(realtimeData.instant_tps).toLocaleString() : '-' }
      />
      <StatsWidget
        label={ t('megaEth.mGasS') }
        hint={ t('megaEth.mGasSHint') }
        value={ realtimeData ? Number(realtimeData.instant_mgas_per_second).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-' }
      />
      <StatsWidget
        label={ t('megaEth.blockHeight') }
        hint={ t('megaEth.blockHeightHint') }
        value={ realtimeData ? Number(realtimeData.latest_mini_block_id).toLocaleString() : '-' }
      />
      <StatsWidget
        label={ t('megaEth.blockTime') }
        hint={ t('megaEth.blockTimeHint') }
        valuePostfix=" ms"
        value={ realtimeData ? Number(realtimeData.instant_mini_block_interval).toLocaleString(undefined, { maximumFractionDigits: 2 }) : '-' }
      />
    </Box>
  );
};

export default React.memo(UptimeStats);
