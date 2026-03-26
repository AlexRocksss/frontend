import { Box, chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { CeloEpochDetails } from 'types/api/epochs';

import useIsMobile from 'lib/hooks/useIsMobile';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import CeloEpochStatus from 'ui/shared/statusTag/CeloEpochStatus';
import TokenTransferSnippet from 'ui/shared/TokenTransferSnippet/TokenTransferSnippet';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';
import TokenValue from 'ui/shared/value/TokenValue';

import EpochElectionRewards from './electionRewards/EpochElectionRewards';

interface Props {
  data: CeloEpochDetails;
  isLoading?: boolean;
}

const EpochDetails = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const processingRange = (() => {
    if (!data.start_processing_block_number || !data.end_processing_block_number) {
      return <Box color="text.secondary">N/A</Box>;
    }

    if (data.start_processing_block_number === data.end_processing_block_number) {
      return <BlockEntity number={ data.start_processing_block_number } isLoading={ isLoading } noIcon/>;
    }

    return (
      <>
        <BlockEntity number={ data.start_processing_block_number } isLoading={ isLoading } noIcon/>
        <chakra.span color="text.secondary" whiteSpace="pre"> - </chakra.span>
        <BlockEntity number={ data.end_processing_block_number } isLoading={ isLoading } noIcon/>
      </>
    );
  })();

  const totalFundRewards = (() => {
    if (!data.distribution?.transfers_total?.total?.value) {
      return <Box color="text.secondary">N/A</Box>;
    }

    if (data.distribution?.transfers_total?.token) {
      return (
        <TokenValue
          amount={ data.distribution?.transfers_total?.total?.value }
          token={ data.distribution?.transfers_total.token }
          decimals={ data.distribution?.transfers_total?.total?.decimals }
          accuracy={ 0 }
          loading={ isLoading }
        />
      );
    }

    return (
      <NativeCoinValue
        amount={ data.distribution?.transfers_total?.total?.value }
        accuracy={ 0 }
        loading={ isLoading }
      />
    );
  })();

  return (
    <>
      <DetailedInfo.Container>
        <DetailedInfo.ItemLabel
          hint={ t('epochs.statusHint') }
          isLoading={ isLoading }
        >
          { t('epochs.status') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <CeloEpochStatus
            isFinalized={ data.is_finalized }
            loading={ isLoading }
          />
        </DetailedInfo.ItemValue>
        <DetailedInfo.ItemLabel
          hint={ t('epochs.timestampHint') }
          isLoading={ isLoading }
        >
          { t('epochs.timestamp') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { data.timestamp ?
            <DetailedInfoTimestamp timestamp={ data.timestamp } isLoading={ isLoading }/> :
            <Box color="text.secondary" whiteSpace="pre-wrap">{ t('epochs.epochsNote') }</Box> }
        </DetailedInfo.ItemValue>
        <DetailedInfo.ItemLabel
          hint={ t('epochs.processingRangeHint') }
          isLoading={ isLoading }
        >
          { t('epochs.processingRange') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { processingRange }
        </DetailedInfo.ItemValue>
        <DetailedInfo.ItemLabel
          hint={ t('epochs.communityFundHint') }
          isLoading={ isLoading }
        >
          { t('epochs.communityFund') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue multiRow>
          { data.distribution?.community_transfer ? (
            <TokenTransferSnippet
              data={ data.distribution.community_transfer }
              isLoading={ isLoading }
              noAddressIcons={ isMobile }
            />
          ) : (
            <Box color="text.secondary">N/A</Box>
          ) }
        </DetailedInfo.ItemValue>
        <DetailedInfo.ItemLabel
          hint={ t('epochs.carbonOffsetFundHint') }
          isLoading={ isLoading }
        >
          { t('epochs.carbonOffsetFund') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue multiRow>
          { data.distribution?.carbon_offsetting_transfer ? (
            <TokenTransferSnippet
              data={ data.distribution.carbon_offsetting_transfer }
              isLoading={ isLoading }
              noAddressIcons={ isMobile }
            />
          ) : (
            <Box color="text.secondary">N/A</Box>
          ) }
        </DetailedInfo.ItemValue>
        <DetailedInfo.ItemLabel
          hint={ t('epochs.totalFundRewardsHint') }
          isLoading={ isLoading }
        >
          { t('epochs.totalFundRewards') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { totalFundRewards }
        </DetailedInfo.ItemValue>
      </DetailedInfo.Container>
      <EpochElectionRewards data={ data } isLoading={ isLoading }/>
    </>
  );
};

export default React.memo(EpochDetails);
