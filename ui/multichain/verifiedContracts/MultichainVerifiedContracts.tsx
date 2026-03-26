import { Box, createListCollection, HStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { VerifiedContractsSortingValue } from 'types/api/verifiedContracts';

import { MultichainProvider } from 'lib/contexts/multichain';
import useIsMobile from 'lib/hooks/useIsMobile';
import type { SelectOption } from 'toolkit/chakra/select';
import { FilterInput } from 'toolkit/components/filters/FilterInput';
import ChainSelect from 'ui/multichain/components/ChainSelect';
import ActionBar from 'ui/shared/ActionBar';
import DataListDisplay from 'ui/shared/DataListDisplay';
import PageTitle from 'ui/shared/Page/PageTitle';
import Pagination from 'ui/shared/pagination/Pagination';
import Sort from 'ui/shared/sort/Sort';
import useVerifiedContractsQuery from 'ui/verifiedContracts/useVerifiedContractsQuery';
import VerifiedContractsCounters from 'ui/verifiedContracts/VerifiedContractsCounters';
import VerifiedContractsFilter from 'ui/verifiedContracts/VerifiedContractsFilter';
import VerifiedContractsList from 'ui/verifiedContracts/VerifiedContractsList';
import VerifiedContractsTable from 'ui/verifiedContracts/VerifiedContractsTable';

const MultichainVerifiedContracts = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const { query, type, searchTerm, sort, onSearchTermChange, onTypeChange, onSortChange } = useVerifiedContractsQuery({ isMultichain: true });

  const sortCollection = React.useMemo(() => {
    const items: Array<SelectOption<VerifiedContractsSortingValue>> = [
      { label: t('verifiedContracts.sortDefault'), value: 'default' },
      { label: t('verifiedContracts.sortBalanceDesc'), value: 'balance-desc' },
      { label: t('verifiedContracts.sortBalanceAsc'), value: 'balance-asc' },
      { label: t('verifiedContracts.sortTxsCountDesc'), value: 'transactions_count-desc' },
      { label: t('verifiedContracts.sortTxsCountAsc'), value: 'transactions_count-asc' },
    ];
    return createListCollection({ items });
  }, [ t ]);
  const { isError, isPlaceholderData, data, pagination, chainValue, onChainValueChange } = query;

  const typeFilter = (
    <VerifiedContractsFilter
      onChange={ onTypeChange }
      defaultValue={ type }
      hasActiveFilter={ Boolean(type) }
    />
  );

  const filterInput = (
    <FilterInput
      w={{ base: '100%', lg: '350px' }}
      size="sm"
      onChange={ onSearchTermChange }
      placeholder={ t('multichain.contractSearchPlaceholder') }
      initialValue={ searchTerm }
    />
  );

  const sortButton = (
    <Sort
      name="verified_contracts_sorting"
      defaultValue={ [ sort ] }
      collection={ sortCollection }
      onValueChange={ onSortChange }
      isLoading={ isPlaceholderData }
    />
  );

  const actionBar = (
    <>
      <HStack gap={ 3 } mb={ 6 } display={{ base: 'flex', lg: 'none' }}>
        { typeFilter }
        { sortButton }
        { filterInput }
      </HStack>
      { (!isMobile || pagination.isVisible) && (
        <ActionBar mt={ -6 }>
          <HStack gap={ 3 } display={{ base: 'none', lg: 'flex' }}>
            { typeFilter }
            { filterInput }
          </HStack>
          <Pagination ml="auto" { ...pagination }/>
        </ActionBar>
      ) }
    </>
  );

  const content = data?.items ? (
    <>
      <Box hideFrom="lg">
        <VerifiedContractsList data={ data.items } isLoading={ isPlaceholderData }/>
      </Box>
      <Box hideBelow="lg">
        <VerifiedContractsTable data={ data.items } sort={ sort } setSorting={ onSortChange } isLoading={ isPlaceholderData }/>
      </Box>
    </>
  ) : null;

  return (
    <Box>
      <PageTitle
        title={ t('multichain.verifiedContracts') }
        withTextAd
      />
      <ChainSelect
        value={ chainValue }
        onValueChange={ onChainValueChange }
        mode="default"
        mb={ 3 }
      />
      <MultichainProvider chainId={ chainValue?.[0] }>
        <VerifiedContractsCounters/>
        <DataListDisplay
          isError={ isError }
          itemsNum={ data?.items.length }
          emptyText={ t('multichain.noVerifiedContracts') }
          hasActiveFilters={ Boolean(searchTerm || type) }
          emptyStateProps={{
            term: 'contract',
          }}
          actionBar={ actionBar }
        >
          { content }
        </DataListDisplay>
      </MultichainProvider>
    </Box>
  );
};

export default React.memo(MultichainVerifiedContracts);
