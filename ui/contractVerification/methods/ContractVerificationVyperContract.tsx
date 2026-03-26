import { useTranslation } from 'next-i18next';
import React from 'react';

import type { SmartContractVerificationConfig } from 'types/client/contract';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCode from '../fields/ContractVerificationFieldCode';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldConstructorArgs from '../fields/ContractVerificationFieldConstructorArgs';
import ContractVerificationFieldEvmVersion from '../fields/ContractVerificationFieldEvmVersion';
import ContractVerificationFieldName from '../fields/ContractVerificationFieldName';

const ContractVerificationVyperContract = ({ config }: { config: SmartContractVerificationConfig }) => {
  const { t } = useTranslation();
  return (
    <ContractVerificationMethod title={ t('contractVerification.methodVyperContractTitle') }>
      <ContractVerificationFieldName hint={ t('contractVerification.methodVyperContractNameHint') }/>
      <ContractVerificationFieldCompiler config={ config } isVyper/>
      { config?.is_rust_verifier_microservice_enabled && <ContractVerificationFieldEvmVersion isVyper config={ config }/> }
      <ContractVerificationFieldCode isVyper/>
      { !config?.is_rust_verifier_microservice_enabled && <ContractVerificationFieldConstructorArgs/> }
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationVyperContract);
