import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';

import { Link } from 'toolkit/chakra/link';
import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

const ContractVerificationFieldConstructorArgs = () => {
  const { t } = useTranslation();
  return (
    <ContractVerificationFormRow>
      <FormFieldText<FormFields>
        name="constructor_args"
        required
        rules={{ maxLength: 255 }}
        placeholder={ t('contractVerification.constructorArgsPlaceholder') }
        asComponent="Textarea"
      />
      <>
        <span>{ t('contractVerification.constructorArgsNote1Before') }</span>
        <Link href="https://solidity.readthedocs.io/en/develop/abi-spec.html" external noIcon>{ t('contractVerification.constructorArgsNote1Link') }</Link>
        <span>{ t('contractVerification.constructorArgsNote1After') }</span>
        <span>{ t('contractVerification.constructorArgsNote2Before') }</span>
        <Link href="https://abi.hashex.org/" external noIcon>{ t('contractVerification.constructorArgsNote2Link') }</Link>
        <span>{ t('contractVerification.constructorArgsNote2End') }</span>
      </>
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldConstructorArgs);
