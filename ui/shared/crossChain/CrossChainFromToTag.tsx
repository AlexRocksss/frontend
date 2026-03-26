import { useTranslation } from 'next-i18next';
import React from 'react';

import { Badge, type BadgeProps } from 'toolkit/chakra/badge';

interface Props extends BadgeProps {
  type: 'in' | 'out';
  isLoading?: boolean;
}

const CrossChainFromToTag = ({ type, isLoading, ...rest }: Props) => {
  const { t } = useTranslation();

  return (
    <Badge
      loading={ isLoading }
      colorPalette={ type === 'in' ? 'purple' : 'orange' }
      minW={ 8 }
      justifyContent="center"
      { ...rest }
    >
      { type === 'in' ? t('crossChain.in') : t('crossChain.out') }
    </Badge>
  );
};

export default React.memo(CrossChainFromToTag);
