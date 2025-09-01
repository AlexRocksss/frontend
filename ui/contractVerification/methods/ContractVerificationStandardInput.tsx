import React from 'react';

import type { SmartContractVerificationConfig } from 'types/api/contract';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldAutodetectArgs from '../fields/ContractVerificationFieldAutodetectArgs';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldName from '../fields/ContractVerificationFieldName';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';
import {useTranslations as t} from 'next-intl';

const FILE_TYPES = [ '.json' as const ];

const ContractVerificationStandardInput = ({ config }: { config: SmartContractVerificationConfig }) => {
  return (
    <ContractVerificationMethod title={ t()("Contract verification via Solidity (standard JSON input)") }>
      { !config?.is_rust_verifier_microservice_enabled && <ContractVerificationFieldName/> }
      <ContractVerificationFieldCompiler/>
      <ContractVerificationFieldSources
        fileTypes={ FILE_TYPES }
        title="Standard Input JSON"
        hint={ t()("standard-input-json") }
        required
      />
      { !config?.is_rust_verifier_microservice_enabled && <ContractVerificationFieldAutodetectArgs/> }
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationStandardInput);
