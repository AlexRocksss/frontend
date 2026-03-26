import { chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import config from 'configs/app';
import { Alert } from 'toolkit/chakra/alert';

interface Props {
  isLoading?: boolean;
  className?: string;
}

const TestnetWarning = ({ isLoading, className }: Props) => {
  const { t } = useTranslation();

  if (!config.chain.isTestnet) {
    return null;
  }

  return (
    <Alert status="warning" loading={ isLoading } className={ className }>{ t('alert.testnetTransaction') }</Alert>
  );
};

export default React.memo(chakra(TestnetWarning));
