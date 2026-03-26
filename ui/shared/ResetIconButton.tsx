import { useTranslation } from 'next-i18next';
import React from 'react';

import { CloseButton } from 'toolkit/chakra/close-button';
import { Tooltip } from 'toolkit/chakra/tooltip';

type Props = {
  onClick: () => void;
};

const ResetIconButton = ({ onClick }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip content={ t('action.resetFilter') }>
      <CloseButton onClick={ onClick } ml={ 1 }/>
    </Tooltip>
  );
};

export default ResetIconButton;
