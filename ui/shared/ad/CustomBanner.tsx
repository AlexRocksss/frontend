import { Flex, chakra } from '@chakra-ui/react';
import React from 'react';

import type { BannerProps } from './types';
import type { CustomAdConfig, CustomAdItem, CustomAdPageKey } from 'types/client/adProviders';

import config from 'configs/app';
import useIsMobile from 'lib/hooks/useIsMobile';
import { useColorModeValue } from 'toolkit/chakra/color-mode';
import { Image } from 'toolkit/chakra/image';
import { Link } from 'toolkit/chakra/link';

import {
  DESKTOP_BANNER_HEIGHT,
  DESKTOP_BANNER_WIDTH,
  MOBILE_BANNER_HEIGHT,
  MOBILE_BANNER_WIDTH,
} from './consts';

const feature = config.features.adsBanner;

interface Props extends BannerProps {
  pageKey: CustomAdPageKey;
}

function pickAd(adsConfig: CustomAdConfig, pageKey: CustomAdPageKey): CustomAdItem | null {
  const pageEntry = adsConfig.pages[pageKey];
  if (!pageEntry || !pageEntry.enabled) {
    return null;
  }

  const allowedIds = pageEntry.ad_ids;
  const pool = allowedIds && allowedIds.length > 0 ?
    adsConfig.ads.filter((ad) => allowedIds.includes(ad.id)) :
    adsConfig.ads;

  if (pool.length === 0) {
    return null;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

const CustomBanner = ({ className, format = 'responsive', pageKey }: Props) => {
  const isMobileViewport = useIsMobile();
  const isMobile = format === 'mobile' || (format === 'responsive' && isMobileViewport);

  const [ ad, setAd ] = React.useState<CustomAdItem | null>(null);

  React.useEffect(() => {
    if (!feature.isEnabled || feature.provider !== 'custom') {
      return;
    }
    setAd(pickAd(feature.customAdConfig, pageKey));
  }, [ pageKey ]);

  const lightSrc = ad?.image_url ?? '';
  const darkSrc = ad?.image_url_dark ?? ad?.image_url ?? '';
  const src = useColorModeValue(lightSrc, darkSrc);

  if (!ad) {
    return null;
  }

  const { width, height } = isMobile ?
    { width: MOBILE_BANNER_WIDTH, height: MOBILE_BANNER_HEIGHT } :
    { width: DESKTOP_BANNER_WIDTH, height: DESKTOP_BANNER_HEIGHT };

  return (
    <Flex className={ className } w={ `${ width }px` } h={ `${ height }px` } maxW="100%">
      <Link
        href={ ad.link_url }
        external
        noIcon
        display="block"
        w="100%"
        h="100%"
      >
        <Image
          src={ src }
          alt={ ad.alt ?? '' }
          w="100%"
          h="100%"
          objectFit="contain"
          loading="lazy"
        />
      </Link>
    </Flex>
  );
};

export default chakra(CustomBanner);
