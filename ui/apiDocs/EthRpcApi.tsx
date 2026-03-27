import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Link } from 'toolkit/chakra/link';

const EthRpcApi = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Text>{ t('apiDocs.ethRpcDescription') }</Text>
      <Link href="https://docs.blockscout.com/devs/apis/rpc/eth-rpc" external mt={ 6 }>{ t('apiDocs.viewExamples') }</Link>
    </Box>
  );
};

export default React.memo(EthRpcApi);
