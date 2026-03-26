import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Props as StatusTagProps } from './StatusTag';
import StatusTag from './StatusTag';

export interface Props extends Omit<StatusTagProps, 'type' | 'text'> {
  isFinalized: boolean;
}

const CeloEpochStatus = ({ isFinalized, ...rest }: Props) => {
  const { t } = useTranslation();

  return (
    <StatusTag
      { ...rest }
      type={ isFinalized ? 'ok' : 'pending' }
      text={ isFinalized ? t('status.finalized') : t('status.inProgress') }
    />
  );
};

export default CeloEpochStatus;
