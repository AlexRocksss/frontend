import { Box, HStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import useApiQuery from 'lib/api/useApiQuery';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import useIsMobile from 'lib/hooks/useIsMobile';
import getQueryParamString from 'lib/router/getQueryParamString';
import { CELO_EPOCH } from 'stubs/epoch';
import { Tag } from 'toolkit/chakra/tag';
import { Tooltip } from 'toolkit/chakra/tooltip';
import EpochDetails from 'ui/epochs/EpochDetails';
import TextAd from 'ui/shared/ad/TextAd';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import PageTitle from 'ui/shared/Page/PageTitle';

const EpochPageContent = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const router = useRouter();
  const number = getQueryParamString(router.query.number);

  const epochQuery = useApiQuery('general:epoch_celo', {
    pathParams: {
      number: number,
    },
    queryOptions: {
      placeholderData: CELO_EPOCH,
    },
  });

  throwOnResourceLoadError(epochQuery);

  const isLoading = epochQuery.isPlaceholderData;

  const titleContentAfter = (() => {
    switch (epochQuery.data?.type) {
      case 'L1':
        return (
          <Tooltip content={ t('pages.epochL1Tooltip') }>
            <Tag loading={ isLoading }>{ epochQuery.data.type }</Tag>
          </Tooltip>
        );
      case 'L2':
        return (
          <Tooltip content={ t('pages.epochL2Tooltip') }>
            <Tag loading={ isLoading }>{ epochQuery.data.type }</Tag>
          </Tooltip>
        );
    }

    return null;
  })();

  const titleSecondRow = (() => {
    if (!epochQuery.data || epochQuery.data?.start_block_number === null) {
      return null;
    }

    const isTruncated = isMobile && Boolean(epochQuery.data.end_block_number);
    const truncationProps = isTruncated ? { truncation: 'constant' as const, truncationMaxSymbols: 6 } : undefined;

    return (
      <HStack textStyle={{ base: 'heading.sm', lg: 'heading.md' }} flexWrap="wrap">
        <Box color="text.secondary">Ranging from</Box>
        <BlockEntity
          number={ epochQuery.data.start_block_number }
          variant="subheading"
          { ...truncationProps }
        />
        { epochQuery.data.end_block_number && (
          <>
            <Box color="text.secondary">to</Box>
            <BlockEntity number={ epochQuery.data.end_block_number } variant="subheading" { ...truncationProps }/>
          </>
        ) }
      </HStack>
    );
  })();

  return (
    <>
      <TextAd mb={ 6 }/>
      <PageTitle
        title={ `Epoch #${ number }` }
        contentAfter={ titleContentAfter }
        secondRow={ titleSecondRow }
        isLoading={ isLoading }
      />
      { epochQuery.data && <EpochDetails data={ epochQuery.data } isLoading={ isLoading }/> }
    </>
  );
};

export default EpochPageContent;
