import { Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { FormFields } from '../types';

import config from 'configs/app';
import { Link } from 'toolkit/chakra/link';

import ContractVerificationFormCodeSnippet from '../ContractVerificationFormCodeSnippet';
import ContractVerificationFormRow from '../ContractVerificationFormRow';
import ContractVerificationMethod from '../ContractVerificationMethod';

const ContractVerificationSolidityFoundry = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext<FormFields>();
  const address = watch('address');
  const generalApiEndpoint = config.apis.general ?
    `${ config.apis.general.endpoint }${ config.apis.general.basePath ?? '' }` : '';

  const codeSnippet = `forge verify-contract \\
  --rpc-url ${ config.chain.rpcUrls[0] || (generalApiEndpoint ? `${ generalApiEndpoint }/api/eth-rpc` : '') } \\
  --verifier blockscout \\
  --verifier-url '${ generalApiEndpoint ? `${ generalApiEndpoint }/api/` : '' }' \\
  ${ address || '<address>' } \\
  [contractFile]:[contractName]`;

  return (
    <ContractVerificationMethod title={ t('contractVerification.methodFoundryTitle') }>
      <ContractVerificationFormRow>
        <Flex flexDir="column">
          <ContractVerificationFormCodeSnippet code={ codeSnippet }/>
        </Flex>
        <Box whiteSpace="pre-wrap">
          <span>{ t('contractVerification.methodFoundryHintBefore') }</span>
          <Link href="https://docs.blockscout.com/devs/verification/foundry-verification" external>
            { t('contractVerification.methodFoundryHintLink') }
          </Link>
        </Box>
      </ContractVerificationFormRow>
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationSolidityFoundry);
