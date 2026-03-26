import { useTranslation } from 'next-i18next';
import React from 'react';

import * as DetailedInfo from './DetailedInfo';

export const TX_ACTIONS_BLOCK_ID = 'tx-actions';

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
  type: 'tx' | 'user_op';
};

const DetailedInfoActionsWrapper = ({ children, isLoading, type }: Props) => {
  const { t } = useTranslation();
  const [ hasScroll, setHasScroll ] = React.useState(false);

  return (
    <>
      <DetailedInfo.ItemLabel
        id={ TX_ACTIONS_BLOCK_ID }
        hint={ type === 'tx' ? t('detailedInfo.txHighlight') : t('detailedInfo.userOpHighlight') }
        isLoading={ isLoading }
        hasScroll={ hasScroll }
      >
        <span>{ type === 'tx' ? t('detailedInfo.txAction') : t('detailedInfo.userOpAction') }</span>
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValueWithScroll
        gradientHeight={ 48 }
        onScrollVisibilityChange={ setHasScroll }
        alignItems="stretch"
        rowGap={ 5 }
        w="100%"
        maxH="200px"
      >
        { children }
      </DetailedInfo.ItemValueWithScroll>

    </>
  );
};

export default React.memo(DetailedInfoActionsWrapper);
