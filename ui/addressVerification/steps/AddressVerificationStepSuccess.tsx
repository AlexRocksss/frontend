import { Box, chakra, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Alert } from 'toolkit/chakra/alert';
import { Button } from 'toolkit/chakra/button';

interface Props {
  onShowListClick: () => void;
  onAddTokenInfoClick: () => void;
  isToken?: boolean;
  address: string;
}

const AddressVerificationStepSuccess = ({ onAddTokenInfoClick, onShowListClick, isToken, address }: Props) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Alert status="success" descriptionProps={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }} mb={ 3 } display="inline-block">
        <span>{ t('addressVerification.ownershipFor') }</span>
        <chakra.span fontWeight={ 700 }>{ address }</chakra.span>
        <span> { t('addressVerification.isVerified') }</span>
      </Alert>
      <p>{ t('addressVerification.submitAddTokenInfo') }</p>
      <Flex alignItems="center" mt={ 8 } columnGap={ 5 } flexWrap="wrap" rowGap={ 5 }>
        <Button variant={ isToken ? 'outline' : 'solid' } onClick={ onShowListClick }>
          { t('addressVerification.viewVerifiedAddresses') }
        </Button>
        { isToken && (
          <Button onClick={ onAddTokenInfoClick }>
            { t('addressVerification.addTokenInfo') }
          </Button>
        ) }
      </Flex>
    </Box>
  );
};

export default React.memo(AddressVerificationStepSuccess);
