import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Transaction } from 'types/api/transaction';

import type { BadgeProps } from 'toolkit/chakra/badge';

import type { StatusTagType } from './StatusTag';
import StatusTag from './StatusTag';

export interface Props extends BadgeProps {
  status: Transaction['status'];
  errorText?: string | null;
  isLoading?: boolean;
}

const TxStatus = ({ status, errorText, isLoading, ...rest }: Props) => {
  const { t } = useTranslation();

  if (status === undefined) {
    return null;
  }

  let text;
  let type: StatusTagType;

  switch (status) {
    case 'ok':
      text = t('status.success');
      type = 'ok';
      break;
    case 'error':
      text = t('status.failed');
      type = 'error';
      break;
    case null:
      text = t('status.pending');
      type = 'pending';
      break;
  }

  return <StatusTag type={ type } text={ text } errorText={ errorText } loading={ isLoading } { ...rest }/>;
};

export default TxStatus;
