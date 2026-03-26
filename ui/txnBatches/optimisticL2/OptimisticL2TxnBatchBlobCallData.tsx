import { GridItem } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { layerLabels } from 'lib/rollups/utils';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';

import OptimisticL2TxnBatchBlobWrapper from './OptimisticL2TxnBatchBlobWrapper';

interface Props {
  l1TxHashes: Array<string>;
  l1Timestamp: string;
  isLoading: boolean;
}

const OptimisticL2TxnBatchBlobCallData = ({ l1TxHashes, l1Timestamp, isLoading }: Props) => {
  const { t } = useTranslation();
  return (
    <OptimisticL2TxnBatchBlobWrapper isLoading={ isLoading }>
      <GridItem fontWeight={ 600 }>{ t('txnBatches.timestampLabel') }</GridItem>
      <GridItem overflow="hidden">
        <DetailedInfoTimestamp timestamp={ l1Timestamp } isLoading={ isLoading } flexWrap={{ base: 'wrap', lg: 'nowrap' }}/>
      </GridItem>
      <GridItem fontWeight={ 600 }>
        { t(l1TxHashes.length > 1 ? 'txnBatches.parentTxHashesLabel' : 'txnBatches.parentTxHashLabel',
          { parent: layerLabels.parent }) }
      </GridItem>
      <GridItem overflow="hidden" display="flex" flexDir="column" rowGap={ 2 }>
        { l1TxHashes.map((hash) => <TxEntityL1 key={ hash } hash={ hash } noIcon/>) }
      </GridItem>
    </OptimisticL2TxnBatchBlobWrapper>

  );
};

export default React.memo(OptimisticL2TxnBatchBlobCallData);
