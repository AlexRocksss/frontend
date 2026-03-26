import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import InternalTxsList from 'ui/internalTxs/InternalTxsList';
import InternalTxsTable from 'ui/internalTxs/InternalTxsTable';
import DataListDisplay from 'ui/shared/DataListDisplay';
import type { QueryWithPagesResult } from 'ui/shared/pagination/useQueryWithPages';

interface Props {
  query: QueryWithPagesResult<'general:block_internal_txs'>;
  top?: number;
}

const BlockInternalTxs = ({ query, top }: Props) => {
  const { t } = useTranslation();
  const { data, isPlaceholderData, isError } = query;

  const content = data?.items ? (
    <>
      <Box hideFrom="lg">
        <InternalTxsList data={ data.items } isLoading={ isPlaceholderData } showBlockInfo={ false }/>
      </Box>
      <Box hideBelow="lg">
        <InternalTxsTable data={ data.items } isLoading={ isPlaceholderData } top={ top } showBlockInfo={ false }/>
      </Box>
    </>
  ) : null;

  return (
    <DataListDisplay
      isError={ isError }
      itemsNum={ data?.items.length }
      emptyText={ t('blockDetails.noInternalTxs') }
    >
      { content }
    </DataListDisplay>
  );
};

export default React.memo(BlockInternalTxs);
