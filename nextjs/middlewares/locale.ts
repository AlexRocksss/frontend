import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import * as cookiesLib from 'lib/cookies';

const SUPPORTED_LOCALES = [ 'en', 'zh-TW', 'ja', 'ko', 'ru', 'th', 'id', 'ms', 'vi' ];
const DEFAULT_LOCALE = 'en';

export default function localeMiddleware(req: NextRequest): NextResponse | undefined {
  const { pathname } = req.nextUrl;

  // Skip paths that already carry a locale prefix (e.g. direct navigation to /zh-TW/...)
  const hasLocalePrefix = SUPPORTED_LOCALES.some(
    (locale) => pathname === `/${ locale }` || pathname.startsWith(`/${ locale }/`),
  );
  if (hasLocalePrefix) {
    return undefined;
  }

  const localeCookie = req.cookies.get(cookiesLib.NAMES.LOCALE)?.value;
  const locale = SUPPORTED_LOCALES.includes(localeCookie ?? '') ? localeCookie : DEFAULT_LOCALE;

  // Default locale needs no rewrite — Next.js serves it from the root path
  if (!locale || locale === DEFAULT_LOCALE) {
    return undefined;
  }

  // Internally rewrite to the locale-prefixed path.
  // The browser URL remains unchanged; Next.js receives the rewritten path.
  const url = req.nextUrl.clone();
  url.pathname = `/${ locale }${ pathname }`;
  return NextResponse.rewrite(url);
}
