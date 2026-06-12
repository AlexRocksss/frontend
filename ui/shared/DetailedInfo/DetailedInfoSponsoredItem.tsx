import { useTranslation } from 'next-i18next';
import React from 'react';

import type { CustomAdPageKey } from 'types/client/adProviders';

import config from 'configs/app';
import * as cookies from 'lib/cookies';
import AdBanner from 'ui/shared/ad/AdBanner';

import * as DetailedInfo from './DetailedInfo';

const feature = config.features.adsBanner;

interface Props {
  isLoading?: boolean;
  pageKey?: CustomAdPageKey;
}

const DetailedInfoSponsoredItem = ({ isLoading, pageKey }: Props) => {
  const { t } = useTranslation();
  const hasAdblockCookie = cookies.get(cookies.NAMES.ADBLOCK_DETECTED);

  if (!feature.isEnabled || hasAdblockCookie === 'true') {
    return null;
  }

  if (feature.provider === 'custom') {
    const pageEntry = pageKey ? feature.customAdConfig.pages[pageKey] : undefined;
    if (!pageEntry || !pageEntry.enabled) {
      return null;
    }
  }

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('detailedInfo.sponsoredTooltip') }
        isLoading={ isLoading }
      >
        { t('detailedInfo.sponsored') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue mt={{ base: 0, lg: 1 }}>
        <AdBanner format="responsive" isLoading={ isLoading } pageKey={ pageKey }/>
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(DetailedInfoSponsoredItem);
