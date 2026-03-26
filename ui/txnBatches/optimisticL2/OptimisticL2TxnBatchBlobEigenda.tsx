import { Flex, GridItem, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { OptimisticL2BlobTypeEigenda } from 'types/api/optimisticL2';

import { layerLabels } from 'lib/rollups/utils';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';

import OptimisticL2TxnBatchBlobWrapper from './OptimisticL2TxnBatchBlobWrapper';

interface Props {
  blobs: Array<OptimisticL2BlobTypeEigenda>;
  isLoading: boolean;
}

const OptimisticL2TxnBatchBlobEigenda = ({ blobs, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <VStack rowGap={ 2 } w="100%">
      { blobs.map((blob) => {
        return (
          <OptimisticL2TxnBatchBlobWrapper key={ blob.cert } isLoading={ isLoading }>
            <GridItem fontWeight={ 600 }>{ t('txnBatches.certLabel') }</GridItem>
            <GridItem overflow="hidden">
              <Flex minW="0" w="calc(100% - 20px)">
                <HashStringShortenDynamic hash={ blob.cert }/>
                <CopyToClipboard text={ blob.cert }/>
              </Flex>
            </GridItem>
            <GridItem fontWeight={ 600 }>{ t('txnBatches.timestampLabel') }</GridItem>
            <GridItem overflow="hidden">
              <DetailedInfoTimestamp timestamp={ blob.l1_timestamp } isLoading={ isLoading } flexWrap={{ base: 'wrap', lg: 'nowrap' }}/>
            </GridItem>
            <GridItem fontWeight={ 600 }>{ t('txnBatches.parentTxHashLabel', { parent: layerLabels.parent }) }</GridItem>
            <GridItem overflow="hidden">
              <TxEntityL1 hash={ blob.l1_transaction_hash } noIcon/>
            </GridItem>
          </OptimisticL2TxnBatchBlobWrapper>
        );
      }) }
    </VStack>

  );
};

export default React.memo(OptimisticL2TxnBatchBlobEigenda);
