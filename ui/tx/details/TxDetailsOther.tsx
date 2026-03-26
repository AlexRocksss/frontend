import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Transaction } from 'types/api/transaction';

import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import TextSeparator from 'ui/shared/TextSeparator';

type Props = Pick<Transaction, 'nonce' | 'type' | 'position'> & { queueIndex?: number };

const TxDetailsOther = ({ nonce, type, position, queueIndex }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('tx.hintOther') }
      >
        { t('tx.other') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        {
          [
            typeof type === 'number' && (
              <Box key="type">
                <span>{ t('tx.txnType') }</span>
                <span>{ type }</span>
                { type === 2 && <Text as="span" ml={ 1 } color="text.secondary">(EIP-1559)</Text> }
                { type === 3 && <Text as="span" ml={ 1 } color="text.secondary">(EIP-4844)</Text> }
                { type === 4 && <Text as="span" ml={ 1 } color="text.secondary">(EIP-7702)</Text> }
              </Box>
            ),
            queueIndex !== undefined ? (
              <Box key="queueIndex">
                <span>{ t('tx.queueIndex') }</span>
                <span>{ queueIndex }</span>
              </Box>
            ) : (
              <Box key="nonce">
                <span>{ t('tx.noncePrefixed') }</span>
                <span>{ nonce }</span>
              </Box>
            ),
            position !== null && position !== undefined && (
              <Box key="position">
                <span>{ t('tx.positionPrefixed') }</span>
                <span>{ position }</span>
              </Box>
            ),
          ]
            .filter(Boolean)
            .map((item, index) => (
              <React.Fragment key={ index }>
                { index !== 0 && <TextSeparator/> }
                { item }
              </React.Fragment>
            ))
        }
      </DetailedInfo.ItemValue>
    </>
  );
};

export default TxDetailsOther;
