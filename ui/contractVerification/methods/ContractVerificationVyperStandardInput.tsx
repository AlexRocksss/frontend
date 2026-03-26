import { useTranslation } from 'next-i18next';
import React from 'react';

import type { SmartContractVerificationConfig } from 'types/client/contract';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';

const FILE_TYPES = [ '.json' as const ];

const ContractVerificationVyperStandardInput = ({ config }: { config: SmartContractVerificationConfig }) => {
  const { t } = useTranslation();
  return (
    <ContractVerificationMethod title={ t('contractVerification.methodVyperStandardTitle') }>
      <ContractVerificationFieldCompiler config={ config } isVyper/>
      <ContractVerificationFieldSources
        fileTypes={ FILE_TYPES }
        title={ t('contractVerification.methodStandardSourcesTitle') }
        hint={ t('contractVerification.methodStandardSourcesHint') }
        required
      />
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationVyperStandardInput);
