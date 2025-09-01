import { Link } from '@chakra-ui/react';
import React from 'react';

import ContractVerificationMethod from '../ContractVerificationMethod';
import ContractVerificationFieldCompiler from '../fields/ContractVerificationFieldCompiler';
import ContractVerificationFieldEvmVersion from '../fields/ContractVerificationFieldEvmVersion';
import ContractVerificationFieldSources from '../fields/ContractVerificationFieldSources';
import config from 'configs/app';

const MAIN_SOURCES_TYPES = [ '.vy' as const ];
const INTERFACE_TYPES = [ '.vy' as const, '.json' as const ];

const ContractVerificationVyperMultiPartFile = () => {

  const interfacesHint = (
    <>
      <span>{ config.t()('Add any') }</span>
      <Link href="https://docs.vyperlang.org/en/stable/interfaces.html" target="_blank">{ config.t()('required interfaces') }</Link>
      <span>{ config.t()('for the main compiled contract') }</span>
    </>
  );

  return (
    <ContractVerificationMethod title={ config.t()("Contract verification via Vyper (multi-part files)") }>
      <ContractVerificationFieldCompiler isVyper/>
      <ContractVerificationFieldEvmVersion isVyper/>
      <ContractVerificationFieldSources
        name="sources"
        fileTypes={ MAIN_SOURCES_TYPES }
        title="Upload main *.vy source"
        hint={ config.t()('vyper-multipart-1') }
        required
      />
      <ContractVerificationFieldSources
        name="interfaces"
        fileTypes={ INTERFACE_TYPES }
        multiple
        title="Interfaces (.vy or .json)"
        hint={ interfacesHint }
      />
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationVyperMultiPartFile);
