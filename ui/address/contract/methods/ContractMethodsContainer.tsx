import { useTranslation } from 'next-i18next';
import React from 'react';

import type { MethodType } from './types';

import { ContentLoader } from 'toolkit/components/loaders/ContentLoader';
import DataFetchAlert from 'ui/shared/DataFetchAlert';

interface Props {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  type: MethodType;
  children: React.JSX.Element;
}

const ContractMethodsContainer = ({ isLoading, isError, isEmpty, type, children }: Props) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <ContentLoader w="fit-content"/>;
  }

  if (isError) {
    return <DataFetchAlert/>;
  }

  if (isEmpty) {
    return <span>{ type === 'all' ? t('address.noPublicFunctions') : t('address.noPublicFunctionsType', { type }) }</span>;
  }

  return children;
};

export default React.memo(ContractMethodsContainer);
