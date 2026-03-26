import { useTranslation } from 'next-i18next';
import React from 'react';

import { CctxStatusReduced } from '@blockscout/zetachain-cctx-types';

import StatusTag, { type StatusTagType } from 'ui/shared/statusTag/StatusTag';

type Props = {
  status: CctxStatusReduced;
  isLoading?: boolean;
  type?: 'reduced' | 'full';
};

const ZetaChainCCTXReducedStatus = ({ status, isLoading, type = 'reduced' }: Props) => {
  const { t } = useTranslation();

  let statusTagType: StatusTagType;
  switch (status) {
    case CctxStatusReduced.SUCCESS:
      statusTagType = 'ok';
      break;
    case CctxStatusReduced.PENDING:
      statusTagType = 'pending';
      break;
    case CctxStatusReduced.FAILED:
      statusTagType = 'error';
      break;
    case CctxStatusReduced.UNRECOGNIZED:
      statusTagType = 'pending';
      break;
  }

  if (type === 'full') {
    let text: string;
    switch (status) {
      case CctxStatusReduced.SUCCESS:
        text = t('status.success');
        break;
      case CctxStatusReduced.PENDING:
        text = t('status.pending');
        break;
      case CctxStatusReduced.FAILED:
        text = t('status.failed');
        break;
      case CctxStatusReduced.UNRECOGNIZED:
        text = t('status.unrecognized');
        break;
    }
    return <StatusTag type={ statusTagType } text={ text } size="md" loading={ isLoading }/>;
  }

  return <StatusTag type={ statusTagType } size="sm" loading={ isLoading }/>;
};

export default ZetaChainCCTXReducedStatus;
