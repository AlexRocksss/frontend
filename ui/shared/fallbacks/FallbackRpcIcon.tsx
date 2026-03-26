import { useTranslation } from 'next-i18next';
import React from 'react';

import { Tooltip } from 'toolkit/chakra/tooltip';
import IconSvg from 'ui/shared/IconSvg';
import type { IconName, Props as IconSvgProps } from 'ui/shared/IconSvg';

interface Props extends Omit<IconSvgProps, 'name'> {
  name?: IconName;
}

const FallbackRpcIcon = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Tooltip content={ t('shared.fallbackRpcTooltip') }>
      <IconSvg name="RPC" color="orange.400" boxSize={ 5 } { ...props }/>
    </Tooltip>
  );
};

export default React.memo(FallbackRpcIcon);
