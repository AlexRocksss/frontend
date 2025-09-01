import React from 'react';

import type { SmartContractVerificationConfig } from 'types/api/contract';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCode from '../fields/ContractVerificationFieldCode';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldConstructorArgs from '../fields/ContractVerificationFieldConstructorArgs';
import ContractVerificationFieldEvmVersion from '../fields/ContractVerificationFieldEvmVersion';
import ContractVerificationFieldName from '../fields/ContractVerificationFieldName';
import {useTranslations as t} from 'next-intl';

const ContractVerificationVyperContract = ({ config }: { config: SmartContractVerificationConfig }) => {
  return (
    <ContractVerificationMethod title={ t()("Contract verification via Vyper (contract)") }>
      <ContractVerificationFieldName hint={ t()("The contract name is the name assigned to the verified contract in Blockscout") }/>
      <ContractVerificationFieldCompiler isVyper/>
      { config?.is_rust_verifier_microservice_enabled && <ContractVerificationFieldEvmVersion isVyper/> }
      <ContractVerificationFieldCode isVyper/>
      { !config?.is_rust_verifier_microservice_enabled && <ContractVerificationFieldConstructorArgs/> }
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationVyperContract);
