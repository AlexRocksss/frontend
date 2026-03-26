import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ValidatorStability } from 'types/api/validators';

import StatusTag from './StatusTag';

interface Props {
  state: ValidatorStability['state'];
  isLoading?: boolean;
}

const ValidatorStabilityStatus = ({ state, isLoading }: Props) => {
  const { t } = useTranslation();

  switch (state) {
    case 'active':
      return <StatusTag type="ok" text={ t('status.active') } loading={ isLoading }/>;
    case 'probation':
      return <StatusTag type="pending" text={ t('status.probation') } loading={ isLoading }/>;
    case 'inactive':
      return <StatusTag type="error" text={ t('status.inactive') } loading={ isLoading }/>;
  }
};

export default React.memo(ValidatorStabilityStatus);
