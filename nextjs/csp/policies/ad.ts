import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';
import type CspDev from 'csp-dev';

import config from 'configs/app';
import { connectAdbutler, placeAd } from 'ui/shared/ad/adbutlerScript';

const bannerFeature = config.features.adsBanner;

function getCustomAdImageHosts(): Array<string> {
  if (!bannerFeature.isEnabled || bannerFeature.provider !== 'custom') {
    return [];
  }
  const urls = bannerFeature.customAdConfig.ads.flatMap((ad) => [
    ad.image_url,
    ad.image_url_dark,
    ad.image_url_mobile,
    ad.image_url_mobile_dark,
  ]);
  const origins = new Set<string>();
  urls.forEach((url) => {
    if (!url) {
      return;
    }
    try {
      origins.add(new URL(url).origin);
    } catch { /* ignore malformed urls */ }
  });
  return Array.from(origins);
}

export function ad(): CspDev.DirectiveDescriptor {
  const customAdImgHosts = getCustomAdImageHosts();
  return {
    'connect-src': [
      // coinzilla
      'coinzilla.com',
      '*.coinzilla.com',
      'https://request-global.czilladx.com',

      // sevio (coinzilla text ad)
      '*.adx.ws',

      // adbutler
      'servedbyadbutler.com',

      // slise
      '*.slise.xyz',

      // specify
      'app.specify.sh',
    ],
    'frame-src': [
      // coinzilla
      'https://request-global.czilladx.com',
    ],
    'script-src': [
      // coinzilla
      'coinzillatag.com',

      // adbutler
      'servedbyadbutler.com',
      `'sha256-${ Base64.stringify(sha256(connectAdbutler)) }'`,
      `'sha256-${ Base64.stringify(sha256(placeAd(false) ?? '')) }'`,
      `'sha256-${ Base64.stringify(sha256(placeAd(true) ?? '')) }'`,

      // slise
      '*.slise.xyz',

      // sevio
      'cdn.adx.ws',
    ],
    'img-src': [
      // coinzilla
      'cdn.coinzilla.io',

      // adbutler
      'servedbyadbutler.com',

      // sevio
      '*.adx.ws',

      // custom self-served ad images
      ...customAdImgHosts,
    ],
    'font-src': [
      // coinzilla
      'https://request-global.czilladx.com',
    ],
  };
}
