import { Flex, Grid } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Transaction } from 'types/api/transaction';
import type { ExcludeUndefined } from 'types/utils';

import { Badge } from 'toolkit/chakra/badge';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoNativeCoinValue from 'ui/shared/DetailedInfo/DetailedInfoNativeCoinValue';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import LogDecodedInputData from 'ui/shared/logs/LogDecodedInputData';
import RawInputData from 'ui/shared/RawInputData';
import TxFee from 'ui/shared/tx/TxFee';
import TxDetailsGasPrice from 'ui/tx/details/TxDetailsGasPrice';
import TxDetailsOther from 'ui/tx/details/TxDetailsOther';

interface Props {
  data: ExcludeUndefined<Transaction['wrapped']>;
}

const TxDetailsWrapped = ({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <Grid columnGap={ 8 } rowGap={{ base: 3, lg: 3 }} templateColumns={{ base: 'minmax(0, 1fr)', lg: 'auto minmax(0, 1fr)' }}>
      <DetailedInfo.ItemLabel
        hint={ t('tx.hintTransactionHash') }
      >
        { t('tx.transactionHash') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <TxEntity hash={ data.hash } noIcon noLink/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('tx.hintMethod') }
      >
        { t('tx.method') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Badge colorPalette="gray">
          { data.method }
        </Badge>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemDivider/>

      { data.to && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintTo') }
          >
            { data.to.is_contract ? t('tx.interactedWith') : t('tx.to') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Flex flexWrap="nowrap" alignItems="center" maxW="100%">
              <AddressEntity address={ data.to }/>
            </Flex>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemDivider/>

      <DetailedInfo.ItemLabel
        hint={ t('tx.hintValue') }
      >
        { t('tx.value') }
      </DetailedInfo.ItemLabel>
      <DetailedInfoNativeCoinValue amount={ data.value }/>

      { data.fee.value !== null && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintTransactionFee') }
          >
            { t('tx.transactionFee') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <TxFee tx={ data } hasExchangeRateToggle/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <TxDetailsGasPrice gasPrice={ data.gas_price }/>

      { data.gas_limit && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintGasLimit') }
          >
            { t('tx.gasLimit') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { BigNumber(data.gas_limit).toFormat() }
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemDivider/>

      <TxDetailsOther type={ data.type } nonce={ data.nonce } position={ null }/>

      <DetailedInfo.ItemLabel
        hint={ t('tx.hintRawInput') }
      >
        { t('tx.rawInput') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <RawInputData hex={ data.raw_input }/>
      </DetailedInfo.ItemValue>

      { data.decoded_input && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintDecodedInputData') }
          >
            { t('tx.decodedInputData') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <LogDecodedInputData data={ data.decoded_input }/>
          </DetailedInfo.ItemValue>
        </>
      ) }
    </Grid>
  );
};

export default TxDetailsWrapped;
