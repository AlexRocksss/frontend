import { Grid, Text, Flex, Box, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ArbitrumL2TxnBatchDAAnytrust } from 'types/api/arbitrumL2';

import dayjs from 'lib/date/dayjs';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailsTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import HashStringShorten from 'ui/shared/HashStringShorten';
import IconSvg from 'ui/shared/IconSvg';
import TextSeparator from 'ui/shared/TextSeparator';

type Props = {
  data: ArbitrumL2TxnBatchDAAnytrust;
};

const ArbitrumL2TxnBatchDetailsAnyTrustDA = ({ data }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('txnBatches.signatureHint') }
      >
        { t('txnBatches.signatureLabel') }
      </DetailedInfo.ItemLabel><DetailedInfo.ItemValue wordBreak="break-all" whiteSpace="break-spaces">
        { data.bls_signature }
      </DetailedInfo.ItemValue><DetailedInfo.ItemLabel
        hint={ t('txnBatches.dataHashHint') }
      >
        { t('txnBatches.dataHashLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue whiteSpace="pre-wrap" wordBreak="break-all" alignItems={{ base: 'flex-start', lg: 'center' }}>
        { data.data_hash }
        <CopyToClipboard text={ data.data_hash } ml={ 2 }/>
      </DetailedInfo.ItemValue>
      <DetailedInfo.ItemLabel
        hint={ t('txnBatches.timeoutHint') }
      >
        { t('txnBatches.timeoutLabel') }
      </DetailedInfo.ItemLabel><DetailedInfo.ItemValue multiRow>
        { dayjs(data.timeout) < dayjs() ?
          <DetailsTimestamp timestamp={ data.timeout }/> :
          (
            <>
              <DetailsTimestamp timestamp={ data.timeout } noRelativeTime/>
              <TextSeparator/>
              <Text color="red.500">{ t('txnBatches.daysLeft', { count: dayjs(data.timeout).diff(dayjs(), 'day') }) }</Text>
            </>
          ) }
      </DetailedInfo.ItemValue>
      <DetailedInfo.ItemLabel
        hint={ t('txnBatches.signersHint') }
      >
        { t('txnBatches.signersLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue overflowX="scroll" fontSize="sm">
        <Grid
          hideBelow="lg"
          templateColumns="1fr auto auto"
          gap={ 5 }
          backgroundColor={{ _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' }}
          padding={ 4 }
          borderRadius="md"
          minW="600px"
        >
          <Text fontWeight={ 600 }>{ t('txnBatches.keyColumn') }</Text>
          <Text fontWeight={ 600 }>{ t('txnBatches.trustedColumn') }</Text>
          <Text fontWeight={ 600 }>{ t('txnBatches.proofColumn') }</Text>
          { data.signers.map(signer => (
            <>
              <Flex justifyContent="space-between">
                <Text wordBreak="break-all" whiteSpace="break-spaces">{ signer.key }</Text>
                <CopyToClipboard text={ signer.key } ml={ 2 }/>
              </Flex>
              <Box justifySelf="center">
                { signer.trusted ? <IconSvg name="check" boxSize={ 6 }/> : <IconSvg name="cross" boxSize={ 6 }/> }
              </Box>
              { signer.proof ? (
                <Flex>
                  <HashStringShorten hash={ signer.proof }/>
                  <CopyToClipboard text={ signer.proof } ml={ 2 }/>
                </Flex>
              ) : '-' }
            </>
          )) }
        </Grid>

        <Box hideFrom="lg" backgroundColor={{ _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' }} borderRadius="md">
          { data.signers.map(signer => (
            <VStack padding={ 4 } key={ signer.key } gap={ 2 }>
              <Flex w="100%" justifyContent="space-between">
                <Text fontWeight={ 600 }>{ t('txnBatches.keyColumn') }</Text>
                <CopyToClipboard text={ signer.key }/>
              </Flex>
              <Text wordBreak="break-all" whiteSpace="break-spaces">{ signer.key }</Text>
              <Flex w="100%" alignItems="center">
                <Flex alignItems="center" w="50%">
                  <Text fontWeight={ 600 } mr={ 2 }>{ t('txnBatches.trustedColumn') }</Text>
                  { signer.trusted ? <IconSvg name="check" boxSize={ 6 }/> : <IconSvg name="cross" boxSize={ 6 }/> }
                </Flex>
                <Flex alignItems="center" w="50%">
                  <Text fontWeight={ 600 } mr={ 2 }>{ t('txnBatches.proofColumn') }</Text>
                  { signer.proof ? (
                    <Flex>
                      <HashStringShorten hash={ signer.proof }/>
                      <CopyToClipboard text={ signer.proof } ml={ 2 }/>
                    </Flex>
                  ) : '-' }
                </Flex>
              </Flex>
            </VStack>
          )) }
        </Box>
      </DetailedInfo.ItemValue>
    </>
  );
};

export default ArbitrumL2TxnBatchDetailsAnyTrustDA;
