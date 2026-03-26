import { useTranslation } from 'next-i18next';
import React from 'react';

import type { TokenInfo, TokenInstance } from 'types/api/token';
import type { TokenTransfer } from 'types/api/tokenTransfer';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import { useMultichainContext } from 'lib/contexts/multichain';
import { hasTokenIds, hasTokenTransferValue, isConfidentialTokenType, isFungibleTokenType, NFT_TOKEN_TYPE_IDS } from 'lib/token/tokenTypes';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import { TruncatedText } from 'toolkit/components/truncation/TruncatedText';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';
import TokenTransferTableItem from 'ui/token/TokenTransfer/TokenTransferTableItem';

interface Props {
  data: Array<TokenTransfer>;
  top: number;
  showSocketInfo: boolean;
  showSocketErrorAlert?: boolean;
  socketInfoNum?: number;
  tokenId?: string;
  isLoading?: boolean;
  token: TokenInfo;
  instance?: TokenInstance;
}

const TokenTransferTable = ({ data, top, showSocketInfo, showSocketErrorAlert, socketInfoNum, tokenId, isLoading, token, instance }: Props) => {
  const { t } = useTranslation();
  const multichainContext = useMultichainContext();
  const chainData = multichainContext?.chain;
  const tokenType = token.type;

  return (
    <AddressHighlightProvider>
      <TableRoot minW="950px">
        <TableHeaderSticky top={ top }>
          <TableRow>
            { chainData && <TableColumnHeader width="38px"/> }
            <TableColumnHeader width="280px">
              { t('token.txnHash') }
              <TimeFormatToggle/>
            </TableColumnHeader>
            <TableColumnHeader width="200px">{ t('token.method') }</TableColumnHeader>
            <TableColumnHeader width={{ lg: '224px', xl: '380px' }}>{ t('token.fromTo') }</TableColumnHeader>
            { (NFT_TOKEN_TYPE_IDS.includes(tokenType)) &&
              <TableColumnHeader width={ hasTokenIds(tokenType) ? '50%' : '100%' }>{ t('token.tokenId') }</TableColumnHeader>
            }
            { hasTokenTransferValue(tokenType) && (
              <TableColumnHeader width={ (isFungibleTokenType(tokenType) || isConfidentialTokenType(tokenType)) ? '100%' : '50%' } isNumeric>
                <TruncatedText text={ `${ t('token.value') }${ token?.symbol ? ` ${ token.symbol }` : '' }` } w="100%" verticalAlign="middle"/>
              </TableColumnHeader>
            ) }
          </TableRow>
        </TableHeaderSticky>
        <TableBody>
          { showSocketInfo && (
            <SocketNewItemsNotice.Desktop
              showErrorAlert={ showSocketErrorAlert }
              num={ socketInfoNum }
              type="token_transfer"
              isLoading={ isLoading }
            />
          ) }
          { data.map((item, index) => (
            <TokenTransferTableItem
              key={ item.transaction_hash + item.block_hash + item.log_index + '_' + index }
              { ...item }
              tokenId={ tokenId }
              instance={ instance }
              isLoading={ isLoading }
              chainData={ chainData }
            />
          )) }
        </TableBody>
      </TableRoot>
    </AddressHighlightProvider>
  );
};

export default React.memo(TokenTransferTable);
