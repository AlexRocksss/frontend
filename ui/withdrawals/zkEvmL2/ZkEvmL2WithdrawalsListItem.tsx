import { chakra } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ZkEvmL2WithdrawalsItem } from 'types/api/zkEvmL2';

import config from 'configs/app';
import { layerLabels } from 'lib/rollups/utils';
import { Skeleton } from 'toolkit/chakra/skeleton';
import BlockEntity from 'ui/shared/entities/block/BlockEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TxEntityL1 from 'ui/shared/entities/tx/TxEntityL1';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';
import TimeWithTooltip from 'ui/shared/time/TimeWithTooltip';
import SimpleValue from 'ui/shared/value/SimpleValue';

const rollupFeature = config.features.rollup;

type Props = { item: ZkEvmL2WithdrawalsItem; isLoading?: boolean };

const ZkEvmL2WithdrawalsListItem = ({ item, isLoading }: Props) => {
  const { t } = useTranslation();
  if (!rollupFeature.isEnabled || rollupFeature.type !== 'zkEvm') {
    return null;
  }

  return (
    <ListItemMobileGrid.Container>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('withdrawals.blockLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <BlockEntity
          number={ item.block_number }
          isLoading={ isLoading }
          textStyle="sm"
          fontWeight={ 600 }
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('withdrawals.indexLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton loading={ isLoading } display="inline-block">
          { item.index }
        </Skeleton>
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('withdrawals.currentTxnHash', { current: layerLabels.current }) }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TxEntity
          isLoading={ isLoading }
          hash={ item.l2_transaction_hash }
          textStyle="sm"
          truncation="constant_long"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('withdrawals.ageLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <TimeWithTooltip
          timestamp={ item.timestamp }
          isLoading={ isLoading }
          display="inline-block"
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('withdrawals.parentTxnHash', { parent: layerLabels.parent }) }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        { item.l1_transaction_hash ? (
          <TxEntityL1
            isLoading={ isLoading }
            hash={ item.l1_transaction_hash }
            textStyle="sm"
            truncation="constant_long"
            noCopy
          />
        ) : (
          <chakra.span>
            { t('withdrawals.pendingClaim') }
          </chakra.span>
        ) }
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('withdrawals.valueLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <SimpleValue
          value={ BigNumber(item.value) }
          loading={ isLoading }
        />
      </ListItemMobileGrid.Value>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ t('withdrawals.tokenLabel') }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <Skeleton loading={ isLoading } display="inline-block">
          { item.symbol }
        </Skeleton>
      </ListItemMobileGrid.Value>

    </ListItemMobileGrid.Container>
  );
};

export default ZkEvmL2WithdrawalsListItem;
