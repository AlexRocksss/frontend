import { Flex, chakra } from '@chakra-ui/react';
import React from 'react';

import type { BannerProps } from './types';
import type { CustomAdConfig, CustomAdItem, CustomAdPageKey } from 'types/client/adProviders';

import config from 'configs/app';
import useIsMobile from 'lib/hooks/useIsMobile';
import { useColorModeValue } from 'toolkit/chakra/color-mode';
import { Link } from 'toolkit/chakra/link';

const AdImage = chakra('img');

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

function buildPool(adsConfig: CustomAdConfig, pageKey: CustomAdPageKey): Array<CustomAdItem> {
  const pageEntry = adsConfig.pages[pageKey];
  if (!pageEntry || !pageEntry.enabled) {
    return [];
  }

  const allowedIds = pageEntry.ad_ids;
  if (allowedIds && allowedIds.length > 0) {
    return adsConfig.ads.filter((ad) => allowedIds.includes(ad.id));
  }
  return adsConfig.ads;
}

const CustomBanner = ({ className, format = 'responsive', pageKey }: Props) => {
  const isMobileViewport = useIsMobile();
  const isMobile = format === 'mobile' || (format === 'responsive' && isMobileViewport);

  const pool = React.useMemo(() => {
    if (!feature.isEnabled || feature.provider !== 'custom') {
      return [];
    }
    return buildPool(feature.customAdConfig, pageKey);
  }, [ pageKey ]);

  const rotationSeconds = feature.isEnabled && feature.provider === 'custom' ? feature.customAdRotationSeconds : 0;

  const [ index, setIndex ] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (pool.length === 0) {
      return;
    }
    setIndex(Math.floor(Math.random() * pool.length));
  }, [ pool ]);

  React.useEffect(() => {
    if (pool.length <= 1 || rotationSeconds <= 0 || index === null) {
      return;
    }
    const id = setInterval(() => {
      setIndex((current) => ((current ?? 0) + 1) % pool.length);
    }, rotationSeconds * 1000);
    return () => clearInterval(id);
  }, [ pool, rotationSeconds, index ]);

  const ad = index !== null ? pool[index] : null;

  const lightSrc = (isMobile ? ad?.image_url_mobile : undefined) ?? ad?.image_url ?? '';
  const darkSrc =
    (isMobile ? ad?.image_url_mobile_dark ?? ad?.image_url_mobile : undefined) ??
    ad?.image_url_dark ??
    ad?.image_url ?? '';
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
        <AdImage
          src={ src }
          alt={ ad.alt ?? '' }
          w="100%"
          h="100%"
          objectFit="contain"
        />
      </Link>
    </Flex>
  );
};

export default chakra(CustomBanner);
