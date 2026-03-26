import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';

import AddButton from 'toolkit/components/buttons/AddButton';
import RemoveButton from 'toolkit/components/buttons/RemoveButton';
import { FormFieldAddress } from 'toolkit/components/forms/fields/FormFieldAddress';
import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';

import ContractVerificationFormRow from '../ContractVerificationFormRow';

const LIMIT = 10;

interface Props {
  index: number;
  fieldsLength: number;
  onAddFieldClick: (index: number) => void;
  onRemoveFieldClick: (index: number) => void;
  isDisabled?: boolean;
}

const ContractVerificationFieldLibraryItem = ({ index, fieldsLength, onAddFieldClick, onRemoveFieldClick, isDisabled }: Props) => {
  const { t } = useTranslation();
  const ref = React.useRef<HTMLDivElement>(null);

  const handleAddButtonClick = React.useCallback(() => {
    onAddFieldClick(index);
  }, [ index, onAddFieldClick ]);

  const handleRemoveButtonClick = React.useCallback(() => {
    onRemoveFieldClick(index);
  }, [ index, onRemoveFieldClick ]);

  React.useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <ContractVerificationFormRow>
        <Flex alignItems="center" justifyContent="space-between" ref={ ref } mt={ index !== 0 ? 6 : 0 }>
          <Text color="text.secondary" fontSize="sm">{ t('contractVerification.contractLibraryLabel', { index: index + 1 }) }</Text>
          <Flex columnGap={ 5 }>
            { fieldsLength > 1 && (
              <RemoveButton
                onClick={ handleRemoveButtonClick }
                disabled={ isDisabled }
              />
            ) }
            { fieldsLength < LIMIT && (
              <AddButton
                onClick={ handleAddButtonClick }
                disabled={ isDisabled }
              />
            ) }
          </Flex>
        </Flex>
      </ContractVerificationFormRow>
      <ContractVerificationFormRow>
        <FormFieldText<FormFields, `libraries.${ number }.name`>
          name={ `libraries.${ index }.name` }
          required
          rules={{ maxLength: 255 }}
          placeholder={ t('contractVerification.libraryNamePlaceholder') }
        />
        { index === 0 ? (
          <>
            { t('contractVerification.libraryNameHint') }
          </>
        ) : null }
      </ContractVerificationFormRow>
      <ContractVerificationFormRow>
        <FormFieldAddress<FormFields>
          name={ `libraries.${ index }.address` }
          required
          placeholder={ t('contractVerification.libraryAddressPlaceholder') }
        />
        { index === 0 ? (
          <>
            { t('contractVerification.libraryAddressHint') }
          </>
        ) : null }
      </ContractVerificationFormRow>
    </>
  );
};

export default React.memo(ContractVerificationFieldLibraryItem);
