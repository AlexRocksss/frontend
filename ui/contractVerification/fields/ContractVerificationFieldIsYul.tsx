import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';

import { FormFieldCheckbox } from 'toolkit/components/forms/fields/FormFieldCheckbox';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

const ContractVerificationFieldIsYul = () => {
  const { t } = useTranslation();
  return (
    <ContractVerificationFormRow>
      <FormFieldCheckbox<FormFields, 'is_yul'>
        name="is_yul"
        label={ t('contractVerification.isYulLabel') }
      />
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldIsYul);
