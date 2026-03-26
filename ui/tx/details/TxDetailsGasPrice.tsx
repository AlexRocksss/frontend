import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TokenInfo } from 'types/api/token';

import config from 'configs/app';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import GasPriceValue from 'ui/shared/value/GasPriceValue';
import TokenValue from 'ui/shared/value/TokenValue';

interface Props {
  gasToken?: TokenInfo | null;
  gasPrice: string | null;
  isLoading?: boolean;
}

const TxDetailsGasPrice = ({ gasPrice, gasToken, isLoading }: Props) => {
  const { t } = useTranslation();
  if (config.UI.views.tx.hiddenFields?.gas_price || !gasPrice) {
    return null;
  }

  const content = (() => {
    if (gasToken) {
      return (
        <TokenValue
          amount={ gasPrice }
          token={ gasToken }
          loading={ isLoading }
          accuracy={ 0 }
        />
      );
    }

    return (
      <GasPriceValue
        amount={ gasPrice }
        loading={ isLoading }
      />
    );
  })();

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('tx.hintGasPrice') }
        isLoading={ isLoading }
      >
        { t('tx.gasPrice') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        { content }
      </DetailedInfo.ItemValue>
    </>
  );
};

export default TxDetailsGasPrice;
