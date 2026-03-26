import { createListCollection, HStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TokensSortingValue } from 'types/api/tokens';
import type { PaginationParams } from 'ui/shared/pagination/types';

import { FilterInput } from 'toolkit/components/filters/FilterInput';
import ActionBar from 'ui/shared/ActionBar';
import Pagination from 'ui/shared/pagination/Pagination';
import Sort from 'ui/shared/sort/Sort';
import { SORT_OPTIONS } from 'ui/tokens/utils';

const SORT_KEY_MAP: Record<string, string> = {
  'default': 'sortDefault',
  'fiat_value-asc': 'sortPriceAsc',
  'fiat_value-desc': 'sortPriceDesc',
  'holders_count-asc': 'sortHoldersAsc',
  'holders_count-desc': 'sortHoldersDesc',
  'circulating_market_cap-asc': 'sortMarketCapAsc',
  'circulating_market_cap-desc': 'sortMarketCapDesc',
};

interface Props {
  pagination: PaginationParams;
  searchTerm: string | undefined;
  onSearchChange: (value: string) => void;
  sort: TokensSortingValue;
  onSortChange: (value: TokensSortingValue) => void;
  filter: React.ReactNode;
  inTabsSlot?: boolean;
}

const TokensActionBar = ({
  sort,
  onSortChange,
  searchTerm,
  onSearchChange,
  pagination,
  filter,
  inTabsSlot,
}: Props) => {
  const { t } = useTranslation();
  const sortCollection = createListCollection({
    items: SORT_OPTIONS.map((o) => ({
      ...o,
      label: t(`tokens.${ SORT_KEY_MAP[o.value] || o.value }` as 'tokens.sortDefault'),
    })),
  });

  const handleSortChange = React.useCallback(({ value }: { value: Array<string> }) => {
    onSortChange(value[0] as TokensSortingValue);
  }, [ onSortChange ]);

  const searchInput = (
    <FilterInput
      w={{ base: '100%', lg: '360px' }}
      size="sm"
      onChange={ onSearchChange }
      placeholder={ t('tokens.searchPlaceholder') }
      initialValue={ searchTerm }
    />
  );

  return (
    <>
      <HStack gap={ 3 } mb={ 6 } display={{ base: 'flex', lg: 'none' }}>
        { filter }
        <Sort
          name="tokens_sorting"
          defaultValue={ [ sort ] }
          collection={ sortCollection }
          onValueChange={ handleSortChange }
        />
        { searchInput }
      </HStack>
      <ActionBar
        mt={ inTabsSlot ? 0 : -6 }
        py={{ lg: inTabsSlot ? 0 : undefined }}
        justifyContent={ inTabsSlot ? 'space-between' : undefined }
        display={{ base: pagination.isVisible ? 'flex' : 'none', lg: 'flex' }}
      >
        <HStack gap={ 3 } display={{ base: 'none', lg: 'flex' }}>
          { filter }
          { searchInput }
        </HStack>
        <Pagination { ...pagination } ml={ inTabsSlot ? 8 : 'auto' }/>
      </ActionBar>
    </>
  );
};

export default React.memo(TokensActionBar);
