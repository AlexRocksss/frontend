import { chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Alert } from 'toolkit/chakra/alert';

const DataFetchAlert = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  return (
    <Alert status="warning" width="fit-content" className={ className }>
      { t('error.dataFetch') }
    </Alert>
  );
};

export default chakra(DataFetchAlert);
