import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import useApiQuery from 'lib/api/useApiQuery';
import getQueryParamString from 'lib/router/getQueryParamString';
import ClusterDetails from 'ui/cluster/ClusterDetails';
import TextAd from 'ui/shared/ad/TextAd';
import PageTitle from 'ui/shared/Page/PageTitle';

const Cluster = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const encodedClusterName = getQueryParamString(router.query.name);
  const clusterName = decodeURIComponent(encodedClusterName || '');

  const clusterQuery = useApiQuery('clusters:get_cluster_by_name', {
    queryParams: {
      input: JSON.stringify({ name: clusterName }),
    },
  });

  const clusterData = clusterQuery.data?.result?.data;

  const isLoading = clusterQuery.isLoading;

  return (
    <>
      <TextAd mb={ 6 }/>
      <PageTitle title={ t('pages.clusterDetails') }/>
      <ClusterDetails
        clusterData={ clusterData }
        clusterName={ clusterName }
        isLoading={ isLoading }
      />
    </>
  );
};

export default Cluster;
