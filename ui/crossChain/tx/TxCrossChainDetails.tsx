import { useTranslation } from 'next-i18next';
import React from 'react';

import type { InterchainMessage } from '@blockscout/interchain-indexer-types';

import CrossChainBridgeLink from 'ui/shared/crossChain/CrossChainBridgeLink';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import AddressEntityInterchain from 'ui/shared/entities/address/AddressEntityInterchain';
import RawInputData from 'ui/shared/RawInputData';
import CrossChainTxsStatusTag from 'ui/shared/statusTag/CrossChainTxsStatusTag';

import TxCrossChainDetailsLifecycle from './TxCrossChainDetailsLifecycle';
import TxCrossChainDetailsTransfers from './TxCrossChainDetailsTransfers';

interface Props {
  data: InterchainMessage | undefined;
  isLoading?: boolean;
}

const TxCrossChainDetails = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();

  if (!data) {
    return <DataFetchAlert/>;
  }

  return (
    <DetailedInfo.Container>
      { data.sender && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('crossChain.senderHint') }
            isLoading={ isLoading }
          >
            { t('crossChain.sender') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <AddressEntityInterchain
              address={ data.sender }
              isLoading={ isLoading }
              chain={ data.source_chain }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }
      { data.recipient && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('crossChain.targetHint') }
            isLoading={ isLoading }
          >
            { t('crossChain.targetLabel') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <AddressEntityInterchain
              address={ data.recipient }
              isLoading={ isLoading }
              chain={ data.destination_chain }
            />
          </DetailedInfo.ItemValue>
        </>
      ) }
      <DetailedInfo.ItemLabel
        hint={ t('crossChain.protocolHint') }
        isLoading={ isLoading }
      >
        { t('crossChain.protocol') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <CrossChainBridgeLink data={ data.bridge } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>

      { data.transfers.length > 0 && <TxCrossChainDetailsTransfers data={ data.transfers } id={ data.message_id } isLoading={ isLoading }/> }

      <DetailedInfo.ItemLabel
        hint={ t('crossChain.statusHint') }
        isLoading={ isLoading }
      >
        { t('crossChain.statusLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <CrossChainTxsStatusTag status={ data.status } loading={ isLoading } mode="full"/>
      </DetailedInfo.ItemValue>
      <DetailedInfo.ItemLabel
        hint={ t('crossChain.timestampHint') }
        isLoading={ isLoading }
      >
        { t('crossChain.timestamp') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <DetailedInfoTimestamp timestamp={ data.receive_timestamp || data.send_timestamp } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>
      <DetailedInfo.ItemLabel
        hint={ t('crossChain.lifecycleHint') }
        isLoading={ isLoading }
      >
        { t('crossChain.lifecycleLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue py={ 1 }>
        <TxCrossChainDetailsLifecycle data={ data } isLoading={ isLoading }/>
      </DetailedInfo.ItemValue>
      { data.payload && (
        <>
          <DetailedInfo.ItemLabel
            hint={ t('crossChain.payloadHint') }
            isLoading={ isLoading }
          >
            { t('crossChain.payloadLabel') }
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <RawInputData hex={ data.payload } isLoading={ isLoading }/>
          </DetailedInfo.ItemValue>
        </>
      ) }
    </DetailedInfo.Container>
  );
};

export default React.memo(TxCrossChainDetails);
