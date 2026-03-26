import BigNumber from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import React from 'react';

import config from 'configs/app';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoNativeCoinValue from 'ui/shared/DetailedInfo/DetailedInfoNativeCoinValue';

interface Props {
  txFee: string | null;
  gasUsed: string | null;
  isLoading?: boolean;
}

const TxDetailsFeePerGas = ({ txFee, gasUsed, isLoading }: Props) => {
  const { t } = useTranslation();
  if (!config.UI.views.tx.additionalFields?.fee_per_gas || !gasUsed || txFee === null) {
    return null;
  }

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('tx.hintFeePerGas') }
        isLoading={ isLoading }
      >
        { t('tx.feePerGas') }
      </DetailedInfo.ItemLabel>
      <DetailedInfoNativeCoinValue
        amount={ BigNumber(txFee).dividedBy(gasUsed).toFixed() }
        noSymbol={ config.UI.views.tx.hiddenFields?.fee_currency }
        loading={ isLoading }
      />
    </>
  );
};

export default TxDetailsFeePerGas;
