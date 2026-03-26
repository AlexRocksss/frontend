import { useTranslation } from 'next-i18next';
import React from 'react';

import { ContentLoader } from 'toolkit/components/loaders/ContentLoader';
import ContractVerificationForm from 'ui/contractVerification/ContractVerificationForm';
import useFormConfigQuery from 'ui/contractVerification/useFormConfigQuery';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import PageTitle from 'ui/shared/Page/PageTitle';

const ContractVerification = () => {
  const { t } = useTranslation();
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
      <PageTitle title={ t('pages.verifyAndPublishContract') }/>
      { content }
    </>
  );
};

export default ContractVerification;
