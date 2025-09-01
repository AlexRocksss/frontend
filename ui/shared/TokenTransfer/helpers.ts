import type { TokenTransfer } from 'types/api/tokenTransfer';
import config from 'configs/app';

export const getTokenTransferTypeText = (type: TokenTransfer['type']) => {
  switch (type) {
    case 'token_minting':
      return config.t()('Token minting');
    case 'token_burning':
      return config.t()('Token burning');
    case 'token_spawning':
      return config.t()('Token creating');
    case 'token_transfer':
      return config.t()('Token transfer');
  }
};
