import { chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';

interface Props {
  className?: string;
}

const SocketAlert = ({ className }: Props) => {
  const { t } = useTranslation();

  return (
    <Alert status="warning" className={ className }>
      { t('alert.connectionLost') }
      <Link href={ window.document.location.href }>{ t('alert.connectionLostLink') }</Link>
    </Alert>
  );
};

export default chakra(SocketAlert);
