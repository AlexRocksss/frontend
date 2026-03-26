import { useTranslation } from 'next-i18next';
import React from 'react';

import type { DepositsItem } from 'types/api/deposits';

import config from 'configs/app';
import BeaconChainDepositSignature from 'ui/shared/beacon/BeaconChainDepositSignature';
import BeaconChainDepositStatusTag from 'ui/shared/beacon/BeaconChainDepositStatusTag';
import BeaconChainValidatorLink from 'ui/shared/beacon/BeaconChainValidatorLink';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';
import TimeWithTooltip from 'ui/shared/time/TimeWithTooltip';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';

const feature = config.features.beaconChain;

type Props = {
  item: DepositsItem;
  view: 'list' | 'address' | 'block';
  isLoading?: boolean;
};

const BeaconChainDepositsListItem = ({ item, isLoading, view }: Props) => {
  const { t } = useTranslation();
  if (!feature.isEnabled || feature.withdrawalsOnly) {
    return null;
  }

  return (
    <ListItemMobileGrid.Container gridTemplateColumns="120px auto">

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('deposits.txHashLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TxEntity hash={ item.transaction_hash } isLoading={ isLoading } truncation="constant_long"/>
      </ListItemMobileGrid.Value>

      { view !== 'block' && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('deposits.blockLabel') }</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <BlockEntity
              number={ item.block_number }
              hash={ item.block_hash }
              isLoading={ isLoading }
            />
          </ListItemMobileGrid.Value>

          <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('deposits.ageLabel') }</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <TimeWithTooltip
              timestamp={ item.block_timestamp }
              isLoading={ isLoading }
              display="inline-block"
            />
          </ListItemMobileGrid.Value>
        </>
      ) }

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('deposits.valueLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <NativeCoinValue
          amount={ item.amount }
          loading={ isLoading }
        />
      </ListItemMobileGrid.Value>

      { view !== 'address' && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('deposits.fromLabel') }</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <AddressEntity
              address={ item.from_address }
              isLoading={ isLoading }
              truncation="constant"
            />
          </ListItemMobileGrid.Value>
        </>
      ) }

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('deposits.pubKeyLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <BeaconChainValidatorLink pubkey={ item.pubkey } isLoading={ isLoading }/>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('deposits.signatureLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <BeaconChainDepositSignature signature={ item.signature } isLoading={ Boolean(isLoading) }/>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('deposits.statusLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <BeaconChainDepositStatusTag status={ item.status } isLoading={ Boolean(isLoading) }/>
      </ListItemMobileGrid.Value>

    </ListItemMobileGrid.Container>
  );
};

export default BeaconChainDepositsListItem;
