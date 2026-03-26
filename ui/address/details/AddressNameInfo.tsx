import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Address } from 'types/api/address';

import { Skeleton } from 'toolkit/chakra/skeleton';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import TokenEntity from 'ui/shared/entities/token/TokenEntity';

interface Props {
  data: Pick<Address, 'name' | 'token' | 'is_contract'>;
  isLoading?: boolean;
}

const AddressNameInfo = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  if (data.token) {
    return (
      <>
        <DetailedInfo.ItemLabel
          hint={ t('address.tokenNameHint') }
          isLoading={ isLoading }
        >
          { t('address.tokenNameLabel') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <TokenEntity
            token={ data.token }
            isLoading={ isLoading }
            noIcon
            noCopy
          />
        </DetailedInfo.ItemValue>
      </>
    );
  }

  if (data.is_contract && data.name) {
    return (
      <>
        <DetailedInfo.ItemLabel
          hint={ t('address.contractNameHint') }
          isLoading={ isLoading }
        >
          { t('address.contractNameLabel') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <Skeleton loading={ isLoading }>
            { data.name }
          </Skeleton>
        </DetailedInfo.ItemValue>
      </>
    );
  }

  if (data.name) {
    return (
      <>
        <DetailedInfo.ItemLabel
          hint={ t('address.validatorNameHint') }
          isLoading={ isLoading }
        >
          { t('address.validatorNameLabel') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <Skeleton loading={ isLoading }>
            { data.name }
          </Skeleton>
        </DetailedInfo.ItemValue>
      </>
    );
  }

  return null;
};

export default React.memo(AddressNameInfo);
