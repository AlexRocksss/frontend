import { useTranslation } from 'next-i18next';
import React from 'react';

import type { SmartContractCreationStatus } from 'types/api/contract';

import type { BadgeProps } from 'toolkit/chakra/badge';
import { Badge } from 'toolkit/chakra/badge';
import { Tooltip } from 'toolkit/chakra/tooltip';

import StatusTag from './StatusTag';

interface Props extends BadgeProps {
  status: SmartContractCreationStatus;
}

const ContractCreationStatus = ({ status, ...rest }: Props) => {
  const { t } = useTranslation();

  switch (status) {
    case 'success':
      return (
        <Tooltip content={ t('contractStatus.successTooltip') }>
          <StatusTag type="ok" text={ t('status.success') } { ...rest }/>
        </Tooltip>
      );
    case 'failed':
      return (
        <Tooltip content={ t('contractStatus.failedTooltip') }>
          <StatusTag type="error" text={ t('status.failed') } { ...rest }/>
        </Tooltip>
      );
    case 'selfdestructed':
      return (
        <Tooltip content={ t('contractStatus.selfDestructedTooltip') }>
          <Badge colorPalette="gray" { ...rest }>{ t('contractStatus.selfDestructed') }</Badge>
        </Tooltip>
      );
    default:
      return null;
  }
};

export default React.memo(ContractCreationStatus);
