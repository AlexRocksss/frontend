import { chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import getNetworkUtilizationParams from 'lib/networks/getNetworkUtilizationParams';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { mdash } from 'toolkit/utils/htmlEntities';

interface Props {
  percentage: number;
  isLoading: boolean;
}

const LOAD_KEYS = { high: 'gasTracker.loadHigh', medium: 'gasTracker.loadMedium', low: 'gasTracker.loadLow' } as const;

const GasTrackerNetworkUtilization = ({ percentage, isLoading }: Props) => {
  const { t } = useTranslation();
  const { load, color } = getNetworkUtilizationParams(percentage);

  return (
    <Skeleton loading={ isLoading } whiteSpace="pre-wrap">
      <span>{ t('gasTracker.networkUtilization') } </span>
      <chakra.span color={ color }>
        { percentage.toFixed(2) }% { mdash } { t(LOAD_KEYS[load as keyof typeof LOAD_KEYS]) } { t('gasTracker.loadSuffix') }
      </chakra.span>
    </Skeleton>
  );
};

export default React.memo(GasTrackerNetworkUtilization);
