import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ValidatorsZilliqaItem } from 'types/api/validators';

import { Skeleton } from 'toolkit/chakra/skeleton';
import ValidatorEntity from 'ui/shared/entities/validator/ValidatorEntity';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';

interface Props {
  data: ValidatorsZilliqaItem;
  isLoading?: boolean;
}

const ValidatorsListItem = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <ListItemMobileGrid.Container>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('validators.blsPublicKeyLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <ValidatorEntity
          isLoading={ isLoading }
          id={ data.bls_public_key }
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('validators.indexLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton loading={ isLoading } display="inline-block">
          { data.index }
        </Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('validators.balanceLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <NativeCoinValue
          amount={ data.balance }
          loading={ isLoading }
        />
      </ListItemMobileGrid.Value>
    </ListItemMobileGrid.Container>
  );
};

export default React.memo(ValidatorsListItem);
