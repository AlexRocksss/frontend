import { useTranslation } from 'next-i18next';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { FormFields } from '../types';

import config from 'configs/app';

import ContractVerificationMethod from '../ContractVerificationMethod';

const ContractVerificationSourcify = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext<FormFields>();
  const address = watch('address');

  // Disable iframe in private mode to prevent tracking
  if (config.app.isPrivateMode) {
    return (
      <ContractVerificationMethod title={ t('contractVerification.methodSourcifyTitle') }>
        <p>{ t('contractVerification.methodSourcifyPrivateMode') }</p>
      </ContractVerificationMethod>
    );
  }

  const iframeUrl = `https://verify.sourcify.dev/widget?chainId=${ config.chain.id }&address=${ address }`;

  return (
    <ContractVerificationMethod title={ t('contractVerification.methodSourcifyTitle') }>
      <iframe
        src={ iframeUrl }
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
        width="100%"
        height="840"
      />
    </ContractVerificationMethod>
  );
};

export default React.memo(ContractVerificationSourcify);
