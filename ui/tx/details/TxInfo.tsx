import {
  Box,
  GridItem,
  Text,
  Spinner,
  Flex,
  chakra,
  VStack,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type * as tac from '@blockscout/tac-operation-lifecycle-types';
import { SCROLL_L2_BLOCK_STATUSES } from 'types/api/scrollL2';
import type { Transaction } from 'types/api/transaction';
import { ZKEVM_L2_TX_STATUSES } from 'types/api/transaction';
import { ZKSYNC_L2_TX_BATCH_STATUSES } from 'types/api/zkSyncL2';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import useIsMobile from 'lib/hooks/useIsMobile';
import getNetworkValidatorTitle from 'lib/networks/getNetworkValidatorTitle';
import * as arbitrum from 'lib/rollups/arbitrum';
import { formatZkEvmTxStatus, formatZkSyncL2TxnBatchStatus, layerLabels } from 'lib/rollups/utils';
import getConfirmationDuration from 'lib/tx/getConfirmationDuration';
import { currencyUnits } from 'lib/units';
import { Badge } from 'toolkit/chakra/badge';
import { CollapsibleDetails } from 'toolkit/chakra/collapsible';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Tooltip } from 'toolkit/chakra/tooltip';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoNativeCoinValue from 'ui/shared/DetailedInfo/DetailedInfoNativeCoinValue';
import DetailedInfoSponsoredItem from 'ui/shared/DetailedInfo/DetailedInfoSponsoredItem';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import AddressEntityInterop from 'ui/shared/entities/address/AddressEntityInterop';
import BatchEntityL2 from 'ui/shared/entities/block/BatchEntityL2';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import IconSvg from 'ui/shared/IconSvg';
import LogDecodedInputData from 'ui/shared/logs/LogDecodedInputData';
import RawInputData from 'ui/shared/RawInputData';
import StatusTag from 'ui/shared/statusTag/StatusTag';
import TxStatus from 'ui/shared/statusTag/TxStatus';
import TextSeparator from 'ui/shared/TextSeparator';
import Utilization from 'ui/shared/Utilization/Utilization';
import GasPriceValue from 'ui/shared/value/GasPriceValue';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';
import VerificationSteps from 'ui/shared/verificationSteps/VerificationSteps';
import TxDetailsActions from 'ui/tx/details/txDetailsActions/TxDetailsActions';
import TxDetailsBurntFees from 'ui/tx/details/TxDetailsBurntFees';
import TxDetailsFeePerGas from 'ui/tx/details/TxDetailsFeePerGas';
import TxDetailsGasPrice from 'ui/tx/details/TxDetailsGasPrice';
import TxDetailsOther from 'ui/tx/details/TxDetailsOther';
import TxDetailsTokenTransfers from 'ui/tx/details/TxDetailsTokenTransfers';
import TxDetailsWithdrawalStatusOptimistic from 'ui/tx/details/TxDetailsWithdrawalStatusOptimistic';
import TxRevertReason from 'ui/tx/details/TxRevertReason';
import TxAllowedPeekers from 'ui/tx/TxAllowedPeekers';
import TxExternalTxs from 'ui/tx/TxExternalTxs';
import TxSocketAlert from 'ui/tx/TxSocketAlert';
import ZkSyncL2TxnBatchHashesInfo from 'ui/txnBatches/zkSyncL2/ZkSyncL2TxnBatchHashesInfo';

import TxDetailsCrossChainMessages from './TxDetailsCrossChainMessages';
import TxDetailsCrossChainTransfers from './TxDetailsCrossChainTransfers';
import TxDetailsGasUsage from './TxDetailsGasUsage';
import TxDetailsInterop from './TxDetailsInterop';
import TxDetailsSetMaxGasLimit from './TxDetailsSetMaxGasLimit';
import TxDetailsTacOperation from './TxDetailsTacOperation';
import TxDetailsTxFee from './TxDetailsTxFee';
import TxDetailsWithdrawalStatusArbitrum from './TxDetailsWithdrawalStatusArbitrum';
import TxInfoScrollFees from './TxInfoScrollFees';

interface Props {
  data: Transaction | undefined;
  tacOperations?: Array<tac.OperationDetails>;
  isLoading: boolean;
  socketStatus?: 'close' | 'error';
  noTxActions?: boolean;
}

const externalTxFeature = config.features.externalTxs;
const rollupFeature = config.features.rollup;

const TxInfo = ({ data, tacOperations, isLoading, socketStatus, noTxActions }: Props) => {
  const [ isExpanded, setIsExpanded ] = React.useState(false);

  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const externalTxsQuery = useApiQuery('general:tx_external_transactions', {
    pathParams: {
      hash: data?.hash,
    },
    queryOptions: {
      enabled: externalTxFeature.isEnabled,
      placeholderData: [ '1', '2', '3' ],
    },
  });

  const handleCutLinkClick = React.useCallback(() => {
    setIsExpanded((flag) => !flag);
  }, []);

  const showAssociatedL1Tx = React.useCallback(() => {
    setIsExpanded(true);
  }, []);

  if (!data) {
    return null;
  }

  const addressFromTags = [
    ...data.from.private_tags || [],
    ...data.from.public_tags || [],
    ...data.from.watchlist_names || [],
  ].map((tag) => <Badge key={ tag.label }>{ tag.display_name }</Badge>);

  const toAddress = data.to ? data.to : data.created_contract;
  const addressToTags = [
    ...toAddress?.private_tags || [],
    ...toAddress?.public_tags || [],
    ...toAddress?.watchlist_names || [],
  ].map((tag) => <Badge key={ tag.label }>{ tag.display_name }</Badge>);

  const executionSuccessBadge = toAddress?.is_contract && data.result === 'success' ? (
    <Tooltip content={ t('tx.executionSuccess') }>
      <chakra.span display="inline-flex" ml={ 2 } mr={ 1 }>
        <IconSvg name="status/success" boxSize={ 4 } color={{ _light: 'blackAlpha.800', _dark: 'whiteAlpha.800' }} cursor="pointer"/>
      </chakra.span>
    </Tooltip>
  ) : null;
  const executionFailedBadge = toAddress?.is_contract && Boolean(data.status) && data.result !== 'success' ? (
    <Tooltip content={ t('tx.executionFailure') }>
      <chakra.span display="inline-flex" ml={ 2 } mr={ 1 }>
        <IconSvg name="status/error" boxSize={ 4 } color="text.error" cursor="pointer"/>
      </chakra.span>
    </Tooltip>
  ) : null;

  const hasInterop = rollupFeature.isEnabled && rollupFeature.interopEnabled && data.op_interop_messages && data.op_interop_messages.length > 0;

  return (
    <DetailedInfo.Container templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(215px, auto) minmax(0, 1fr)' }}>

      { config.features.metasuites.isEnabled && (
        <>
          <Box display="none" as="p" id="meta-suites__tx-info-label" data-status={ data.status } data-ready={ !isLoading }/>
          <Box display="none" as="p" id="meta-suites__tx-info-value"/>
          <DetailedInfo.ItemDivider display="none" as="p" id="meta-suites__details-info-item-divider"/>
        </>
      ) }

      { socketStatus && (
        <GridItem colSpan={{ base: undefined, lg: 2 }} mb={ 2 }>
          <TxSocketAlert status={ socketStatus }/>
        </GridItem>
      ) }

      { tacOperations && tacOperations.length > 0 && <TxDetailsTacOperation tacOperations={ tacOperations } isLoading={ isLoading } txHash={ data.hash }/> }

      { data.op_interop_messages ? data.op_interop_messages.map((message) => (
        <TxDetailsInterop key={ message.nonce } data={ message } isLoading={ isLoading }/>
      )) : null }

      { config.features.crossChainTxs.isEnabled && <TxDetailsCrossChainMessages hash={ data.hash } isLoading={ isLoading }/> }

      <DetailedInfo.ItemLabel
        hint={ t('tx.hintTransactionHash') }
        isLoading={ isLoading }
      >
        { t('tx.transactionHash') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow={ config.features.externalTxs.isEnabled && externalTxsQuery.data && externalTxsQuery.data.length > 0 }>
        <Flex flexWrap="nowrap" alignItems="center" overflow="hidden">
          { data.status === null && <Spinner mr={ 2 } size="sm" flexShrink={ 0 }/> }
          <Skeleton loading={ isLoading } overflow="hidden">
            <HashStringShortenDynamic hash={ data.hash }/>
          </Skeleton>
          <CopyToClipboard text={ data.hash } isLoading={ isLoading }/>
          { config.features.metasuites.isEnabled && (
            <>
              <TextSeparator flexShrink={ 0 } display="none" id="meta-suites__tx-explorer-separator"/>
              <Box display="none" flexShrink={ 0 } id="meta-suites__tx-explorer-link"/>
            </>
          ) }
        </Flex>
        { config.features.externalTxs.isEnabled && externalTxsQuery.data && externalTxsQuery.data.length > 0 && (
          <Skeleton loading={ isLoading || externalTxsQuery.isPlaceholderData } display={{ base: 'block', lg: 'inline-flex' }} alignItems="center">
            { !isMobile && <TextSeparator flexShrink={ 0 }/> }
            <TxExternalTxs data={ externalTxsQuery.data }/>
          </Skeleton>
        ) }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('tx.hintStatusAndMethod') }
        isLoading={ isLoading }
      >
        {
          rollupFeature.isEnabled &&
          (rollupFeature.type === 'zkEvm' || rollupFeature.type === 'zkSync' || rollupFeature.type === 'arbitrum' || rollupFeature.type === 'scroll') ?
            t('tx.layerStatusAndMethod', { layer: layerLabels.current }) :
            t('tx.statusAndMethod')
        }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <TxStatus status={ data.status } errorText={ data.status === 'error' ? data.result : undefined } isLoading={ isLoading }/>
        { data.method && (
          <Badge colorPalette={ data.method === 'Multicall' ? 'teal' : 'gray' } loading={ isLoading } truncated ml={ 3 }>
            { data.method }
          </Badge>
        ) }
        { data.arbitrum?.contains_message && (
          <Skeleton loading={ isLoading } onClick={ showAssociatedL1Tx }>
            <Link truncate ml={ 3 }>
              { data.arbitrum?.contains_message === 'incoming' ? t('tx.incomingMessage') : t('tx.outgoingMessage') }
            </Link>
          </Skeleton>
        ) }
      </DetailedInfo.ItemValue>

      { rollupFeature.isEnabled && rollupFeature.type === 'optimistic' && data.op_withdrawals && data.op_withdrawals.length > 0 &&
      !config.UI.views.tx.hiddenFields?.L1_status && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintWithdrawalStatus') }
          >
            { t('tx.withdrawalStatus') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Flex flexDir="column" rowGap={ 2 }>
              { data.op_withdrawals.map((withdrawal) => (
                <Box key={ withdrawal.nonce }>
                  <Box mb={ 2 } py={{ base: '5px', lg: 1 }}>
                    <span>{ t('tx.noncePrefixed') }</span>
                    <chakra.span fontWeight={ 600 }>{ withdrawal.nonce }</chakra.span>
                  </Box>
                  <TxDetailsWithdrawalStatusOptimistic data={ withdrawal } txHash={ data.hash } from={ data.from }/>
                </Box>
              )) }
            </Flex>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.zkevm_status && !config.UI.views.tx.hiddenFields?.L1_status && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintConfirmationStatus', { parent: layerLabels.parent }) }
            isLoading={ isLoading }
          >
            { t('tx.confirmationStatus') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <VerificationSteps
              currentStep={ formatZkEvmTxStatus(data.zkevm_status) }
              steps={ ZKEVM_L2_TX_STATUSES.map(formatZkEvmTxStatus) }
              isLoading={ isLoading }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.arbitrum?.status && !config.UI.views.tx.hiddenFields?.L1_status && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintConfirmationStatus', { parent: layerLabels.parent }) }
            isLoading={ isLoading }
          >
            { t('tx.parentStatus', { parent: layerLabels.parent }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <VerificationSteps
              currentStep={ arbitrum.VERIFICATION_STEPS_MAP[data.arbitrum.status] }
              currentStepPending={ arbitrum.getVerificationStepStatus(data.arbitrum) === 'pending' }
              steps={ arbitrum.verificationSteps }
              isLoading={ isLoading }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.revert_reason && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintRevertReason') }
          >
            { t('tx.revertReason') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue flexWrap="wrap" mt={{ base: '5px', lg: '4px' }}>
            <TxRevertReason { ...data.revert_reason }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.zksync && !config.UI.views.tx.hiddenFields?.L1_status && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintZkSyncStatus') }
            isLoading={ isLoading }
          >
            { t('tx.parentStatus', { parent: layerLabels.parent }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <VerificationSteps
              steps={ ZKSYNC_L2_TX_BATCH_STATUSES.map(formatZkSyncL2TxnBatchStatus) }
              currentStep={ formatZkSyncL2TxnBatchStatus(data.zksync.status) }
              isLoading={ isLoading }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemLabel
        hint={ t('tx.hintBlock') }
        isLoading={ isLoading }
      >
        { t('tx.block') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow={ Boolean(data.scroll?.l2_block_status) }>
        { data.block_number === null ?
          <Text>{ t('tx.pending') }</Text> : (
            <BlockEntity
              isLoading={ isLoading }
              number={ data.block_number }
              noIcon
            />
          ) }
        { Boolean(data.confirmations) && (
          <>
            <TextSeparator/>
            <Skeleton loading={ isLoading } color="text.secondary">
              <span>{ data.confirmations } { t('tx.blockConfirmations') }</span>
            </Skeleton>
          </>
        ) }
        { data.scroll?.l2_block_status && (
          <>
            <TextSeparator/>
            <VerificationSteps steps={ SCROLL_L2_BLOCK_STATUSES } currentStep={ data.scroll.l2_block_status } isLoading={ isLoading }/>
          </>
        ) }
      </DetailedInfo.ItemValue>

      { data.zkevm_batch_number && !config.UI.views.tx.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintTxnBatch') }
            isLoading={ isLoading }
          >
            { t('tx.txnBatch') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <BatchEntityL2
              isLoading={ isLoading }
              number={ data.zkevm_batch_number }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.zksync && !config.UI.views.tx.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintBatch') }
            isLoading={ isLoading }
          >
            { t('tx.batch') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { data.zksync.batch_number ? (
              <BatchEntityL2
                isLoading={ isLoading }
                number={ data.zksync.batch_number }
              />
            ) : <Skeleton loading={ isLoading }>Pending</Skeleton> }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.arbitrum && !config.UI.views.tx.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintArbitrumBatch') }
            isLoading={ isLoading }
          >
            { t('tx.batch') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { data.arbitrum.batch_number ?
              <BatchEntityL2 isLoading={ isLoading } number={ data.arbitrum.batch_number }/> :
              <Skeleton loading={ isLoading }>{ t('tx.pending') }</Skeleton> }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.timestamp && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintTimestamp') }
            isLoading={ isLoading }
          >
            { t('tx.timestamp') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue multiRow>
            <DetailedInfoTimestamp timestamp={ data.timestamp } isLoading={ isLoading }/>
            { data.confirmation_duration && (
              <Flex alignItems="center">
                <TextSeparator hideBelow="lg"/>
                <Skeleton loading={ isLoading } color="text.secondary">
                  <span>{ getConfirmationDuration(t, data.confirmation_duration) }</span>
                </Skeleton>
              </Flex>
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.execution_node && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintKettle') }
            isLoading={ isLoading }
          >
            { t('tx.kettle') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <AddressEntity
              address={ data.execution_node }
              href={ route({ pathname: '/txs/kettle/[hash]', query: { hash: data.execution_node.hash } }) }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.allowed_peekers && data.allowed_peekers.length > 0 && (
        <TxAllowedPeekers items={ data.allowed_peekers }/>
      ) }

      <DetailedInfoSponsoredItem isLoading={ isLoading }/>

      <DetailedInfo.ItemDivider/>

      { !noTxActions && <TxDetailsActions hash={ data.hash } actions={ data.actions } isTxDataLoading={ isLoading }/> }

      <DetailedInfo.ItemLabel
        hint={ t('tx.hintFrom') }
        isLoading={ isLoading }
      >
        { t('tx.from') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue columnGap={ 3 }>
        <AddressEntity
          address={ data.from }
          isLoading={ isLoading }
        />
        { data.from.name && <Text>{ data.from.name }</Text> }
        { addressFromTags.length > 0 && (
          <Flex columnGap={ 3 }>
            { addressFromTags }
          </Flex>
        ) }
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('tx.hintTo') }
        isLoading={ isLoading }
      >
        { data.to?.is_contract ? t('tx.interactedWith') : t('tx.to') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue
        flexWrap={{ base: 'wrap', lg: 'nowrap' }}
        columnGap={ 3 }
      >
        { toAddress ? (
          <>
            { data.to && data.to.hash ? (
              <Flex flexWrap="nowrap" alignItems="center" maxW="100%">
                <AddressEntity
                  address={ toAddress }
                  isLoading={ isLoading }
                />
                { executionSuccessBadge }
                { executionFailedBadge }
              </Flex>
            ) : (
              <Flex width="100%" whiteSpace="pre" alignItems="center" flexShrink={ 0 }>
                <span>{ t('tx.contractCreatedPrefix') }</span>
                <AddressEntity
                  address={ toAddress }
                  isLoading={ isLoading }
                  noIcon
                />
                <span>{ t('tx.contractCreatedSuffix') }</span>
                { executionSuccessBadge }
                { executionFailedBadge }
              </Flex>
            ) }
            { addressToTags.length > 0 && (
              <Flex columnGap={ 3 }>
                { addressToTags }
              </Flex>
            ) }
          </>
        ) : (
          <span>{ t('tx.contractCreation') }</span>
        ) }
      </DetailedInfo.ItemValue>

      { data.token_transfers && <TxDetailsTokenTransfers data={ data.token_transfers } txHash={ data.hash } isOverflow={ data.token_transfers_overflow }/> }

      { config.features.crossChainTxs.isEnabled && <TxDetailsCrossChainTransfers hash={ data.hash } isLoading={ isLoading }/> }

      { hasInterop && data.op_interop_messages?.some(message => message.target_address_hash) && (
        <>
          <DetailedInfo.ItemLabel
            isLoading={ isLoading }
            hint={ t('tx.hintInteropTarget') }
          >
            { t('tx.interopTarget') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <VStack gap={ 2 } w="100%" overflow="hidden" alignItems="flex-start">
              { data.op_interop_messages
                .filter((message) => message.target_address_hash)
                .map((message) => {
                  return message.relay_chain !== undefined ? (
                    <AddressEntityInterop
                      chain={ message.relay_chain }
                      address={{ hash: message.target_address_hash }}
                      isLoading={ isLoading }
                      truncation="dynamic"
                      w="100%"
                    />
                  ) : (
                    <AddressEntity address={{ hash: message.target_address_hash }} isLoading={ isLoading } truncation="dynamic" w="100%"/>
                  );
                }) }
            </VStack>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemDivider/>

      { (data.arbitrum?.commitment_transaction.hash || data.arbitrum?.confirmation_transaction.hash) &&
      (
        <>
          { data.arbitrum?.commitment_transaction.hash && (
            <>
              <DetailedInfo.ItemLabel
                hint={ t('tx.hintCommitmentTx', { parent: layerLabels.parent }) }
                isLoading={ isLoading }
              >
                { t('tx.commitmentTx') }
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <TxEntityL1 hash={ data.arbitrum?.commitment_transaction.hash } isLoading={ isLoading }/>
                { data.arbitrum?.commitment_transaction.status === 'finalized' && <StatusTag type="ok" text="Finalized" ml={ 2 }/> }
              </DetailedInfo.ItemValue>
            </>
          ) }
          { data.arbitrum?.confirmation_transaction.hash && (
            <>
              <DetailedInfo.ItemLabel
                hint={ t('tx.hintConfirmationTx', { parent: layerLabels.parent }) }
                isLoading={ isLoading }
              >
                { t('tx.confirmationTx') }
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <TxEntityL1 hash={ data.arbitrum?.confirmation_transaction.hash } isLoading={ isLoading }/>
                { data.arbitrum?.commitment_transaction.status === 'finalized' && <StatusTag type="ok" text="Finalized" ml={ 2 }/> }
              </DetailedInfo.ItemValue>
            </>
          ) }
          <DetailedInfo.ItemDivider/>
        </>
      ) }

      { data.zkevm_sequence_hash && (
        <>
          <DetailedInfo.ItemLabel
            isLoading={ isLoading }
          >
            Sequence tx hash
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue flexWrap="nowrap">
            <Skeleton loading={ isLoading } overflow="hidden">
              <HashStringShortenDynamic hash={ data.zkevm_sequence_hash }/>
            </Skeleton>
            <CopyToClipboard text={ data.zkevm_sequence_hash } isLoading={ isLoading }/>
          </DetailedInfo.ItemValue>
        </>

      ) }

      { data.zkevm_verify_hash && (
        <>
          <DetailedInfo.ItemLabel
            isLoading={ isLoading }
          >
            Verify tx hash
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue flexWrap="nowrap">
            <Skeleton loading={ isLoading } overflow="hidden">
              <HashStringShortenDynamic hash={ data.zkevm_verify_hash }/>
            </Skeleton>
            <CopyToClipboard text={ data.zkevm_verify_hash } isLoading={ isLoading }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { (data.zkevm_batch_number || data.zkevm_verify_hash) && <DetailedInfo.ItemDivider/> }

      { !config.UI.views.tx.hiddenFields?.value && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintValue') }
            isLoading={ isLoading }
          >
            { t('tx.value') }
          </DetailedInfo.ItemLabel>
          <DetailedInfoNativeCoinValue
            amount={ data.value }
            exchangeRate={ data.exchange_rate }
            historicalExchangeRate={ data.historic_exchange_rate }
            hasExchangeRateToggle
            loading={ isLoading }
          />
        </>
      ) }

      <TxDetailsTxFee isLoading={ isLoading } data={ data }/>

      { rollupFeature.isEnabled && rollupFeature.type === 'optimistic' && data.operator_fee && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintOperatorFee') }
          >
            { t('tx.operatorFee') }
          </DetailedInfo.ItemLabel>
          <DetailedInfoNativeCoinValue
            amount={ data.operator_fee }
            exchangeRate={ data.exchange_rate }
            historicalExchangeRate={ data.historic_exchange_rate }
            hasExchangeRateToggle
            loading={ isLoading }
          />
        </>
      ) }

      { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && data.arbitrum && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintPosterFee', { parent: layerLabels.parent }) }
            isLoading={ isLoading }
          >
            { t('tx.posterFee') }
          </DetailedInfo.ItemLabel>
          <DetailedInfoNativeCoinValue
            amount={ data.arbitrum.poster_fee }
            exchangeRate={ data.exchange_rate }
            historicalExchangeRate={ data.historic_exchange_rate }
            hasExchangeRateToggle
            loading={ isLoading }
          />

          <DetailedInfo.ItemLabel
            hint={ t('tx.hintNetworkFee', { current: layerLabels.current }) }
            isLoading={ isLoading }
          >
            { t('tx.networkFee') }
          </DetailedInfo.ItemLabel>
          <DetailedInfoNativeCoinValue
            amount={ data.arbitrum.network_fee }
            exchangeRate={ data.exchange_rate }
            historicalExchangeRate={ data.historic_exchange_rate }
            hasExchangeRateToggle
            loading={ isLoading }
          />
        </>
      ) }

      <TxDetailsGasPrice gasPrice={ data.gas_price } gasToken={ data.celo?.gas_token } isLoading={ isLoading }/>

      <TxDetailsFeePerGas txFee={ data.fee.value } gasUsed={ data.gas_used } isLoading={ isLoading }/>

      { !config.UI.views.tx.additionalFields?.set_max_gas_limit && <TxDetailsGasUsage isLoading={ isLoading } data={ data }/> }

      { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && data.arbitrum && data.gas_used && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintGasUsedForParent', { current: layerLabels.current, parent: layerLabels.parent }) }
            isLoading={ isLoading }
          >
            { t('tx.gasUsedForParent', { parent: layerLabels.parent }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isLoading }>{ BigNumber(data.arbitrum.gas_used_for_l1 || 0).toFormat() }</Skeleton>
            <TextSeparator/>
            <Utilization
              ml={ 4 }
              value={ BigNumber(data.arbitrum.gas_used_for_l1 || 0).dividedBy(BigNumber(data.gas_used)).toNumber() }
              isLoading={ isLoading }
            />
          </DetailedInfo.ItemValue>

          <DetailedInfo.ItemLabel
            hint={ t('tx.hintGasUsedForCurrent', { current: layerLabels.current }) }
            isLoading={ isLoading }
          >
            { t('tx.gasUsedForCurrent', { current: layerLabels.current }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isLoading }>{ BigNumber(data.arbitrum.gas_used_for_l2 || 0).toFormat() }</Skeleton>
            <TextSeparator/>
            <Utilization
              ml={ 4 }
              value={ BigNumber(data.arbitrum.gas_used_for_l2 || 0).dividedBy(BigNumber(data.gas_used)).toNumber() }
              isLoading={ isLoading }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.scroll?.l1_gas_used !== undefined && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintL1GasUsed', { parent: layerLabels.parent }) }
            isLoading={ isLoading }
          >
            { t('tx.l1GasUsed', { parent: layerLabels.parent }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isLoading }>{ BigNumber(data.scroll?.l1_gas_used || 0).toFormat() }</Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { !config.UI.views.tx.hiddenFields?.gas_fees &&
            (data.base_fee_per_gas || data.max_fee_per_gas || data.max_priority_fee_per_gas) && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('tx.hintGasFees', { validatorTitle: getNetworkValidatorTitle() }) }
            isLoading={ isLoading }
          >
            { t('tx.gasFees', { gwei: currencyUnits.gwei }) }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue multiRow>
            { data.base_fee_per_gas && (
              <NativeCoinValue
                amount={ data.base_fee_per_gas }
                units="gwei"
                unitsTooltip="wei"
                noSymbol
                loading={ isLoading }
                startElement={ t('tx.base') }
                endElement={ (data.max_fee_per_gas || data.max_priority_fee_per_gas) && <TextSeparator/> }
              />
            ) }
            { data.max_fee_per_gas && (
              <NativeCoinValue
                amount={ data.max_fee_per_gas }
                units="gwei"
                unitsTooltip="wei"
                noSymbol
                loading={ isLoading }
                startElement={ t('tx.max') }
                endElement={ data.max_priority_fee_per_gas && <TextSeparator/> }
              />
            ) }
            { data.max_priority_fee_per_gas && (
              <NativeCoinValue
                amount={ data.max_priority_fee_per_gas }
                units="gwei"
                unitsTooltip="wei"
                noSymbol
                loading={ isLoading }
                startElement={ t('tx.maxPriority') }
              />
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      <TxDetailsBurntFees data={ data } isLoading={ isLoading }/>

      { rollupFeature.isEnabled && rollupFeature.type === 'optimistic' && (
        <>
          { data.l1_gas_used && (
            <>
              <DetailedInfo.ItemLabel
                hint={ t('tx.hintL1GasUsedByTxn', { parent: layerLabels.parent }) }
                isLoading={ isLoading }
              >
                { t('tx.l1GasUsedByTxn', { parent: layerLabels.parent }) }
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <Text>{ BigNumber(data.l1_gas_used).toFormat() }</Text>
              </DetailedInfo.ItemValue>
            </>
          ) }

          { data.l1_gas_price && (
            <>
              <DetailedInfo.ItemLabel
                hint={ t('tx.l1GasPrice', { parent: layerLabels.parent }) }
                isLoading={ isLoading }
              >
                { t('tx.l1GasPrice', { parent: layerLabels.parent }) }
              </DetailedInfo.ItemLabel>
              <GasPriceValue
                amount={ data.l1_gas_price }
                asset={ rollupFeature.parentChain.currency?.symbol || currencyUnits.ether }
                loading={ isLoading }
              />
            </>
          ) }

          { data.l1_fee && (
            <>
              <DetailedInfo.ItemLabel
                hint={ t('tx.hintL1Fee', { parent: layerLabels.parent, current: layerLabels.current }) }
                isLoading={ isLoading }
              >
                { t('tx.l1Fee', { parent: layerLabels.parent }) }
              </DetailedInfo.ItemLabel>
              <DetailedInfoNativeCoinValue
                amount={ data.l1_fee }
                asset={ rollupFeature.parentChain.currency?.symbol || currencyUnits.ether }
                decimals={ rollupFeature.parentChain.currency?.decimals ?? config.chain.currency.decimals }
                exchangeRate={ data.exchange_rate }
                historicalExchangeRate={ data.historic_exchange_rate }
                hasExchangeRateToggle
                loading={ isLoading }
              />
            </>
          ) }

          { data.l1_fee_scalar && (
            <>
              <DetailedInfo.ItemLabel
                hint={ t('tx.hintL1FeeScalar', { parent: layerLabels.parent }) }
                isLoading={ isLoading }
              >
                { t('tx.l1FeeScalar', { parent: layerLabels.parent }) }
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <Text>{ data.l1_fee_scalar }</Text>
              </DetailedInfo.ItemValue>
            </>
          ) }
        </>
      ) }
      <TxInfoScrollFees data={ data } isLoading={ isLoading }/>

      <CollapsibleDetails loading={ isLoading } mt={ 6 } gridColumn={{ base: undefined, lg: '1 / 3' }} isExpanded={ isExpanded } onClick={ handleCutLinkClick }>
        <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>

        <TxDetailsSetMaxGasLimit data={ data }/>

        <TxDetailsWithdrawalStatusArbitrum data={ data }/>

        { (data.blob_gas_used || data.max_fee_per_blob_gas || data.blob_gas_price) && (
          <>
            { data.blob_gas_used && data.blob_gas_price && (
              <>
                <DetailedInfo.ItemLabel
                  hint={ t('tx.hintBlobFee') }
                >
                  { t('tx.blobFee') }
                </DetailedInfo.ItemLabel>
                <DetailedInfoNativeCoinValue
                  amount={ BigNumber(data.blob_gas_used).multipliedBy(data.blob_gas_price).toString() }
                  noSymbol={ config.UI.views.tx.hiddenFields?.fee_currency }
                  exchangeRate={ data.exchange_rate }
                  historicalExchangeRate={ data.historic_exchange_rate }
                  hasExchangeRateToggle
                  loading={ isLoading }
                />
              </>
            ) }

            { data.blob_gas_used && (
              <>
                <DetailedInfo.ItemLabel
                  hint={ t('tx.hintBlobGasUsage') }
                >
                  { t('tx.blobGasUsage') }
                </DetailedInfo.ItemLabel>
                <DetailedInfo.ItemValue>
                  { BigNumber(data.blob_gas_used).toFormat() }
                </DetailedInfo.ItemValue>
              </>
            ) }

            { (data.max_fee_per_blob_gas || data.blob_gas_price) && (
              <>
                <DetailedInfo.ItemLabel
                  hint={ t('tx.hintBlobGasFees', { ether: currencyUnits.ether }) }
                >
                  { t('tx.blobGasFees', { gwei: currencyUnits.gwei }) }
                </DetailedInfo.ItemLabel>
                <DetailedInfo.ItemValue>
                  { data.blob_gas_price && (
                    <NativeCoinValue
                      amount={ data.blob_gas_price }
                      units="gwei"
                      unitsTooltip="wei"
                      noSymbol
                      loading={ isLoading }
                      fontWeight="600"
                    />
                  ) }
                  { (data.max_fee_per_blob_gas && data.blob_gas_price) && <TextSeparator/> }
                  { data.max_fee_per_blob_gas && (
                    <NativeCoinValue
                      amount={ data.max_fee_per_blob_gas }
                      units="gwei"
                      unitsTooltip="wei"
                      noSymbol
                      loading={ isLoading }
                      startElement={ t('tx.max') }
                      fontWeight="600"
                    />
                  ) }
                </DetailedInfo.ItemValue>
              </>
            ) }
            <DetailedInfo.ItemDivider/>
          </>
        ) }

        <TxDetailsOther nonce={ data.nonce } type={ data.type } position={ data.position } queueIndex={ data.scroll?.queue_index }/>

        <DetailedInfo.ItemLabel
          hint={ t('tx.hintRawInput') }
          mb={{ base: 1, lg: 0 }}
        >
          { t('tx.rawInput') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <RawInputData hex={ data.raw_input } defaultDataType={ data.zilliqa?.is_scilla ? 'UTF-8' : 'Hex' }/>
        </DetailedInfo.ItemValue>

        { data.decoded_input && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('tx.hintDecodedInputData') }
            >
              { t('tx.decodedInputData') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue flexWrap="wrap" mt={{ base: '5px', lg: '4px' }}>
              <LogDecodedInputData data={ data.decoded_input }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.zksync && <ZkSyncL2TxnBatchHashesInfo data={ data.zksync } isLoading={ isLoading }/> }
      </CollapsibleDetails>
    </DetailedInfo.Container>
  );
};

export default TxInfo;
