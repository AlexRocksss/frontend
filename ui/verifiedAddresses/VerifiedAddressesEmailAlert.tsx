import { useTranslation } from 'next-i18next';
import React from 'react';

import config from 'configs/app';
import { Alert } from 'toolkit/chakra/alert';
import { Button } from 'toolkit/chakra/button';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';
import AuthModal from 'ui/snippets/auth/AuthModal';
import useLinkEmail from 'ui/snippets/auth/linkEmail/useLinkEmail';

const feature = config.features.account;

const VerifiedAddressesEmailAlert = () => {
  const { t } = useTranslation();
  const authModal = useDisclosure();
  const linkEmail = useLinkEmail();

  const handleButtonClick = React.useCallback(() => {
    if (feature.isEnabled && feature.authProvider === 'dynamic') {
      linkEmail();
    } else {
      authModal.onOpen();
    }
  }, [ authModal, linkEmail ]);

  return (
    <>
      <Alert
        status="warning"
        mb={ 6 }
        descriptionProps={{
          alignItems: 'center',
          gap: 2,
        }}
      >
        { t('verifiedAddresses.emailAlertText') }
        <Button variant="outline" size="sm" onClick={ handleButtonClick }>{ t('verifiedAddresses.addEmail') }</Button>
      </Alert>
      { authModal.open && <AuthModal initialScreen={{ type: 'email', isAuth: true }} onClose={ authModal.onClose }/> }
    </>
  );
};

export default React.memo(VerifiedAddressesEmailAlert);
