import React from 'react';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';
import config from 'configs/app';
import { useTranslations } from 'next-intl';

const FILE_TYPES = [ '.json' as const ];

const ContractVerificationVyperStandardInput = () => {
  const t = useTranslations();
  return (
    <ContractVerificationMethod title={ t('Contract verification via Vyper (standard JSON input)') }>
      <ContractVerificationFieldCompiler isVyper/>
      <ContractVerificationFieldSources
        fileTypes={ FILE_TYPES }
        title={ t('Standard Input JSON') }
        hint={ t("Upload the standard input JSON file created during contract compilation") }
        required
      />
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationVyperStandardInput);
