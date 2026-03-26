import { useTranslation } from 'next-i18next';
import React from 'react';

import type { CeloEpochRewardsType } from 'types/api/epochs';

import type { BadgeProps } from 'toolkit/chakra/badge';
import { Badge } from 'toolkit/chakra/badge';
import { Tooltip } from 'toolkit/chakra/tooltip';

type Props = {
  type: CeloEpochRewardsType;
  isLoading?: boolean;
};

const EpochRewardTypeTag = ({ type, isLoading }: Props) => {
  const { t } = useTranslation();

  const TYPE_TAGS: Record<CeloEpochRewardsType, { text: string; label: string; color: BadgeProps['colorPalette'] }> = {
    group: {
      text: t('epochReward.validatorGroup'),
      label: t('epochReward.validatorGroupTooltip'),
      color: 'teal',
    },
    validator: {
      text: t('epochReward.validator'),
      label: t('epochReward.validatorTooltip'),
      color: 'purple',
    },
    delegated_payment: {
      text: t('epochReward.delegatedPayment'),
      label: t('epochReward.delegatedPaymentTooltip'),
      color: 'blue',
    },
    voter: {
      text: t('epochReward.voter'),
      label: t('epochReward.voterTooltip'),
      color: 'yellow',
    },
  };

  const { text, label, color } = TYPE_TAGS[type];

  return (
    <Tooltip content={ label }>
      <Badge colorPalette={ color } loading={ isLoading }>
        { text }
      </Badge>
    </Tooltip>
  );
};

export default React.memo(EpochRewardTypeTag);
