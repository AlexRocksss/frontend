import { useTranslation } from 'next-i18next';
import React from 'react';

import { Alert } from 'toolkit/chakra/alert';
import { Link } from 'toolkit/chakra/link';
interface Props {
  status: 'error' | 'close';
}

const TxSocketAlert = ({ status }: Props) => {
  const { t } = useTranslation();
  const text = status === 'close' ?
    t('tx.socketLost') :
    t('tx.socketError');

  return (
    <Link href={ window.document.location.href } asChild>
      <Alert status="warning">{ text }</Alert>
    </Link>
  );
};

export default React.memo(TxSocketAlert);
