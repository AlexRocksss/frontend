import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';

function ChartsLoadingErrorAlert() {
  const { t } = useTranslation();
  return (
    <Alert status="warning" mb={ 4 } closable>
      <Text mr={ 2 }>
        { t('stats.chartsLoadingErrorBefore') }
        <Link href={ window.document.location.href }>{ t('stats.chartsLoadingErrorLink') }</Link>
      </Text>
    </Alert>
  );
}

export default ChartsLoadingErrorAlert;
