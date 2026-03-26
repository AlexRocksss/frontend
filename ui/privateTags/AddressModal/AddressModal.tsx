import { useTranslation } from 'next-i18next';
import React, { useCallback, useState } from 'react';

import type { AddressTag } from 'types/api/account';

import * as mixpanel from 'lib/mixpanel/index';
import FormModal from 'ui/shared/FormModal';

import AddressForm from './AddressForm';

type Props = {
  open: boolean;
  onOpenChange: ({ open }: { open: boolean }) => void;
  onSuccess: () => Promise<void>;
  data?: Partial<AddressTag>;
  pageType: string;
};

const AddressModal: React.FC<Props> = ({ open, onOpenChange, onSuccess, data, pageType }) => {
  const { t } = useTranslation();
  const title = data?.id ? t('privateTags.editAddressTitle') : t('privateTags.newAddressTitle');
  const text = !data?.id ? t('privateTags.newAddressText') : '';

  const [ isAlertVisible, setAlertVisible ] = useState(false);

  React.useEffect(() => {
    open && !data?.id && mixpanel.logEvent(
      mixpanel.EventTypes.PRIVATE_TAG,
      { Action: 'Form opened', 'Page type': pageType, 'Tag type': 'Address' },
    );
  }, [ data?.id, open, pageType ]);

  const handleSuccess = React.useCallback(() => {
    if (!data?.id) {
      mixpanel.logEvent(
        mixpanel.EventTypes.PRIVATE_TAG,
        { Action: 'Submit', 'Page type': pageType, 'Tag type': 'Address' },
      );
    }
    return onSuccess();
  }, [ data?.id, onSuccess, pageType ]);

  const renderForm = useCallback(() => {
    return <AddressForm data={ data } onOpenChange={ onOpenChange } onSuccess={ handleSuccess } setAlertVisible={ setAlertVisible }/>;
  }, [ data, onOpenChange, handleSuccess ]);
  return (
    <FormModal<AddressTag>
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

export default AddressModal;
