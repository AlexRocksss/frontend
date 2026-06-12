import { chakra } from '@chakra-ui/react';
import React from 'react';

import type { CustomAdPageKey } from 'types/client/adProviders';

import config from 'configs/app';
import { useAppContext } from 'lib/contexts/app';
import * as cookies from 'lib/cookies';

import CustomBanner from './CustomBanner';
import SevioTextAd from './SevioTextAd';

const bannerFeature = config.features.adsBanner;

interface Props {
  className?: string;
  pageKey?: CustomAdPageKey;
}

const TextAd = ({ className, pageKey }: Props) => {
  const hasAdblockCookie = cookies.get(cookies.NAMES.ADBLOCK_DETECTED, useAppContext().cookies);

  if (hasAdblockCookie === 'true') {
    return null;
  }

  if (bannerFeature.isEnabled && bannerFeature.provider === 'custom') {
    if (!pageKey) {
      return null;
    }
    return <CustomBanner className={ className } pageKey={ pageKey }/>;
  }

  if (!config.features.adsText.isEnabled) {
    return null;
  }

  return <SevioTextAd className={ className }/>;
};

export default chakra(TextAd);
