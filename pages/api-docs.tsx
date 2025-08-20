import type { NextPage } from 'next';
import React from 'react';

import PageNextJs from 'nextjs/PageNextJs';

import config from 'configs/app';
import { useTranslations } from 'next-intl';
import SwaggerUI from 'ui/apiDocs/SwaggerUI';
import PageTitle from 'ui/shared/Page/PageTitle';

const Page: NextPage = () => {
  const t = useTranslations();
  
  return (
    <PageNextJs pathname="/api-docs">
      <PageTitle
        title={ config.meta.seo.enhancedDataEnabled ? `${ config.chain.name } ${ t('API documentation') }` : t('API documentation') }
      />
      <SwaggerUI/>
    </PageNextJs>
  );
};

export default Page;

export { apiDocs as getServerSideProps } from 'nextjs/getServerSideProps';
