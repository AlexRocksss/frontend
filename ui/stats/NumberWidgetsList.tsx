import { Grid } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import useApiQuery from 'lib/api/useApiQuery';
import { STATS_COUNTER } from 'stubs/stats';
import StatsWidget from 'ui/shared/stats/StatsWidget';

import DataFetchAlert from '../shared/DataFetchAlert';

const UNITS_WITHOUT_SPACE = [ 's' ];

const NumberWidgetsList = () => {
  const { t } = useTranslation();
  const { data, isPlaceholderData, isError } = useApiQuery('stats:counters', {
    queryOptions: {
      placeholderData: { counters: Array(10).fill(STATS_COUNTER) },
    },
  });

  const counterTitles: Record<string, string> = {
    averageBlockTime: t('stats.counterAverageBlockTime'),
    totalAddresses: t('stats.counterTotalAddresses'),
    totalBlocks: t('stats.counterTotalBlocks'),
    totalTxns: t('stats.counterTotalTxns'),
    yesterdayTxns: t('stats.counterYesterdayTxns'),
    totalOperationalTxns: t('stats.counterTotalOperationalTxns'),
    yesterdayOperationalTxns: t('stats.counterYesterdayOperationalTxns'),
    newTxnsWindow: t('stats.counterNewTxnsWindow'),
    newOperationalTxnsWindow: t('stats.counterNewOperationalTxnsWindow'),
  };

  if (isError) {
    return <DataFetchAlert/>;
  }

  return (
    <Grid
      gridTemplateColumns={{ base: 'repeat(2, 50%)', lg: 'repeat(4, 25%)' }}
      gridGap={{ base: 1, lg: 2 }}
    >
      {
        data?.counters?.map(({ id, title, value, units, description }, index) => {

          let unitsStr = '';
          if (units && UNITS_WITHOUT_SPACE.includes(units)) {
            unitsStr = units;
          } else if (units) {
            unitsStr = ' ' + units;
          }

          const valueNum = Number(value);
          const maximumFractionDigits = valueNum < 10 ** -3 ? undefined : 3;

          return (
            <StatsWidget
              key={ id + (isPlaceholderData ? index : '') }
              label={ counterTitles[id] || title }
              value={ Number(value).toLocaleString(undefined, { maximumFractionDigits, notation: 'compact' }) }
              valuePostfix={ unitsStr }
              isLoading={ isPlaceholderData }
              hint={ description }
            />
          );
        })
      }
    </Grid>
  );
};

export default NumberWidgetsList;
