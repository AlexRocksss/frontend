import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Link } from 'toolkit/chakra/link';

const RpcApi = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Text>{ t('apiDocs.rpcDescription') }</Text>
      <Link href="https://docs.blockscout.com/devs/apis/rpc" external mt={ 6 }>{ t('apiDocs.viewModules') }</Link>
    </Box>
  );
};

export default React.memo(RpcApi);
