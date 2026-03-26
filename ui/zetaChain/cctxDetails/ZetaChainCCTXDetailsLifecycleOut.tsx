import { Flex, Grid, Text } from '@chakra-ui/react';
import { BigNumber } from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { type OutboundParams, type CrossChainTx, CctxStatus } from '@blockscout/zetachain-cctx-types';

import config from 'configs/app';
import { Skeleton } from 'toolkit/chakra/skeleton';
import AddressEntityZetaChain from 'ui/shared/entities/address/AddressEntityZetaChain';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TxEntityZetaChainCC from 'ui/shared/entities/tx/TxEntityZetaChainCC';
import TxEntityZetaChainExternal from 'ui/shared/entities/tx/TxEntityZetaChainExternal';
import IconSvg from 'ui/shared/IconSvg';
import StatusTag from 'ui/shared/statusTag/StatusTag';
import ZetaChainCCTXValue from 'ui/shared/zetaChain/ZetaChainCCTXValue';
import useZetaChainConfig from 'ui/zetaChain/useZetaChainConfig';

type Props = {
  outboundParam: OutboundParams;
  tx: CrossChainTx;
  isLoading: boolean;
  isLast: boolean;
  hasTxAfter: boolean;
};

const ZetaChainCCTXDetailsLifecycleOut = ({ outboundParam, tx, isLoading, isLast, hasTxAfter }: Props) => {
  const { t } = useTranslation();
  const { data: chainsConfig } = useZetaChainConfig();
  const chainToId = outboundParam.receiver_chain_id?.toString() || '';
  const chainTo = chainsConfig?.find((chain) => chain.id.toString() === chainToId);

  const gasDecimals = config.chain.currency.decimals;

  if (tx.cctx_status?.status === CctxStatus.PENDING_INBOUND) {
    return null;
  }

  let content: React.ReactNode = null;
  let text: string = '';
  let color: string = '';

  const transactionOrCCTX = (() => {
    if (!outboundParam.hash) {
      return null;
    }
    const isCCTX = tx.related_cctxs.some((cctx) => cctx.index === outboundParam.hash);
    if (isCCTX) {
      return (
        <>
          <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.cctx') }</Text>
          <TxEntityZetaChainCC
            hash={ outboundParam.hash }
            isLoading={ isLoading }
            noIcon
          />
        </>
      );
    }
    return (
      <>
        <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.transaction') }</Text>
        { chainToId !== config.chain.id ? (
          <TxEntityZetaChainExternal chainId={ chainToId } hash={ outboundParam.hash } noIcon/>
        ) : (
          <TxEntity hash={ outboundParam.hash } noIcon/>
        ) }
      </>
    );
  })();

  if (tx.cctx_status?.status === CctxStatus.OUTBOUND_MINED) {
    content = (
      <>
        { transactionOrCCTX }
        <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.status') }</Text>
        <StatusTag type="ok" text={ t('zetaChain.success') }/>
        <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.receiver') }</Text>
        <AddressEntityZetaChain
          address={{ hash: outboundParam.receiver }}
          chainId={ outboundParam.receiver_chain_id?.toString() }
          isLoading={ isLoading }
          truncation="constant"
        />
        <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.transferred') }</Text>
        <ZetaChainCCTXValue
          coinType={ outboundParam.coin_type }
          tokenSymbol={ tx.token_symbol }
          amount={ outboundParam.amount }
          decimals={ tx.decimals ?? null }
          isLoading={ isLoading }
        />
        <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.gasUsed') }</Text>
        <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          { BigNumber(outboundParam.gas_used || 0).div(10 ** gasDecimals).toFormat() }
        </Text>
      </>
    );
    text = t('zetaChain.sentTxTo', { chain: chainTo?.name || t('zetaChain.unknownChain') });
    color = 'text.success';
  } else if (tx.cctx_status?.status === CctxStatus.PENDING_REVERT) {
    if (!isLast) {
      content = (
        <>
          { transactionOrCCTX }
          <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.status') }</Text>
          <StatusTag type="error" text={ t('zetaChain.failed') }/>
        </>
      );
      text = t('zetaChain.destinationTxFailed');
      color = 'text.error';
    } else {
      content = (
        <>
          <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.revertingTo') }</Text>
          <AddressEntityZetaChain
            address={{ hash: outboundParam.receiver }}
            chainId={ outboundParam.receiver_chain_id?.toString() }
            isLoading={ isLoading }
            truncation="constant"
          />
        </>
      );
      text = t('zetaChain.waitingForRevertTo', { chain: chainTo?.name || t('zetaChain.unknownChain') });
      color = 'text.secondary';
    }
  } else if (tx.cctx_status?.status === CctxStatus.PENDING_OUTBOUND) {
    content = (
      <>
        <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.destination') }</Text>
        <AddressEntityZetaChain
          address={{ hash: outboundParam.receiver }}
          chainId={ outboundParam.receiver_chain_id?.toString() }
          isLoading={ isLoading }
          truncation="constant"
        />
        <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.nonce') }</Text>
        <Text>{ outboundParam.tss_nonce }</Text>
      </>
    );
    text = t('zetaChain.waitingForOutboundTxTo', { chain: chainTo?.name || t('zetaChain.unknownChain') });
    color = 'text.secondary';
  } else if (tx.cctx_status?.status === CctxStatus.REVERTED) {
    if (!isLast) {
      content = (
        <>
          { transactionOrCCTX }
          <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.status') }</Text>
          <StatusTag type="error" text={ t('zetaChain.failed') }/>
        </>
      );
      text = t('zetaChain.destinationTxFailed');
      color = 'text.error';
    } else {
      content = (
        <>
          <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.origin') }</Text>
          <AddressEntityZetaChain
            address={{ hash: outboundParam.receiver }}
            chainId={ outboundParam.receiver_chain_id?.toString() }
            isLoading={ isLoading }
            truncation="constant"
          />
          { transactionOrCCTX }
          <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.status') }</Text>
          <StatusTag type="ok" text={ t('zetaChain.success') }/>
          <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.transferred') }</Text>
          <ZetaChainCCTXValue
            coinType={ outboundParam.coin_type }
            tokenSymbol={ tx.token_symbol }
            amount={ outboundParam.amount }
            decimals={ tx.decimals ?? null }
            isLoading={ isLoading }
          />
          <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.gasUsed') }</Text>
          <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            { BigNumber(outboundParam.gas_used || 0).div(10 ** gasDecimals).toFormat() }&nbsp;
          </Text>
        </>
      );
      text = t('zetaChain.revertedTo', { chain: chainTo?.name || t('zetaChain.unknownChain') });
      color = 'text.success';
    }
  } else if (tx.cctx_status?.status === CctxStatus.ABORTED) {
    if (!isLast) {
      content = (
        <>
          <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.receiver') }</Text>
          <AddressEntityZetaChain
            address={{ hash: outboundParam.receiver }}
            chainId={ outboundParam.receiver_chain_id?.toString() }
            isLoading={ isLoading }
            truncation="constant"
          />
        </>
      );
      text = t('zetaChain.destinationTxFailed');
      color = 'text.error';
    } else {
      content = (
        <>
          <Text color="text.secondary" fontWeight="medium">{ t('zetaChain.sender') }</Text>
          <AddressEntityZetaChain
            address={{ hash: outboundParam.receiver }}
            chainId={ outboundParam.receiver_chain_id?.toString() }
            isLoading={ isLoading }
            truncation="constant"
          />
        </>
      );
      const isFailed = tx.cctx_status?.is_abort_refunded === false;
      text = isFailed ? t('zetaChain.abortFailed') : t('zetaChain.abortExecuted');
      color = isFailed ? 'text.error' : 'text.success';
    }
  }

  return (
    <>
      { /* we need this block here to cover the vertical line (if it's the last block in lifecycle) */ }
      <Flex
        h="100%"
        w="100%"
        bg={ (isLast && !hasTxAfter) ? 'bg.primary' : 'transparent' }
        zIndex={ 1 }
      >
        <IconSvg name="verification-steps/finalized" boxSize={ 5 } bg="bg.primary" zIndex={ 1 } color={ color }/>
      </Flex>
      <Skeleton loading={ isLoading } w="100%" overflow="hidden">
        <Flex color={ color } maxH="20px" alignItems="center" mb={ 2.5 }>
          { text }
        </Flex>
        <Grid
          templateColumns="100px 1fr"
          gap={ 3 }
          bg={{ _light: 'blackAlpha.100', _dark: 'whiteAlpha.100' }}
          py={ 3 }
          px={ 4 }
          borderBottomRadius="md"
          fontSize="sm"
        >
          { content }
        </Grid>
      </Skeleton>
    </>
  );
};

export default ZetaChainCCTXDetailsLifecycleOut;
