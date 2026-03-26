import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ArbitrumL2MessagesItem } from 'types/api/arbitrumL2';

import type { StatusTagType } from './StatusTag';
import StatusTag from './StatusTag';

export interface Props {
  status: ArbitrumL2MessagesItem['status'];
  isLoading?: boolean;
}

const ArbitrumL2MessageStatus = ({ status, isLoading }: Props) => {
  const { t } = useTranslation();

  let type: StatusTagType;
  let text: string;

  switch (status) {
    case 'relayed': {
      type = 'ok';
      text = t('status.relayed');
      break;
    }
    case 'confirmed': {
      type = 'pending';
      text = t('status.readyForRelay');
      break;
    }
    case 'sent': {
      type = 'pending';
      text = t('status.waiting');
      break;
    }
    case 'initiated': {
      type = 'pending';
      text = t('status.pending');
      break;
    }
    default:
      type = 'pending';
      text = status;
      break;
  }

  return <StatusTag type={ type } text={ text } loading={ isLoading }/>;
};

export default ArbitrumL2MessageStatus;
