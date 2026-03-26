import { useTranslation } from 'next-i18next';
import React from 'react';

import { EmptyState } from 'toolkit/chakra/empty-state';
import { ContentLoader } from 'toolkit/components/loaders/ContentLoader';

import SearchResultsList from './SearchResultsList';
import SearchResultsTabAll from './SearchResultsTabAll';
import type { QueryType, SearchQueries } from './utils';

interface Props {
  isLoading: boolean;
  searchTerm: string;
  queries: SearchQueries;
  queryType: QueryType | undefined;
  beforeContent?: React.ReactNode;
}

const SearchResultTabContent = ({ isLoading, searchTerm, queries, queryType, beforeContent }: Props) => {
  const { t } = useTranslation();

  const emptySearchNameMap: Record<QueryType, string> = React.useMemo(() => ({
    addresses: t('multichain.emptySearchAddresses'),
    tokens: t('multichain.emptySearchTokens'),
    blockNumbers: t('multichain.emptySearchBlockNumbers'),
    blocks: t('multichain.emptySearchBlocks'),
    transactions: t('multichain.emptySearchTransactions'),
    nfts: t('multichain.emptySearchNfts'),
    domains: t('multichain.emptySearchDomains'),
  }), [ t ]);

  const content = (() => {
    if (isLoading) {
      return <ContentLoader maxW="240px"/>;
    }

    if (!searchTerm) {
      return (
        <EmptyState
          title={ t('multichain.lookingForSomething') }
          description={ t('multichain.trySearching') }
        />
      );
    }

    const hasResults = queryType ?
      queries[queryType]?.data?.pages?.[0]?.items && queries[queryType]?.data?.pages?.[0]?.items?.length > 0 :
      Object.values(queries).some((query) => query.data?.pages?.[0]?.items?.length > 0);

    if (!hasResults) {
      return (
        <EmptyState
          title={ queryType ? t('multichain.noTypeFound', { type: emptySearchNameMap[queryType] }) : t('multichain.noResultsFound') }
          description={ t('multichain.noResultsDescription') }
        />
      );
    }

    switch (queryType) {
      case 'addresses':
      case 'blocks':
      case 'blockNumbers':
      case 'transactions':
      case 'tokens':
      case 'nfts':
      case 'domains':
        return <SearchResultsList queryType={ queryType } query={ queries[queryType] }/>;
      default:
        return <SearchResultsTabAll queries={ queries }/>;
    }
  })();

  return (
    <>
      { beforeContent }
      { content }
    </>
  );
};

export default React.memo(SearchResultTabContent);
