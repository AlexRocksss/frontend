import { useTranslation } from 'next-i18next';
import React from 'react';

import { CctxStatus } from '@blockscout/zetachain-cctx-types';

import { Tag } from 'toolkit/chakra/tag';

type Props = {
  status: CctxStatus;
  isLoading?: boolean;
};

const ZetaChainCCTXStatusTag = ({ status, isLoading }: Props) => {
  const { t } = useTranslation();

  const tagText: Record<CctxStatus, string> = {
    [CctxStatus.PENDING_OUTBOUND]: t('zetaChainStatus.pendingOutbound'),
    [CctxStatus.PENDING_INBOUND]: t('zetaChainStatus.pendingInbound'),
    [CctxStatus.OUTBOUND_MINED]: t('zetaChainStatus.outboundMined'),
    [CctxStatus.PENDING_REVERT]: t('zetaChainStatus.pendingRevert'),
    [CctxStatus.ABORTED]: t('zetaChainStatus.aborted'),
    [CctxStatus.REVERTED]: t('zetaChainStatus.reverted'),
    [CctxStatus.UNRECOGNIZED]: t('zetaChainStatus.unknownStatus'),
  };

  return (
    <Tag loading={ isLoading }>
      { tagText[status] }
    </Tag>
  );
};

export default React.memo(ZetaChainCCTXStatusTag);
