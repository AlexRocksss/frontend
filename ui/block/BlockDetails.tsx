import { GridItem, Text, Box } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { capitalize } from 'es-toolkit';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import { ZKSYNC_L2_TX_BATCH_STATUSES } from 'types/api/zkSyncL2';

import { route, routeParams } from 'nextjs/routes';

import config from 'configs/app';
import getBlockReward from 'lib/block/getBlockReward';
import { useMultichainContext } from 'lib/contexts/multichain';
import getNetworkValidatorTitle from 'lib/networks/getNetworkValidatorTitle';
import * as arbitrum from 'lib/rollups/arbitrum';
import { formatZkSyncL2TxnBatchStatus, layerLabels } from 'lib/rollups/utils';
import getQueryParamString from 'lib/router/getQueryParamString';
import { CollapsibleDetails } from 'toolkit/chakra/collapsible';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Tooltip } from 'toolkit/chakra/tooltip';
import { ZERO } from 'toolkit/utils/consts';
import { space } from 'toolkit/utils/htmlEntities';
import OptimisticL2TxnBatchDA from 'ui/shared/batch/OptimisticL2TxnBatchDA';
import BlockGasUsed from 'ui/shared/block/BlockGasUsed';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import BatchEntityL2 from 'ui/shared/entities/block/BatchEntityL2';
import BlockEntityL1 from 'ui/shared/entities/block/BlockEntityL1';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import IconSvg from 'ui/shared/IconSvg';
import PrevNext from 'ui/shared/PrevNext';
import RawDataSnippet from 'ui/shared/RawDataSnippet';
import StatusTag from 'ui/shared/statusTag/StatusTag';
import Utilization from 'ui/shared/Utilization/Utilization';
import GasPriceValue from 'ui/shared/value/GasPriceValue';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';
import { WEI } from 'ui/shared/value/utils';
import VerificationSteps from 'ui/shared/verificationSteps/VerificationSteps';
import ZkSyncL2TxnBatchHashesInfo from 'ui/txnBatches/zkSyncL2/ZkSyncL2TxnBatchHashesInfo';

import BlockDetailsBaseFeeCelo from './details/BlockDetailsBaseFeeCelo';
import BlockDetailsBlobInfo from './details/BlockDetailsBlobInfo';
import BlockDetailsZilliqaQuorumCertificate from './details/BlockDetailsZilliqaQuorumCertificate';
import type { BlockQuery } from './useBlockQuery';

const zkSyncVerificationSteps = ZKSYNC_L2_TX_BATCH_STATUSES.map(formatZkSyncL2TxnBatchStatus);

interface Props {
  query: BlockQuery;
}

const rollupFeature = config.features.rollup;

const BlockDetails = ({ query }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const heightOrHash = getQueryParamString(router.query.height_or_hash);
  const multichainContext = useMultichainContext();

  const { data, isPlaceholderData } = query;

  const handlePrevNextClick = React.useCallback((direction: 'prev' | 'next') => {
    if (!data) {
      return;
    }

    const increment = direction === 'next' ? +1 : -1;
    const nextId = String(data.height + increment);

    router.push(routeParams({ pathname: '/block/[height_or_hash]', query: { height_or_hash: nextId } }, { chain: multichainContext?.chain }));
  }, [ data, multichainContext, router ]);

  if (!data) {
    return null;
  }

  const { totalReward, staticReward, burntFees, txFees } = getBlockReward(data);

  const validatorTitle = getNetworkValidatorTitle();

  const rewardBreakDown = (() => {
    if (rollupFeature.isEnabled || totalReward.isEqualTo(ZERO) || txFees.isEqualTo(ZERO) || burntFees.isEqualTo(ZERO)) {
      return null;
    }

    if (isPlaceholderData) {
      return <Skeleton loading w="525px" h="20px"/>;
    }

    return (
      <Text color="text.secondary" whiteSpace="break-spaces">
        <Tooltip content={ t('blockDetails.hintStaticBlockReward') }>
          <span>{ staticReward.dividedBy(WEI).toFixed() }</span>
        </Tooltip>
        { !txFees.isEqualTo(ZERO) && (
          <>
            { space }+{ space }
            <Tooltip content={ t('blockDetails.hintTxnFees') }>
              <span>{ txFees.dividedBy(WEI).toFixed() }</span>
            </Tooltip>
          </>
        ) }
        { !burntFees.isEqualTo(ZERO) && (
          <>
            { space }-{ space }
            <Tooltip content={ t('blockDetails.hintBurntFeesDecompose') }>
              <span>{ burntFees.dividedBy(WEI).toFixed() }</span>
            </Tooltip>
          </>
        ) }
      </Text>
    );
  })();

  const txsNum = (() => {
    const blockTxsNum = (
      <Link href={ route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: heightOrHash, tab: 'txs' } }, multichainContext) }>
        { t('blockDetails.txn', { count: data.transactions_count }) }
      </Link>
    );

    const blockBlobTxsNum = (config.features.dataAvailability.isEnabled && data.blob_transactions_count) ? (
      <>
        <span>{ t('blockDetails.including') }</span>
        <Link href={ route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: heightOrHash, tab: 'blob_txs' } }, multichainContext) }>
          { t('blockDetails.blobTxn', { count: data.blob_transactions_count }) }
        </Link>
      </>
    ) : null;

    return (
      <>
        { blockTxsNum }
        { blockBlobTxsNum }
        <span>{ t('blockDetails.inThisBlock') }</span>
      </>
    );
  })();

  const blockTypeLabel = (() => {
    switch (data.type) {
      case 'reorg':
        return t('blockDetails.blockType_reorg');
      case 'uncle':
        return t('blockDetails.blockType_uncle');
      default:
        return t('blockDetails.blockType_block');
    }
  })();

  return (
    <DetailedInfo.Container templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(min-content, 200px) minmax(0, 1fr)' }} >
      <DetailedInfo.ItemLabel
        hint={ t('blockDetails.hintHeight') }
        isLoading={ isPlaceholderData }
      >
        { t('blockDetails.height', { blockType: blockTypeLabel }) }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { data.height }
        </Skeleton>
        { data.height === 0 && <Text whiteSpace="pre"> - { t('blockDetails.genesisBlock') }</Text> }
        <PrevNext
          ml={ 6 }
          onClick={ handlePrevNextClick }
          prevLabel={ t('blockDetails.viewPreviousBlock') }
          nextLabel={ t('blockDetails.viewNextBlock') }
          isPrevDisabled={ data.height === 0 }
          isLoading={ isPlaceholderData }
        />
      </DetailedInfo.ItemValue>

      { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && data.arbitrum && (
        <>
          <DetailedInfo.ItemLabel
            hint={ `The most recent ${ layerLabels.parent } block height as of this ${ layerLabels.current } block` }
            isLoading={ isPlaceholderData }
          >
            { layerLabels.parent } block height
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <BlockEntityL1 isLoading={ isPlaceholderData } number={ data.arbitrum.l1_block_number }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && data.arbitrum && !config.UI.views.block.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintBatch') }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.batch') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { data.arbitrum.batch_number ?
              <BatchEntityL2 isLoading={ isPlaceholderData } number={ data.arbitrum.batch_number }/> :
              <Skeleton loading={ isPlaceholderData }>{ t('blockDetails.pending') }</Skeleton> }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { rollupFeature.isEnabled && rollupFeature.type === 'optimistic' && data.optimism && !config.UI.views.block.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintBatch') }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.batch') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue columnGap={ 3 }>
            { data.optimism.number ?
              <BatchEntityL2 isLoading={ isPlaceholderData } number={ data.optimism.number }/> :
              <Skeleton loading={ isPlaceholderData }>{ t('blockDetails.pending') }</Skeleton> }
            { data.optimism.batch_data_container && (
              <OptimisticL2TxnBatchDA
                container={ data.optimism.batch_data_container }
                isLoading={ isPlaceholderData }
              />
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { typeof data.size === 'number' && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintSize') }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.size') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData }>
              { data.size.toLocaleString() }
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemLabel
        hint={ t('blockDetails.hintTimestamp') }
        isLoading={ isPlaceholderData }
      >
        { t('blockDetails.timestamp') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <DetailedInfoTimestamp timestamp={ data.timestamp } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('blockDetails.hintTransactions') }
        isLoading={ isPlaceholderData }
      >
        { t('blockDetails.transactions') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { txsNum }
        </Skeleton>
      </DetailedInfo.ItemValue>

      { config.features.beaconChain.isEnabled && Boolean(data.withdrawals_count) && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintWithdrawals') }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.withdrawals') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData }>
              <Link href={ route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: heightOrHash, tab: 'withdrawals' } }, multichainContext) }>
                { t('blockDetails.withdrawal', { count: data.withdrawals_count }) }
              </Link>
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { rollupFeature.isEnabled && rollupFeature.type === 'zkSync' && data.zksync && !config.UI.views.block.hiddenFields?.batch && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintBatch') }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.batch') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { data.zksync.batch_number ?
              <BatchEntityL2 isLoading={ isPlaceholderData } number={ data.zksync.batch_number }/> :
              <Skeleton loading={ isPlaceholderData }>{ t('blockDetails.pending') }</Skeleton> }
          </DetailedInfo.ItemValue>
        </>
      ) }
      { !config.UI.views.block.hiddenFields?.L1_status && rollupFeature.isEnabled &&
        ((rollupFeature.type === 'zkSync' && data.zksync) || (rollupFeature.type === 'arbitrum' && data.arbitrum)) &&
      (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintStatus') }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.status') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            { rollupFeature.type === 'zkSync' && data.zksync && (
              <VerificationSteps
                steps={ zkSyncVerificationSteps }
                currentStep={ formatZkSyncL2TxnBatchStatus(data.zksync.status) }
                isLoading={ isPlaceholderData }
              />
            ) }
            { rollupFeature.type === 'arbitrum' && data.arbitrum && (
              <VerificationSteps
                steps={ arbitrum.verificationSteps }
                currentStep={ arbitrum.VERIFICATION_STEPS_MAP[data.arbitrum.status] }
                currentStepPending={ arbitrum.getVerificationStepStatus(data.arbitrum) === 'pending' }
                isLoading={ isPlaceholderData }
              />
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { !config.UI.views.block.hiddenFields?.miner && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintMiner') }
            isLoading={ isPlaceholderData }
          >
            { capitalize(validatorTitle) }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <AddressEntity
              address={ data.miner }
              isLoading={ isPlaceholderData }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' &&
        (data.arbitrum?.commitment_transaction.hash || data.arbitrum?.confirmation_transaction.hash) &&
      (
        <>
          <DetailedInfo.ItemDivider/>
          { data.arbitrum?.commitment_transaction.hash && (
            <>
              <DetailedInfo.ItemLabel
                hint={ `${ layerLabels.parent } transaction containing this batch commitment` }
                isLoading={ isPlaceholderData }
              >
                { t('blockDetails.commitmentTx') }
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <TxEntityL1 hash={ data.arbitrum?.commitment_transaction.hash } isLoading={ isPlaceholderData }/>
                { data.arbitrum?.commitment_transaction.status === 'finalized' && <StatusTag type="ok" text={ t('blockDetails.finalized') } ml={ 2 }/> }
              </DetailedInfo.ItemValue>
            </>
          ) }
          { data.arbitrum?.confirmation_transaction.hash && (
            <>
              <DetailedInfo.ItemLabel
                hint={ `${ layerLabels.parent } transaction containing confirmation of this batch` }
                isLoading={ isPlaceholderData }
              >
                { t('blockDetails.confirmationTx') }
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue>
                <TxEntityL1 hash={ data.arbitrum?.confirmation_transaction.hash } isLoading={ isPlaceholderData }/>
                { data.arbitrum?.commitment_transaction.status === 'finalized' && <StatusTag type="ok" text={ t('blockDetails.finalized') } ml={ 2 }/> }
              </DetailedInfo.ItemValue>
            </>
          ) }
        </>
      ) }

      { !rollupFeature.isEnabled && !totalReward.isEqualTo(ZERO) && !config.UI.views.block.hiddenFields?.total_reward && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintBlockReward', { validatorTitle: capitalize(validatorTitle), symbol: config.chain.currency.symbol || 'native token' }) }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.blockReward') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue columnGap={ 1 } multiRow>
            <NativeCoinValue amount={ totalReward.toString() } accuracy={ 0 } loading={ isPlaceholderData }/>
            { rewardBreakDown }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.rewards
        ?.filter(({ type }) => type !== 'Validator Reward' && type !== 'Miner Reward')
        .map(({ type, reward }) => (
          <React.Fragment key={ type }>
            <DetailedInfo.ItemLabel
              hint={ `Amount of distributed reward. ${ capitalize(validatorTitle) }s receive a static block reward + Tx fees + uncle fees` }
            >
              { type }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <NativeCoinValue amount={ reward.toString() } accuracy={ 0 }/>
            </DetailedInfo.ItemValue>
          </React.Fragment>
        ))
      }

      { typeof data.zilliqa?.view === 'number' && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintZilliqaView') }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.view') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ isPlaceholderData }>
              { data.zilliqa.view }
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemDivider/>

      { data.celo?.base_fee && <BlockDetailsBaseFeeCelo data={ data.celo.base_fee }/> }

      <DetailedInfo.ItemLabel
        hint={ t('blockDetails.hintGasUsed') }
        isLoading={ isPlaceholderData }
      >
        { t('blockDetails.gasUsed') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { BigNumber(data.gas_used || 0).toFormat() }
        </Skeleton>
        <BlockGasUsed
          gasUsed={ data.gas_used || undefined }
          gasLimit={ data.gas_limit }
          isLoading={ isPlaceholderData }
          ml={ 4 }
          gasTarget={ data.gas_target_percentage || undefined }
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('blockDetails.hintGasLimit') }
        isLoading={ isPlaceholderData }
      >
        { t('blockDetails.gasLimit') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { BigNumber(data.gas_limit).toFormat() }
        </Skeleton>
      </DetailedInfo.ItemValue>

      { data.minimum_gas_price && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintMinimumGasPrice') }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.minimumGasPrice') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <NativeCoinValue amount={ data.minimum_gas_price } units="gwei" loading={ isPlaceholderData }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.base_fee_per_gas && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintBaseFeePerGas') }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.baseFeePerGas') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue multiRow>
            <GasPriceValue
              amount={ data.base_fee_per_gas }
              loading={ isPlaceholderData }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }

      { !config.UI.views.block.hiddenFields?.burnt_fees && !burntFees.isEqualTo(ZERO) && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintBurntFees', { symbol: config.chain.currency.symbol || 'native token' }) }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.burntFees') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue multiRow>
            <NativeCoinValue
              amount={ burntFees.toString() }
              accuracy={ 0 }
              loading={ isPlaceholderData }
              startElement={ <IconSvg name="flame" boxSize={ 5 } mr={{ base: 1, lg: 2 }} color="icon.primary" isLoading={ isPlaceholderData }/> }
              mr={ 4 }
            />
            { !txFees.isEqualTo(ZERO) && (
              <Tooltip content={ t('blockDetails.hintBurntFeesTip') }>
                <Utilization
                  value={ burntFees.dividedBy(txFees).toNumber() }
                  isLoading={ isPlaceholderData }
                />
              </Tooltip>
            ) }
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.priority_fee !== null && BigNumber(data.priority_fee).gt(ZERO) && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('blockDetails.hintPriorityFee') }
            isLoading={ isPlaceholderData }
          >
            { t('blockDetails.priorityFee') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <NativeCoinValue amount={ data.priority_fee.toString() } accuracy={ 0 } loading={ isPlaceholderData }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { /* ADDITIONAL INFO */ }
      <CollapsibleDetails loading={ isPlaceholderData } mt={ 6 } gridColumn={{ base: undefined, lg: '1 / 3' }}>
        <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>

        { rollupFeature.isEnabled && rollupFeature.type === 'zkSync' && data.zksync &&
              <ZkSyncL2TxnBatchHashesInfo data={ data.zksync } isLoading={ isPlaceholderData }/> }

        { !isPlaceholderData && <BlockDetailsBlobInfo data={ data }/> }

        { data.bitcoin_merged_mining_header && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintBitcoinMergedMiningHeader') }
            >
              { t('blockDetails.bitcoinMergedMiningHeader') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              flexWrap="nowrap"
              alignSelf="flex-start"
            >
              <Box whiteSpace="nowrap" overflow="hidden">
                <HashStringShortenDynamic hash={ data.bitcoin_merged_mining_header }/>
              </Box>
              <CopyToClipboard text={ data.bitcoin_merged_mining_header }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.bitcoin_merged_mining_coinbase_transaction && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintBitcoinMergedMiningCoinbaseTx') }
            >
              { t('blockDetails.bitcoinMergedMiningCoinbaseTx') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <RawDataSnippet
                data={ data.bitcoin_merged_mining_coinbase_transaction }
                isLoading={ isPlaceholderData }
                showCopy={ false }
                textareaMaxHeight="100px"
              />
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.bitcoin_merged_mining_merkle_proof && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintBitcoinMergedMiningMerkleProof') }
            >
              { t('blockDetails.bitcoinMergedMiningMerkleProof') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <RawDataSnippet
                data={ data.bitcoin_merged_mining_merkle_proof }
                isLoading={ isPlaceholderData }
                showCopy={ false }
                textareaMaxHeight="100px"
              />
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.hash_for_merged_mining && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintHashForMergedMining') }
            >
              { t('blockDetails.hashForMergedMining') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              flexWrap="nowrap"
              alignSelf="flex-start"
            >
              <Box whiteSpace="nowrap" overflow="hidden">
                <HashStringShortenDynamic hash={ data.hash_for_merged_mining }/>
              </Box>
              <CopyToClipboard text={ data.hash_for_merged_mining }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.difficulty && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintDifficulty', { validatorTitle: capitalize(validatorTitle) }) }
            >
              { t('blockDetails.difficulty') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <Box overflow="hidden">
                <HashStringShortenDynamic hash={ BigNumber(data.difficulty).toFormat() }/>
              </Box>
            </DetailedInfo.ItemValue>
          </>
        ) }
        { data.total_difficulty && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintTotalDifficulty') }
            >
              { t('blockDetails.totalDifficulty') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <Box overflow="hidden">
                <HashStringShortenDynamic hash={ BigNumber(data.total_difficulty).toFormat() }/>
              </Box>
            </DetailedInfo.ItemValue>
          </>
        ) }

        <DetailedInfo.ItemDivider/>

        <DetailedInfo.ItemLabel
          hint={ t('blockDetails.hintHash') }
        >
          { t('blockDetails.hash') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue flexWrap="nowrap">
          <Box overflow="hidden" >
            <HashStringShortenDynamic hash={ data.hash }/>
          </Box>
          <CopyToClipboard text={ data.hash }/>
        </DetailedInfo.ItemValue>

        { data.height > 0 && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintParentHash') }
            >
              { t('blockDetails.parentHash') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue flexWrap="nowrap">
              <Link
                href={ route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: String(data.height - 1) } }, multichainContext) }
                overflow="hidden"
                whiteSpace="nowrap"
              >
                <HashStringShortenDynamic
                  hash={ data.parent_hash }
                />
              </Link>
              <CopyToClipboard text={ data.parent_hash }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { rollupFeature.isEnabled && rollupFeature.type === 'arbitrum' && data.arbitrum && data.arbitrum.send_count && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintSendCount', { current: layerLabels.current, parent: layerLabels.parent }) }
              isLoading={ isPlaceholderData }
            >
              { t('blockDetails.sendCount') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { data.arbitrum.send_count.toLocaleString() }
            </DetailedInfo.ItemValue>

            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintSendRoot', { current: layerLabels.current, parent: layerLabels.parent }) }
              isLoading={ isPlaceholderData }
            >
              { t('blockDetails.sendRoot') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { data.arbitrum.send_root }
            </DetailedInfo.ItemValue>

            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintDelayedMessages', { parent: layerLabels.parent, current: layerLabels.current }) }
              isLoading={ isPlaceholderData }
            >
              { t('blockDetails.delayedMessages') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { data.arbitrum.delayed_messages.toLocaleString() }
            </DetailedInfo.ItemValue>
          </>
        ) }

        { !config.UI.views.block.hiddenFields?.nonce && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('blockDetails.hintNonce') }
            >
              { t('blockDetails.nonce') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { data.nonce }
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.zilliqa && (
          <>
            <DetailedInfo.ItemDivider/>
            <BlockDetailsZilliqaQuorumCertificate data={ data.zilliqa?.quorum_certificate }/>
            { data.zilliqa?.aggregate_quorum_certificate && (
              <>
                <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 2 }}/>
                <BlockDetailsZilliqaQuorumCertificate data={ data.zilliqa?.aggregate_quorum_certificate }/>
              </>
            ) }
          </>
        ) }
      </CollapsibleDetails>

    </DetailedInfo.Container>
  );
};

export default BlockDetails;
