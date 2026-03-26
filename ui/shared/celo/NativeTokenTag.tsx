import { useTranslation } from 'next-i18next';
import React from 'react';

import config from 'configs/app';
import { Tag, type TagProps } from 'toolkit/chakra/tag';
import { Tooltip } from 'toolkit/chakra/tooltip';

interface Props extends TagProps {
  chainConfig?: typeof config;
}

const NativeTokenTag = ({ chainConfig: chainConfigProp, ...rest }: Props) => {
  const { t } = useTranslation();
  const chainConfig = chainConfigProp || config;
  if (!chainConfig.UI.views.address.nativeTokenAddress) {
    return null;
  }

  return (
    <Tooltip
      content={ t('celo.nativeTokenTooltip', { symbol: chainConfig.chain.currency.symbol }) }
    >
      <Tag { ...rest }>{ t('celo.nativeToken') }</Tag>
    </Tooltip>
  );
};

export default React.memo(NativeTokenTag);
