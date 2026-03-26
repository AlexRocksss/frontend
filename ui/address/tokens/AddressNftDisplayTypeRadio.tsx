import { chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ButtonGroupRadioProps } from 'toolkit/chakra/button';
import { Button, ButtonGroupRadio } from 'toolkit/chakra/button';
import IconSvg from 'ui/shared/IconSvg';

import type { TNftDisplayType } from './useAddressNftQuery';

interface Props extends Omit<ButtonGroupRadioProps, 'children'> {
  value: TNftDisplayType;
}

const AddressNftDisplayTypeRadio = ({ value, onChange, ...rest }: Props) => {
  const { t } = useTranslation();
  return (
    <ButtonGroupRadio
      defaultValue={ value }
      onChange={ onChange }
      equalWidth
      { ...rest }
    >
      <Button value="collection" size="sm" px={ 3 }>
        <IconSvg name="collection" boxSize={ 5 }/>
        <chakra.span hideBelow="lg">{ t('address.byCollection') }</chakra.span>
      </Button>
      <Button value="list" size="sm" px={ 3 }>
        <IconSvg name="apps" boxSize={ 5 }/>
        <chakra.span hideBelow="lg">{ t('address.list') }</chakra.span>
      </Button>
    </ButtonGroupRadio>
  );
};

export default React.memo(AddressNftDisplayTypeRadio);
