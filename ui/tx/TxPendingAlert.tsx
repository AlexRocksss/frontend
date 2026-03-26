import { Spinner } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Alert } from 'toolkit/chakra/alert';

const TxPendingAlert = () => {
  const { t } = useTranslation();
  return (
    <Alert startElement={ <Spinner size="sm" my={ 1 }/> }>
      { t('tx.pendingConfirmation') }
    </Alert>
  );
};

export default TxPendingAlert;
