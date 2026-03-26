import { chakra, Code } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';

import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

interface Props {
  hint?: string;
}

const ContractVerificationFieldName = ({ hint }: Props) => {
  const { t } = useTranslation();
  return (
    <ContractVerificationFormRow>
      <FormFieldText<FormFields>
        name="name"
        required
        placeholder={ t('contractVerification.namePlaceholder') }
        rules={{ maxLength: 255 }}
      />
      { hint ? <span>{ hint }</span> : (
        <>
          <span>{ t('contractVerification.nameHintBefore') }</span>
          <Code color="text.secondary">{ `contract MyContract {..}` }</Code>
          <span>{ t('contractVerification.nameHintMid') }
            <chakra.span fontWeight={ 600 }>MyContract</chakra.span>{ t('contractVerification.nameHintEnd') }</span>
        </>
      ) }
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldName);
