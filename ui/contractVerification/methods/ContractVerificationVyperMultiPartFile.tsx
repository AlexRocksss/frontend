import { useTranslation } from 'next-i18next';
import React from 'react';

import type { SmartContractVerificationConfig } from 'types/client/contract';

import { Link } from 'toolkit/chakra/link';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldEvmVersion from '../fields/ContractVerificationFieldEvmVersion';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';

const MAIN_SOURCES_TYPES = [ '.vy' as const ];
const INTERFACE_TYPES = [ '.vy' as const, '.json' as const ];

const ContractVerificationVyperMultiPartFile = ({ config }: { config: SmartContractVerificationConfig }) => {
  const { t } = useTranslation();

  const interfacesHint = (
    <>
      <span>{ t('contractVerification.methodVyperMultiPartInterfacesHintBefore') }</span>
      <Link href="https://docs.vyperlang.org/en/stable/interfaces.html" external noIcon>
        { t('contractVerification.methodVyperMultiPartInterfacesHintLink') }
      </Link>
      <span>{ t('contractVerification.methodVyperMultiPartInterfacesHintAfter') }</span>
    </>
  );

  return (
    <ContractVerificationMethod title={ t('contractVerification.methodVyperMultiPartTitle') }>
      <ContractVerificationFieldCompiler config={ config } isVyper/>
      <ContractVerificationFieldEvmVersion isVyper config={ config }/>
      <ContractVerificationFieldSources
        name="sources"
        fileTypes={ MAIN_SOURCES_TYPES }
        title={ t('contractVerification.methodVyperMultiPartSourcesTitle') }
        hint={ t('contractVerification.methodVyperMultiPartSourcesHint') }
        required
      />
      <ContractVerificationFieldSources
        name="interfaces"
        fileTypes={ INTERFACE_TYPES }
        multiple
        fullFilePath
        title={ t('contractVerification.methodVyperMultiPartInterfacesTitle') }
        hint={ interfacesHint }
      />
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationVyperMultiPartFile);
