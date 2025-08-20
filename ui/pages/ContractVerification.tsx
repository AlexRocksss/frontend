import React from 'react';

import ContractVerificationForm from 'ui/contractVerification/ContractVerificationForm';
import useFormConfigQuery from 'ui/contractVerification/useFormConfigQuery';
import ContentLoader from 'ui/shared/ContentLoader';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import PageTitle from 'ui/shared/Page/PageTitle';
import config from 'configs/app';
import { useTranslations } from 'next-intl';

const ContractVerification = () => {
  const t = useTranslations();
  const configQuery = useFormConfigQuery(true);

  const content = (() => {
    if (configQuery.isError) {
      return <DataFetchAlert/>;
    }

    if (configQuery.isPending) {
      return <ContentLoader/>;
    }

    return (
      <ContractVerificationForm config={ configQuery.data }/>
    );
  })();

  return (
    <>
      <PageTitle title={ t('Verify & publish contract') }/>
      { content }
    </>
  );
};

export default ContractVerification;
