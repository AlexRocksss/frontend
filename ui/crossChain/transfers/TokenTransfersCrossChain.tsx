import { useTranslation } from 'next-i18next';
import React from 'react';

import useApiQuery from 'lib/api/useApiQuery';
import { INTERCHAIN_STATS_COMMON, INTERCHAIN_TRANSFER } from 'stubs/interchainIndexer';
import { generateListStub } from 'stubs/utils';
import { Skeleton } from 'toolkit/chakra/skeleton';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import StickyPaginationWithText from 'ui/shared/StickyPaginationWithText';

import TokenTransfersCrossChainContent from './TokenTransfersCrossChainContent';

const TokenTransfersCrossChain = () => {
  const { t } = useTranslation();
  const { data, isPlaceholderData, isError, pagination } = useQueryWithPages({
    resourceName: 'interchainIndexer:transfers',
    options: {
      placeholderData: generateListStub<'interchainIndexer:transfers'>(INTERCHAIN_TRANSFER, 50, { next_page_params: { page_token: 'token' } }),
    },
  });
  const statsQuery = useApiQuery('interchainIndexer:stats_common', {
    queryOptions: {
      placeholderData: INTERCHAIN_STATS_COMMON,
    },
  });

  const actionBarText = (
    <Skeleton loading={ statsQuery.isPlaceholderData || isPlaceholderData }>
      { t('crossChain.totalTransfersFound', { count: Number(statsQuery.data?.total_transfers).toLocaleString() }) }
    </Skeleton>
  );

  const actionBar = <StickyPaginationWithText text={ actionBarText } pagination={ pagination }/>;

  return (
    <TokenTransfersCrossChainContent
      items={ data?.items }
      isLoading={ isPlaceholderData }
      pagination={ pagination }
      isError={ isError }
      itemsNum={ data?.items.length }
      actionBar={ actionBar }
    />
  );
};

export default React.memo(TokenTransfersCrossChain);
