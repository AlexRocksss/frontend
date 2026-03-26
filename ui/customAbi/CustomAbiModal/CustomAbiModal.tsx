import { useTranslation } from 'next-i18next';
import React, { useCallback, useState } from 'react';

import type { CustomAbi } from 'types/api/account';

import FormModal from 'ui/shared/FormModal';

import CustomAbiForm, { type FormData } from './CustomAbiForm';

type Props = {
  open: boolean;
  onOpenChange: ({ open }: { open: boolean }) => void;
  onSuccess?: () => Promise<void>;
  data: FormData;
};

const CustomAbiModal: React.FC<Props> = ({ open, onOpenChange, data, onSuccess }) => {
  const { t } = useTranslation();
  const title = data && 'id' in data ? t('customAbi.editTitle') : t('customAbi.newTitle');
  const text = !(data && 'id' in data) ? t('customAbi.newText') : '';

  const [ isAlertVisible, setAlertVisible ] = useState(false);

  const renderForm = useCallback(() => {
    return <CustomAbiForm data={ data } onOpenChange={ onOpenChange } onSuccess={ onSuccess } setAlertVisible={ setAlertVisible }/>;
  }, [ data, onOpenChange, onSuccess ]);
  return (
    <FormModal<CustomAbi>
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

export default React.memo(CustomAbiModal);
