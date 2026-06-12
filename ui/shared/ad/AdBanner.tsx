import { chakra } from '@chakra-ui/react';
import React from 'react';

import type { BannerFormat } from './types';
import type { CustomAdPageKey } from 'types/client/adProviders';

import config from 'configs/app';
import { useAppContext } from 'lib/contexts/app';
import * as cookies from 'lib/cookies';

import AdBannerContent from './AdBannerContent';

const feature = config.features.adsBanner;

interface Props {
  className?: string;
  isLoading?: boolean;
  format?: BannerFormat;
  pageKey?: CustomAdPageKey;
}

const AdBanner = ({ className, isLoading, format, pageKey }: Props) => {
  const provider = useAppContext().adBannerProvider;

  const hasAdblockCookie = cookies.get(cookies.NAMES.ADBLOCK_DETECTED, useAppContext().cookies);

  if (!feature.isEnabled || hasAdblockCookie === 'true' || !provider) {
    return null;
  }

  return (
    <AdBannerContent
      className={ className }
      isLoading={ isLoading }
      provider={ provider }
      format={ format }
      pageKey={ pageKey }
    />
  );
};

export default chakra(AdBanner);
