import { createListCollection } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';
import type { SmartContractVerificationConfig } from 'types/client/contract';

import { Link } from 'toolkit/chakra/link';
import { FormFieldSelect } from 'toolkit/components/forms/fields/FormFieldSelect';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

interface Props {
  isVyper?: boolean;
  config: SmartContractVerificationConfig;
}

const ContractVerificationFieldEvmVersion = ({ isVyper, config }: Props) => {
  const { t } = useTranslation();
  const collection = React.useMemo(() => {
    const items = (isVyper ? config?.vyper_evm_versions : config?.solidity_evm_versions)?.map((option) => ({ label: option, value: option })) || [];

    return createListCollection({ items });
  }, [ config?.solidity_evm_versions, config?.vyper_evm_versions, isVyper ]);

  return (
    <ContractVerificationFormRow>
      <FormFieldSelect<FormFields, 'evm_version'>
        name="evm_version"
        placeholder={ t('contractVerification.evmVersionPlaceholder') }
        collection={ collection }
        required
      />
      <>
        <span>{ t('contractVerification.evmVersionHint') }</span>
        <Link
          href={ isVyper ?
            'https://docs.vyperlang.org/en/stable/compiling-a-contract.html#target-options' :
            'https://docs.soliditylang.org/en/latest/using-the-compiler.html#target-options'
          }
          external
          noIcon
        >
          { t('contractVerification.evmVersionDetailsLink') }
        </Link>
      </>
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldEvmVersion);
