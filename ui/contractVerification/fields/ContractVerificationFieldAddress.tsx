import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';

import { Heading } from 'toolkit/chakra/heading';
import { FormFieldAddress } from 'toolkit/components/forms/fields/FormFieldAddress';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

interface Props {
  readOnly?: boolean;
}

const ContractVerificationFieldAddress = ({ readOnly }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <ContractVerificationFormRow>
        <Heading level="2">
          { t('contractVerification.addressHeading') }
        </Heading>
      </ContractVerificationFormRow>
      <ContractVerificationFormRow>
        <FormFieldAddress<FormFields>
          name="address"
          required
          placeholder={ t('contractVerification.addressPlaceholder') }
          readOnly={ readOnly }
        />
      </ContractVerificationFormRow>
    </>
  );
};

export default React.memo(ContractVerificationFieldAddress);
