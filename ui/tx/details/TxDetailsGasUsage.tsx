import BigNumber from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Transaction } from 'types/api/transaction';

import { Skeleton } from 'toolkit/chakra/skeleton';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import TextSeparator from 'ui/shared/TextSeparator';
import Utilization from 'ui/shared/Utilization/Utilization';

interface Props {
  isLoading?: boolean;
  data: Transaction;
}

const TxDetailsGasUsage = ({ isLoading, data }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('tx.hintGasUsageAndLimit') }
        isLoading={ isLoading }
      >
        { t('tx.gasUsageAndLimit') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isLoading }>{ BigNumber(data.gas_used || 0).toFormat() }</Skeleton>
        <TextSeparator/>
        <Skeleton loading={ isLoading }>{ BigNumber(data.gas_limit).toFormat() }</Skeleton>
        <Utilization ml={ 4 } value={ BigNumber(data.gas_used || 0).dividedBy(BigNumber(data.gas_limit)).toNumber() } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(TxDetailsGasUsage);
