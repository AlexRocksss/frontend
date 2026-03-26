import type { BoxProps } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import config from 'configs/app';
import { Tooltip } from 'toolkit/chakra/tooltip';
import IconSvg from 'ui/shared/IconSvg';

interface Props extends BoxProps {
  view?: 'block' | 'tx';
}

const BlockPendingUpdateHint = ({ view = 'block', ...props }: Props) => {
  const { t } = useTranslation();

  if (!config.UI.views.block.pendingUpdateAlertEnabled) {
    return null;
  }

  const tooltipContent = view === 'block' ?
    t('alert.blockReSyncing') :
    t('alert.txBlockReSyncing');

  return (
    <Tooltip content={ tooltipContent }>
      <IconSvg boxSize={ 5 } color="icon.secondary" name="status/warning" { ...props }/>
    </Tooltip>
  );
};

export default React.memo(BlockPendingUpdateHint);
