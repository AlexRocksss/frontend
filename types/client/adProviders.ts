import type { ArrayElement } from 'types/utils';

export const SUPPORTED_AD_BANNER_PROVIDERS = [
  'slise',
  'adbutler',
  'coinzilla',
  'custom',
  'none',
] as const;

export const CUSTOM_AD_PAGE_KEYS = [
  'home',
  'tx',
  'address',
  'token',
  'marketplace',
] as const;
export type CustomAdPageKey = ArrayElement<typeof CUSTOM_AD_PAGE_KEYS>;

export interface CustomAdItem {
  id: string;
  image_url: string;
  image_url_dark?: string;
  image_url_mobile?: string;
  image_url_mobile_dark?: string;
  link_url: string;
  alt?: string;
}

export interface CustomAdConfig {
  ads: Array<CustomAdItem>;
  pages: Partial<Record<CustomAdPageKey, { enabled: boolean; ad_ids?: Array<string> }>>;
}
export type AdBannerProviders = ArrayElement<typeof SUPPORTED_AD_BANNER_PROVIDERS>;

export const SUPPORTED_AD_BANNER_ADDITIONAL_PROVIDERS = [ 'adbutler' ] as const;
export type AdBannerAdditionalProviders = ArrayElement<typeof SUPPORTED_AD_BANNER_ADDITIONAL_PROVIDERS>;

export const SUPPORTED_AD_TEXT_PROVIDERS = [ 'coinzilla', 'none' ] as const;
export type AdTextProviders = ArrayElement<typeof SUPPORTED_AD_TEXT_PROVIDERS>;
