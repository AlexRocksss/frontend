import { Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import React from 'react';

import dayjs from 'lib/date/dayjs';
import { publicClient } from 'lib/web3/client';
import { mdash } from 'toolkit/utils/htmlEntities';
import FallbackRpcIcon from 'ui/shared/fallbacks/FallbackRpcIcon';
import GasPrice from 'ui/shared/gas/GasPrice';
import StatsWidget from 'ui/shared/stats/StatsWidget';
import { GWEI } from 'ui/shared/value/utils';

import type { HomeStatsItem } from '../utils';
import { isHomeStatsItemEnabled, sortHomeStatsItems } from '../utils';
import { useHomeRpcDataContext } from './rpcDataContext';

const StatsDegraded = () => {
  const { t } = useTranslation();

  const [ averageBlockTime, setAverageBlockTime ] = React.useState<number | undefined>(undefined);

  const { blocks, isLoading, enable } = useHomeRpcDataContext();

  const gasPriceQuery = useQuery({
    queryKey: [ 'RPC', 'gas-price' ],
    queryFn: async() => {
      if (!publicClient) {
        return null;
      }
      return publicClient.getGasPrice();
    },
    select: (data) => {
      if (!data) {
        return null;
      }
      const price = BigNumber(data.toString()).div(GWEI).toNumber();
      return {
        price,
        fiat_price: null,
        time: null,
        base_fee: null,
        priority_fee: null,
      };
    },
    enabled: Boolean(publicClient),
  });

  React.useEffect(() => {
    enable(true, 'stats-widgets');
    return () => {
      enable(false, 'stats-widgets');
    };
  }, [ enable ]);

  React.useEffect(() => {
    if (blocks.length > 1) {
      const timeDiffs = blocks
        .map((block, index) => {
          if (index > 0) {
            return dayjs(blocks[index - 1].timestamp).diff(dayjs(block.timestamp), 'seconds');
          }
          return 0;
        })
        .slice(1);
      const totalDiff = timeDiffs.reduce((acc, diff) => acc + diff, 0);
      setAverageBlockTime((prev) => {
        if (prev === undefined) {
          return totalDiff / timeDiffs.length;
        }
        return (prev + totalDiff) / (timeDiffs.length + 1);
      });
    }
  }, [ blocks ]);

  const items: Array<HomeStatsItem> = (() => {
    return [
      {
        id: 'latest_batch' as const,
        icon: 'txn_batches' as const,
        label: t('home.statLatestBatch'),
        value: mdash,
        isFallback: true,
      },
      {
        id: 'total_blocks' as const,
        icon: 'block' as const,
        label: t('home.statTotalBlocks'),
        value: blocks[0] ? blocks[0].height.toLocaleString() : mdash,
        isFallback: blocks[0] === undefined,
        hint: blocks[0] && !isLoading ? <FallbackRpcIcon/> : undefined,
      },
      {
        id: 'average_block_time' as const,
        icon: 'clock-light' as const,
        label: t('home.statAverageBlockTime'),
        value: averageBlockTime ? `${ averageBlockTime.toFixed(1) }s` : mdash,
        isFallback: averageBlockTime === undefined,
        hint: averageBlockTime && !isLoading ? <FallbackRpcIcon/> : undefined,
      },
      {
        id: 'total_txs' as const,
        icon: 'transactions' as const,
        label: t('home.statTotalTransactions'),
        value: mdash,
        isFallback: true,
      },
      {
        id: 'total_operational_txs' as const,
        icon: 'transactions' as const,
        label: t('home.statTotalOperationalTxs'),
        value: mdash,
        isFallback: true,
      },
      {
        id: 'latest_l1_state_batch' as const,
        icon: 'txn_batches' as const,
        label: t('home.statLatestL1StateBatch', { parent: 'L1' }),
        value: mdash,
        isFallback: true,
      },
      {
        id: 'wallet_addresses' as const,
        icon: 'wallet' as const,
        label: t('home.statWalletAddresses'),
        value: mdash,
        isFallback: true,
      },
      {
        id: 'gas_tracker' as const,
        icon: 'gas' as const,
        label: t('home.statGasTracker'),
        value: gasPriceQuery.data ? <GasPrice data={ gasPriceQuery.data }/> : mdash,
        isFallback: !gasPriceQuery.data,
        isLoading: gasPriceQuery.isLoading,
        hint: gasPriceQuery.data && !isLoading && !gasPriceQuery.isLoading ? <FallbackRpcIcon/> : undefined,
      },
      {
        id: 'btc_locked' as const,
        icon: 'coins/bitcoin' as const,
        label: t('home.statBtcLocked'),
        value: mdash,
        isFallback: true,
      },
      {
        id: 'current_epoch' as const,
        icon: 'hourglass' as const,
        label: t('home.statCurrentEpoch'),
        value: mdash,
        isFallback: true,
      },
    ]
      .filter(Boolean)
      .filter(isHomeStatsItemEnabled)
      .sort(sortHomeStatsItems);;
  })();

  if (items.length === 0) {
    return null;
  }

  return (
    <Grid
      gridTemplateColumns="1fr 1fr"
      gridGap={{ base: 1, lg: 2 }}
      flexBasis="50%"
      flexGrow={ 1 }
    >
      { items.map((item, index) => (
        <StatsWidget
          key={ item.id }
          { ...item }
          isLoading={ isLoading || item.isLoading }
          _last={ items.length % 2 === 1 && index === items.length - 1 ? { gridColumn: 'span 2' } : undefined }/>
      ),
      ) }
    </Grid>

  );
};

export default React.memo(StatsDegraded);
