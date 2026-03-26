import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TokenTransfer } from 'types/api/tokenTransfer';

import { route } from 'nextjs-routes';

import { Link } from 'toolkit/chakra/link';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import IconSvg from 'ui/shared/IconSvg';
import TokenTransferSnippet from 'ui/shared/TokenTransferSnippet/TokenTransferSnippet';
interface Props {
  data: Array<TokenTransfer>;
  txHash: string;
  isOverflow: boolean;
}

const TOKEN_TRANSFERS_TYPE_KEYS = [
  { titleKey: 'tx.tokensTransferred' as const, hintKey: 'tx.hintTokensTransferred' as const, type: 'token_transfer' },
  { titleKey: 'tx.tokensMinted' as const, hintKey: 'tx.hintTokensMinted' as const, type: 'token_minting' },
  { titleKey: 'tx.tokensBurnt' as const, hintKey: 'tx.hintTokensBurnt' as const, type: 'token_burning' },
  { titleKey: 'tx.tokensCreated' as const, hintKey: 'tx.hintTokensCreated' as const, type: 'token_spawning' },
];

const TxDetailsTokenTransfers = ({ data, txHash, isOverflow }: Props) => {
  const { t } = useTranslation();
  const viewAllUrl = route({ pathname: '/tx/[hash]', query: { hash: txHash, tab: 'token_transfers' } });

  const transferGroups = TOKEN_TRANSFERS_TYPE_KEYS.map((group) => ({
    ...group,
    items: data?.filter((token) => token.type === group.type) || [],
  }));

  return (
    <>
      { transferGroups.map(({ titleKey, hintKey, type, items }) => {
        if (items.length === 0) {
          return null;
        }

        return (
          <React.Fragment key={ type }>
            <DetailedInfo.ItemLabel
              hint={ t(hintKey) }
            >
              { t(titleKey) }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue position="relative" multiRow>
              <Flex
                flexDirection="column"
                alignItems="flex-start"
                rowGap={ 1 }
                w="100%"
              >
                { items.map((item, index) => <TokenTransferSnippet key={ index } data={ item }/>) }
              </Flex>
              { isOverflow && (
                <>
                  { /* FIXME use non-navigation icon */ }
                  <IconSvg name="navigation/tokens" boxSize={ 6 }/>
                  <Link href={ viewAllUrl }>
                    { t('tx.viewAll') }
                  </Link>
                </>
              ) }
            </DetailedInfo.ItemValue>
          </React.Fragment>
        );
      }) }
    </>
  );
};

export default React.memo(TxDetailsTokenTransfers);
