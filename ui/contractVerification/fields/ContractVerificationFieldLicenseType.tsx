import { createListCollection } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';

import { CONTRACT_LICENSES } from 'lib/contracts/licenses';
import type { SelectOption } from 'toolkit/chakra/select';
import { FormFieldSelect } from 'toolkit/components/forms/fields/FormFieldSelect';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

const collection = createListCollection<SelectOption>({
  items: CONTRACT_LICENSES.map(({ label, title, type }) => ({ label: `${ title } (${ label })`, value: type })),
});

const ContractVerificationFieldLicenseType = () => {
  const { t } = useTranslation();

  return (
    <ContractVerificationFormRow>
      <FormFieldSelect<FormFields, 'license_type'>
        name="license_type"
        placeholder={ t('contractVerification.licensePlaceholder') }
        collection={ collection }
      />
      <span>
        { t('contractVerification.licenseHint') }
      </span>
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldLicenseType);
