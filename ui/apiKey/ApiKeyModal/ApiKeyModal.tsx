import { useTranslation } from 'next-i18next';
import React, { useCallback, useState } from 'react';

import type { ApiKey } from 'types/api/account';

import FormModal from 'ui/shared/FormModal';

import ApiKeyForm from './ApiKeyForm';

type Props = {
  open: boolean;
  onOpenChange: ({ open }: { open: boolean }) => void;
  data?: ApiKey;
};

const ApiKeyModal: React.FC<Props> = ({ open, onOpenChange, data }) => {
  const { t } = useTranslation();
  const title = data ? t('apiKey.editTitle') : t('apiKey.newTitle');
  const text = !data ? t('apiKey.newText') : '';

  const [ isAlertVisible, setAlertVisible ] = useState(false);

  const renderForm = useCallback(() => {
    return <ApiKeyForm data={ data } onOpenChange={ onOpenChange } setAlertVisible={ setAlertVisible }/>;
  }, [ data, onOpenChange ]);
  return (
    <FormModal<ApiKey>
      open={ open }
      onOpenChange={ onOpenChange }
      title={ title }
      text={ text }
      renderForm={ renderForm }
      isAlertVisible={ isAlertVisible }
      setAlertVisible={ setAlertVisible }
    />
  );
};

export default ApiKeyModal;
