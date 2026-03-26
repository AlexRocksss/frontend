import { chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TokenInfoApplication } from 'types/api/account';

interface Props {
  status?: TokenInfoApplication['status'];
}

const VerifiedAddressesStatus = ({ status }: Props) => {
  const { t } = useTranslation();
  switch (status) {
    case 'IN_PROCESS': {
      return <chakra.span fontWeight={ 500 }>{ t('verifiedAddresses.statusInProgress') }</chakra.span>;
    }
    case 'APPROVED': {
      return <chakra.span fontWeight={ 500 } color="green.500">{ t('verifiedAddresses.statusApproved') }</chakra.span>;
    }
    case 'UPDATE_REQUIRED': {
      return <chakra.span fontWeight={ 500 } color="orange.500">{ t('verifiedAddresses.statusWaitingForUpdate') }</chakra.span>;
    }
    case 'REJECTED': {
      return <chakra.span fontWeight={ 500 } color="red.500">{ t('verifiedAddresses.statusRejected') }</chakra.span>;
    }

    default:
      return null;
  }
};

export default VerifiedAddressesStatus;
