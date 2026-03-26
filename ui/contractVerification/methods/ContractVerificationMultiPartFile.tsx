import { useTranslation } from 'next-i18next';
import React from 'react';

import type { SmartContractVerificationConfig } from 'types/client/contract';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldEvmVersion from '../fields/ContractVerificationFieldEvmVersion';
import ContractVerificationFieldLibraries from '../fields/ContractVerificationFieldLibraries';
import ContractVerificationFieldOptimization from '../fields/ContractVerificationFieldOptimization';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';

const FILE_TYPES = [ '.sol' as const, '.yul' as const ];

const ContractVerificationMultiPartFile = ({ config }: { config: SmartContractVerificationConfig }) => {
  const { t } = useTranslation();
  return (
    <ContractVerificationMethod title={ t('contractVerification.methodMultiPartTitle') }>
      <ContractVerificationFieldCompiler config={ config }/>
      <ContractVerificationFieldEvmVersion config={ config }/>
      <ContractVerificationFieldOptimization/>
      <ContractVerificationFieldSources
        fileTypes={ FILE_TYPES }
        multiple
        fullFilePath
        required
        title={ t('contractVerification.methodMultiPartSourcesTitle') }
        hint={ t('contractVerification.methodMultiPartSourcesHint') }
      />
      <ContractVerificationFieldLibraries/>
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationMultiPartFile);
