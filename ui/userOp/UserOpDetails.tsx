import { GridItem } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { UserOp } from 'types/api/userOps';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import { CollapsibleDetails } from 'toolkit/chakra/collapsible';
import { Skeleton } from 'toolkit/chakra/skeleton';
import isCustomAppError from 'ui/shared/AppError/isCustomAppError';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoNativeCoinValue from 'ui/shared/DetailedInfo/DetailedInfoNativeCoinValue';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import AddressStringOrParam from 'ui/shared/entities/address/AddressStringOrParam';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import UserOpEntity from 'ui/shared/entities/userOp/UserOpEntity';
import UserOpSponsorType from 'ui/shared/userOps/UserOpSponsorType';
import UserOpStatus from 'ui/shared/userOps/UserOpStatus';
import Utilization from 'ui/shared/Utilization/Utilization';
import GasPriceValue from 'ui/shared/value/GasPriceValue';

import UserOpCallData from './UserOpCallData';
import UserOpDecodedCallData from './UserOpDecodedCallData';
import UserOpDetailsActions from './UserOpDetailsActions';

interface Props {
  query: UseQueryResult<UserOp, ResourceError>;
}

const UserOpDetails = ({ query }: Props) => {
  const { t } = useTranslation();
  const { data, isPlaceholderData, isError, error } = query;

  if (isError) {
    if (error?.status === 400 || isCustomAppError(error)) {
      throwOnResourceLoadError({ isError, error });
    }

    return <DataFetchAlert/>;
  }

  if (!data) {
    return null;
  }

  return (
    <DetailedInfo.Container
      templateColumns={{ base: 'minmax(0, 1fr)', lg: 'minmax(min-content, 220px) minmax(0, 1fr)' }}
    >
      <DetailedInfo.ItemLabel
        hint={ t('userOp.userOperationHashHint') }
        isLoading={ isPlaceholderData }
      >
        { t('userOp.userOperationHash') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData } overflow="hidden">
          <UserOpEntity hash={ data.hash } noIcon noLink/>
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('userOp.senderHint') }
        isLoading={ isPlaceholderData }
      >
        { t('userOp.sender') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressStringOrParam address={ data.sender } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      { data.execute_target && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('userOp.targetHint') }
            isLoading={ isPlaceholderData }
          >
            { t('userOp.target') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <AddressEntity address={ data.execute_target } isLoading={ isPlaceholderData }/>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemLabel
        hint={ t('userOp.statusHint') }
        isLoading={ isPlaceholderData }
      >
        { t('userOp.status') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <UserOpStatus status={ data.status } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      { data.revert_reason && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('userOp.revertReasonHint') }
            isLoading={ isPlaceholderData }
          >
            { t('userOp.revertReason') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue
            wordBreak="break-all"
            whiteSpace="normal"
          >
            <Skeleton loading={ isPlaceholderData }>
              { data.revert_reason }
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      { data.timestamp && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('userOp.timestampHint') }
            isLoading={ isPlaceholderData }
          >
            { t('userOp.timestamp') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <DetailedInfoTimestamp timestamp={ data.timestamp } isLoading={ isPlaceholderData }/>
          </DetailedInfo.ItemValue>
        </>

      ) }
      { !config.UI.views.tx.hiddenFields?.tx_fee && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('userOp.feeHint') }
            isLoading={ isPlaceholderData }
          >
            { t('userOp.fee') }
          </DetailedInfo.ItemLabel>
          <DetailedInfoNativeCoinValue
            amount={ data.fee }
            loading={ isPlaceholderData }
          />
        </>
      ) }

      <DetailedInfo.ItemLabel
        hint={ t('userOp.gasLimitHint') }
        isLoading={ isPlaceholderData }
      >
        { t('userOp.gasLimit') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { BigNumber(data.gas).toFormat() }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('userOp.gasUsedHint') }
        isLoading={ isPlaceholderData }
      >
        { t('userOp.gasUsed') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ isPlaceholderData }>
          { BigNumber(data.gas_used).toFormat() }
        </Skeleton>
        <Utilization
          ml={ 4 }
          colorScheme="gray"
          value={ BigNumber(data.gas_used).dividedBy(BigNumber(data.gas)).toNumber() }
          isLoading={ isPlaceholderData }
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('userOp.transactionHashHint') }
        isLoading={ isPlaceholderData }
      >
        { t('userOp.transactionHash') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <TxEntity hash={ data.transaction_hash } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('userOp.blockHint') }
        isLoading={ isPlaceholderData }
      >
        { t('userOp.block') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <BlockEntity number={ Number(data.block_number) } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint={ t('userOp.entryPointHint') }
        isLoading={ isPlaceholderData }
      >
        { t('userOp.entryPoint') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <AddressStringOrParam address={ data.entry_point } isLoading={ isPlaceholderData }/>
      </DetailedInfo.ItemValue>

      { config.features.txInterpretation.isEnabled && <UserOpDetailsActions hash={ data.hash } isUserOpDataLoading={ isPlaceholderData }/> }

      { /* ADDITIONAL INFO */ }
      <CollapsibleDetails loading={ isPlaceholderData } mt={ 6 } gridColumn={{ base: undefined, lg: '1 / 3' }}>
        <GridItem colSpan={{ base: undefined, lg: 2 }} mt={{ base: 1, lg: 4 }}/>

        <DetailedInfo.ItemLabel
          hint={ t('userOp.callGasLimitHint') }
        >
          { t('userOp.callGasLimit') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { BigNumber(data.call_gas_limit).toFormat() }
        </DetailedInfo.ItemValue>

        <DetailedInfo.ItemLabel
          hint={ t('userOp.verificationGasLimitHint') }
        >
          { t('userOp.verificationGasLimit') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { BigNumber(data.verification_gas_limit).toFormat() }
        </DetailedInfo.ItemValue>

        <DetailedInfo.ItemLabel
          hint={ t('userOp.preVerificationGasHint') }
        >
          { t('userOp.preVerificationGas') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          { BigNumber(data.pre_verification_gas).toFormat() }
        </DetailedInfo.ItemValue>

        { !config.UI.views.tx.hiddenFields?.gas_fees && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('userOp.maxFeePerGasHint') }
            >
              { t('userOp.maxFeePerGas') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue multiRow>
              <GasPriceValue amount={ data.max_fee_per_gas }/>
            </DetailedInfo.ItemValue>

            <DetailedInfo.ItemLabel
              hint={ t('userOp.maxPriorityFeePerGasHint') }
            >
              { t('userOp.maxPriorityFeePerGas') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue multiRow>
              <GasPriceValue amount={ data.max_priority_fee_per_gas }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        <DetailedInfo.ItemDivider/>

        { data.aggregator && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('userOp.aggregatorHint') }
            >
              { t('userOp.aggregator') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <AddressStringOrParam address={ data.aggregator }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.aggregator_signature && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('userOp.aggregatorSignatureHint') }
            >
              { t('userOp.aggregatorSignature') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              { data.aggregator_signature }
            </DetailedInfo.ItemValue>
          </>
        ) }

        <DetailedInfo.ItemLabel
          hint={ t('userOp.bundlerHint') }
        >
          { t('userOp.bundler') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <AddressStringOrParam address={ data.bundler }/>
        </DetailedInfo.ItemValue>

        { data.factory && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('userOp.factoryHint') }
            >
              { t('userOp.factory') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <AddressStringOrParam address={ data.factory }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { data.paymaster && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('userOp.paymasterHint') }
            >
              { t('userOp.paymaster') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <AddressStringOrParam address={ data.paymaster }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        <DetailedInfo.ItemLabel
          hint={ t('userOp.sponsorTypeHint') }
        >
          { t('userOp.sponsorType') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue>
          <UserOpSponsorType sponsorType={ data.sponsor_type }/>
        </DetailedInfo.ItemValue>

        <DetailedInfo.ItemDivider/>

        <DetailedInfo.ItemLabel
          hint={ t('userOp.signatureHint') }
        >
          { t('userOp.signature') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue
          wordBreak="break-all"
          whiteSpace="normal"
        >
          { data.signature }
        </DetailedInfo.ItemValue>

        <DetailedInfo.ItemLabel
          hint={ t('userOp.nonceHint') }
        >
          { t('userOp.nonce') }
        </DetailedInfo.ItemLabel>
        <DetailedInfo.ItemValue
          wordBreak="break-all"
          whiteSpace="normal"
        >
          { data.nonce }
        </DetailedInfo.ItemValue>

        <UserOpCallData data={ data }/>

        <UserOpDecodedCallData data={ data }/>
      </CollapsibleDetails>
    </DetailedInfo.Container>
  );
};

export default UserOpDetails;
