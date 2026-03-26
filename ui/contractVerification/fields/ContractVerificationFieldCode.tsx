import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';

import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

interface Props {
  isVyper?: boolean;
}

const ContractVerificationFieldCode = ({ isVyper }: Props) => {
  const { t } = useTranslation();
  return (
    <ContractVerificationFormRow>
      <FormFieldText<FormFields>
        name="code"
        required
        placeholder={ t('contractVerification.codePlaceholder') }
        asComponent="Textarea"
      />
      { isVyper ? null : (
        <span>{ t('contractVerification.codeLibraryHint') }</span>
      ) }
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldCode);
