import type { TokenTransfer } from 'types/api/tokenTransfer';
import config from 'configs/app';
import { useTranslations } from 'next-intl';

export const getTokenTransferTypeText = (type: TokenTransfer['type']) => {
  const t = useTranslations();
  
  switch (type) {
    case 'token_minting':
      return t('Token minting');
    case 'token_burning':
      return t('Token burning');
    case 'token_spawning':
      return t('Token creating');
    case 'token_transfer':
      return t('Token transfer');
  }
};
