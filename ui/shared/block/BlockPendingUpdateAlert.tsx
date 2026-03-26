import { useTranslation } from 'next-i18next';
import React from 'react';

import config from 'configs/app';
import type { AlertProps } from 'toolkit/chakra/alert';
import { Alert } from 'toolkit/chakra/alert';

interface Props extends AlertProps {
  view?: 'block' | 'tx';
}

const BlockPendingUpdateAlert = ({ view = 'block', ...props }: Props) => {
  const { t } = useTranslation();

  if (!config.UI.views.block.pendingUpdateAlertEnabled) {
    return null;
  }

  const content = view === 'block' ?
    t('alert.blockReSyncing') :
    t('alert.txBlockReSyncing');

  return (
    <Alert status="info" showIcon { ...props }>
      { content }
    </Alert>
  );
};

export default React.memo(BlockPendingUpdateAlert);
