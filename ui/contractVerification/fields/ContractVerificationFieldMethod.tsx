import {
  List,
  Box,
  createListCollection,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';
import type { SmartContractVerificationMethod, SmartContractVerificationConfig } from 'types/client/contract';

import { Heading } from 'toolkit/chakra/heading';
import { Link } from 'toolkit/chakra/link';
import type { SelectOption } from 'toolkit/chakra/select';
import { FormFieldSelect } from 'toolkit/components/forms/fields/FormFieldSelect';
import { Hint } from 'toolkit/components/Hint/Hint';

import { METHOD_LABELS } from '../utils';

interface Props {
  methods: SmartContractVerificationConfig['verification_options'];
}

const ContractVerificationFieldMethod = ({ methods }: Props) => {
  const { t } = useTranslation();
  const collection = React.useMemo(() => createListCollection<SelectOption>({
    items: methods.map((method) => ({
      value: method,
      label: METHOD_LABELS[method],
    })),
  }), [ methods ]);

  const renderPopoverListItem = React.useCallback((method: SmartContractVerificationMethod) => {
    switch (method) {
      case 'flattened-code':
        return <List.Item key={ method }>{ t('contractVerification.methodDesc_flattened') }</List.Item>;
      case 'multi-part':
        return <List.Item key={ method }>{ t('contractVerification.methodDesc_multiPart') }</List.Item>;
      case 'sourcify':
        return (
          <List.Item key={ method }>
            <span>{ t('contractVerification.methodDesc_sourcifyBefore') }</span>
            <Link href="https://sourcify.dev/" external noIcon className="dark">Sourcify</Link>
            <span>{ t('contractVerification.methodDesc_sourcifyAfter') }</span>
          </List.Item>
        );
      case 'standard-input':
        return (
          <List.Item key={ method }>
            <span>{ t('contractVerification.methodDesc_standardBefore') }</span>
            <Link
              href="https://docs.soliditylang.org/en/latest/using-the-compiler.html#input-description"
              external noIcon
              className="dark"
            >
              { t('contractVerification.methodDesc_standardLink') }
            </Link>
            <span>{ t('contractVerification.methodDesc_standardAfter') }</span>
          </List.Item>
        );
      case 'vyper-code':
        return <List.Item key={ method }>{ t('contractVerification.methodDesc_vyperCode') }</List.Item>;
      case 'vyper-multi-part':
        return <List.Item key={ method }>{ t('contractVerification.methodDesc_vyperMultiPart') }</List.Item>;
      case 'vyper-standard-input':
        return (
          <List.Item key={ method }>
            <span>{ t('contractVerification.methodDesc_vyperStandardBefore') }</span>
            <Link
              href="https://docs.vyperlang.org/en/stable/compiling-a-contract.html#compiler-input-and-output-json-description"
              external noIcon
              className="dark"
            >
              { t('contractVerification.methodDesc_vyperStandardLink') }
            </Link>
            <span>{ t('contractVerification.methodDesc_vyperStandardAfter') }</span>
          </List.Item>
        );
      case 'solidity-hardhat':
        return <List.Item key={ method }>{ t('contractVerification.methodDesc_hardhat') }</List.Item>;
      case 'solidity-foundry':
        return <List.Item key={ method }>{ t('contractVerification.methodDesc_foundry') }</List.Item>;
      case 'stylus-github-repository':
        return <List.Item key={ method }>{ t('contractVerification.methodDesc_stylus') }</List.Item>;
    }
  }, [ t ]);

  const tooltipContent = (
    <Box>
      <span>{ t('contractVerification.methodsCount', { count: methods.length }) }</span>
      <List.Root as="ol" pl={ 5 }>
        { methods.map(renderPopoverListItem) }
      </List.Root>
    </Box>
  );

  return (
    <>
      <Heading level="2" mt={{ base: 10, lg: 6 }} gridColumn={{ lg: '1 / 3' }}>
        { t('contractVerification.methodsHeading', { count: methods.length }) }
        <Hint
          label={ tooltipContent }
          tooltipProps={{ interactive: true, contentProps: { textAlign: 'left' } }}
          ml={ 1 }
        />
      </Heading>
      <FormFieldSelect<FormFields, 'method'>
        name="method"
        placeholder={ t('contractVerification.methodPlaceholder') }
        collection={ collection }
        required
        readOnly={ collection.items.length === 1 }
      />
    </>
  );
};

export default React.memo(ContractVerificationFieldMethod);
