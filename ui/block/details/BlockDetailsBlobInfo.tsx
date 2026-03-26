import { Text } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Block } from 'types/api/block';

import { currencyUnits } from 'lib/units';
import { Tooltip } from 'toolkit/chakra/tooltip';
import { ZERO } from 'toolkit/utils/consts';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import IconSvg from 'ui/shared/IconSvg';
import Utilization from 'ui/shared/Utilization/Utilization';
import GasPriceValue from 'ui/shared/value/GasPriceValue';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';

interface Props {
  data: Block;
}

const BlockDetailsBlobInfo = ({ data }: Props) => {
  const { t } = useTranslation();
  if (
    !data.blob_gas_price ||
    !data.blob_gas_used ||
    !data.burnt_blob_fees ||
    !data.excess_blob_gas
  ) {
    return null;
  }

  const burntBlobFees = BigNumber(data.burnt_blob_fees || 0);
  const blobFees = BigNumber(data.blob_gas_price || 0).multipliedBy(BigNumber(data.blob_gas_used || 0));

  return (
    <>

      { data.blob_gas_price && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintBlobGasPrice') }
          >
            { t('blockDetails.blobGasPrice') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue multiRow>
            <GasPriceValue amount={ data.blob_gas_price }/>
          </DetailedInfo.ItemValue>
        </>
      ) }
      { data.blob_gas_used && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintBlobGasUsed') }
          >
            { t('blockDetails.blobGasUsed') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Text>{ BigNumber(data.blob_gas_used).toFormat() }</Text>
          </DetailedInfo.ItemValue>
        </>
      ) }
      { !burntBlobFees.isEqualTo(ZERO) && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintBlobBurntFees', { ether: currencyUnits.ether }) }
          >
            { t('blockDetails.blobBurntFees') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue multiRow>
            <NativeCoinValue
              amount={ burntBlobFees.toString() }
              accuracy={ 0 }
              startElement={ <IconSvg name="flame" boxSize={ 5 } color="icon.primary" mr={{ base: 1, lg: 2 }}/> }
              mr={ 4 }
            />
            { !blobFees.isEqualTo(ZERO) && (
              <Tooltip content={ t('blockDetails.hintBlobBurntFeesTip') }>
                <Utilization value={ burntBlobFees.dividedBy(blobFees).toNumber() }/>
              </Tooltip>
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }
      { data.excess_blob_gas && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintExcessBlobGas') }
          >
            { t('blockDetails.excessBlobGas') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <GasPriceValue amount={ data.excess_blob_gas }/>
          </DetailedInfo.ItemValue>
        </>
      ) }
      <DetailedInfo.ItemDivider/>
    </>
  );
};

export default React.memo(BlockDetailsBlobInfo);
