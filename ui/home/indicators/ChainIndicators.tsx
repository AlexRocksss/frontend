import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TChainIndicator } from './types';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { HOMEPAGE_STATS, HOMEPAGE_STATS_MICROSERVICE } from 'stubs/stats';
import IconSvg from 'ui/shared/IconSvg';
import NativeTokenIcon from 'ui/shared/NativeTokenIcon';

import ChainIndicatorsChart from './ChainIndicatorsChart';
import ChainIndicatorsContainer from './ChainIndicatorsContainer';
import ChainIndicatorsList from './ChainIndicatorsList';
import useChartDataQuery from './useChartDataQuery';
import { isIndicatorEnabled, sortIndicators } from './utils/indicators';

const isStatsFeatureEnabled = config.features.stats.isEnabled;
const rollupFeature = config.features.rollup;
const isOptimisticRollup = rollupFeature.isEnabled && rollupFeature.type === 'optimistic';
const isArbitrumRollup = rollupFeature.isEnabled && rollupFeature.type === 'arbitrum';

const ChainIndicators = () => {
  const { t } = useTranslation();
  const statsMicroserviceQueryResult = useApiQuery('stats:pages_main', {
    queryOptions: {
      refetchOnMount: false,
      enabled: isStatsFeatureEnabled,
      placeholderData: HOMEPAGE_STATS_MICROSERVICE,
    },
  });

  const statsApiQueryResult = useApiQuery('general:stats', {
    queryOptions: {
      refetchOnMount: false,
      placeholderData: HOMEPAGE_STATS,
    },
  });

  const indicators: Array<TChainIndicator> = React.useMemo(() => {
    return [
      {
        id: 'daily_txs' as const,
        title: t('home.indicatorDailyTransactions'),
        value: (() => {
          const STRING_FORMAT = { maximumFractionDigits: 2, notation: 'compact' as const };
          if (isStatsFeatureEnabled) {
            if (typeof statsMicroserviceQueryResult?.data?.yesterday_transactions?.value === 'string') {
              return Number(statsMicroserviceQueryResult.data.yesterday_transactions.value).toLocaleString(undefined, STRING_FORMAT);
            }
          } else {
            if (typeof statsApiQueryResult?.data?.transactions_today === 'string') {
              return Number(statsApiQueryResult.data.transactions_today).toLocaleString(undefined, STRING_FORMAT);
            }
          }
          return 'N/A';
        })(),
        hint: t('home.indicatorDailyTransactionsHint'),
        // FIXME use non-navigation icon
        icon: <IconSvg name="navigation/transactions" boxSize={ 6 } bgColor="#56ACD1" borderRadius="base" color="white"/>,
      },
      {
        id: 'daily_operational_txs' as const,
        title: t('home.indicatorDailyOpTxns'),
        titleShort: t('home.indicatorDailyOpTxns'),
        value: (() => {
          const STRING_FORMAT = { maximumFractionDigits: 2, notation: 'compact' as const };
          if (isStatsFeatureEnabled) {
            if (isArbitrumRollup && typeof statsMicroserviceQueryResult?.data?.yesterday_operational_transactions?.value === 'string') {
              return Number(statsMicroserviceQueryResult.data.yesterday_operational_transactions.value).toLocaleString(undefined, STRING_FORMAT);
            }
            if (isOptimisticRollup && typeof statsMicroserviceQueryResult?.data?.op_stack_yesterday_operational_transactions?.value === 'string') {
              return Number(statsMicroserviceQueryResult.data.op_stack_yesterday_operational_transactions.value).toLocaleString(undefined, STRING_FORMAT);
            }
          }
          return 'N/A';
        })(),
        hint: t('home.indicatorDailyOpTxnsHint'),
        // FIXME use non-navigation icon
        icon: <IconSvg name="navigation/transactions" boxSize={ 6 } bgColor="#56ACD1" borderRadius="base" color="white"/>,
      },
      {
        id: 'coin_price' as const,
        title: t('home.indicatorCoinPrice', { symbol: config.chain.currency.symbol }),
        value: typeof statsApiQueryResult.data?.coin_price !== 'string' ?
          '$N/A' :
          '$' + Number(statsApiQueryResult.data?.coin_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }),
        valueDiff: typeof statsApiQueryResult.data?.coin_price_change_percentage === 'number' ?
          statsApiQueryResult.data.coin_price_change_percentage :
          undefined,
        hint: t('home.indicatorCoinPriceHint', { symbol: config.chain.currency.symbol }),
        icon: <NativeTokenIcon boxSize={ 6 }/>,
      },
      {
        id: 'secondary_coin_price' as const,
        title: t('home.indicatorCoinPrice', { symbol: config.chain.secondaryCoin.symbol }),
        value: typeof statsApiQueryResult.data?.secondary_coin_price !== 'string' ?
          '$N/A' :
          '$' + Number(statsApiQueryResult.data?.secondary_coin_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }),
        hint: t('home.indicatorCoinPriceHint', { symbol: config.chain.secondaryCoin.symbol }),
        icon: <NativeTokenIcon boxSize={ 6 } type="secondary"/>,
      },
      {
        id: 'market_cap' as const,
        title: t('home.indicatorMarketCap'),
        value: typeof statsApiQueryResult.data?.market_cap !== 'string' ?
          '$N/A' :
          '$' + Number(statsApiQueryResult.data.market_cap).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }),
        hint: t('home.indicatorMarketCapHint'),
        icon: <IconSvg name="globe" boxSize={ 6 } bgColor="#6A5DCC" borderRadius="base" color="white"/>,
      },
      {
        id: 'tvl' as const,
        title: t('home.indicatorTotalValueLocked'),
        value: typeof statsApiQueryResult.data?.tvl !== 'string' ?
          '$N/A' :
          '$' + Number(statsApiQueryResult.data.tvl).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' }),
        hint: t('home.indicatorTotalValueLockedHint'),
        icon: <IconSvg name="lock" boxSize={ 6 } bgColor="#517FDB" borderRadius="base" color="white"/>,
      },
    ]
      .filter(isIndicatorEnabled)
      .sort(sortIndicators);
  }, [ statsApiQueryResult?.data, statsMicroserviceQueryResult?.data, t ]);

  const [ selectedIndicatorId, selectIndicatorId ] = React.useState(indicators[0]?.id);
  const selectedIndicator = indicators.find(({ id }) => id === selectedIndicatorId);

  const chartQuery = useChartDataQuery(selectedIndicatorId);

  if (indicators.length === 0) {
    return null;
  }

  const isLoading = (isStatsFeatureEnabled && statsMicroserviceQueryResult.isPlaceholderData) || statsApiQueryResult.isPlaceholderData;

  return (
    <ChainIndicatorsContainer>
      { selectedIndicator && (
        <ChainIndicatorsChart
          isLoading={ isLoading }
          title={ selectedIndicator.title }
          hint={ selectedIndicator.hint }
          value={ selectedIndicator?.value }
          valueDiff={ selectedIndicator?.valueDiff }
          chartQuery={ chartQuery }
        />
      ) }
      <ChainIndicatorsList
        indicators={ indicators }
        isLoading={ isLoading }
        selectedId={ selectedIndicatorId }
        onItemClick={ selectIndicatorId }
      />
    </ChainIndicatorsContainer>
  );
};

export default ChainIndicators;
