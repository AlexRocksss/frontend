import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';
import type { SmartContractVerificationConfig } from 'types/client/contract';

import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';

import ContractVerificationFormRow from '../ContractVerificationFormRow';
import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCommit from '../fields/ContractVerificationFieldCommit';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldGitHubRepo from '../fields/ContractVerificationFieldGitHubRepo';

const ContractVerificationStylusGitHubRepo = ({ config }: { config: SmartContractVerificationConfig }) => {
  const { t } = useTranslation();
  const [ latestCommitHash, setLatestCommitHash ] = React.useState<string | undefined>(undefined);

  return (
    <ContractVerificationMethod title={ t('contractVerification.methodStylusTitle') }>
      <ContractVerificationFieldCompiler config={ config } isStylus/>
      <ContractVerificationFieldGitHubRepo onCommitHashChange={ setLatestCommitHash }/>
      <ContractVerificationFieldCommit latestCommitHash={ latestCommitHash }/>

      <ContractVerificationFormRow>
        <FormFieldText<FormFields>
          name="path_prefix"
          placeholder={ t('contractVerification.methodStylusPathPlaceholder') }
        />
        <span>
          { t('contractVerification.methodStylusPathHint') }
        </span>
      </ContractVerificationFormRow>
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationStylusGitHubRepo);
