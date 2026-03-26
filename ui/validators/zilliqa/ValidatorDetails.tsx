import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ValidatorZilliqa } from 'types/api/validators';

import { Skeleton } from 'toolkit/chakra/skeleton';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoSponsoredItem from 'ui/shared/DetailedInfo/DetailedInfoSponsoredItem';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import NativeTokenIcon from 'ui/shared/NativeTokenIcon';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';

interface Props {
  data: ValidatorZilliqa;
  isLoading: boolean;
}

const ValidatorDetails = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <DetailedInfo.Container>
      <DetailedInfo.ItemLabel
        hint={ t('validators.indexHint') }
        isLoading={ isLoading }
      >
        { t('validators.indexLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isLoading } display="inline">
          { data.index }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('validators.stakedHint') }
        isLoading={ isLoading }
      >
        { t('validators.stakedLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <NativeCoinValue
          startElement={ <NativeTokenIcon isLoading={ isLoading } boxSize={ 5 } mr={ 2 }/> }
          amount={ data.balance }
          loading={ isLoading }
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('validators.peerIdHint') }
        isLoading={ isLoading }
      >
        { t('validators.peerIdLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Flex alignItems="center" w="100%" minWidth={ 0 }>
          <Skeleton loading={ isLoading } maxW="calc(100% - 28px)" overflow="hidden">
            <HashStringShortenDynamic hash={ data.peer_id }/>
          </Skeleton>
          <CopyToClipboard text={ data.peer_id } isLoading={ isLoading }/>
        </Flex>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('validators.controlAddressHint') }
        isLoading={ isLoading }
      >
        { t('validators.controlAddressLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressEntity address={ data.control_address } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('validators.rewardAddressHint') }
        isLoading={ isLoading }
      >
        { t('validators.rewardAddressLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressEntity address={ data.reward_address } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('validators.signingAddressHint') }
        isLoading={ isLoading }
      >
        { t('validators.signingAddressLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressEntity address={ data.signing_address } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('validators.addedAtBlockHint') }
        isLoading={ isLoading }
      >
        { t('validators.addedAtBlockLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <BlockEntity number={ data.added_at_block_number } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('validators.stakeUpdatedHint') }
        isLoading={ isLoading }
      >
        { t('validators.stakeUpdatedLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <BlockEntity number={ data.stake_updated_at_block_number } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      <DetailedInfoSponsoredItem isLoading={ isLoading }/>
    </DetailedInfo.Container>
  );
};

export default React.memo(ValidatorDetails);
