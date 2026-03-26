import { Text, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import IconSvg from 'ui/shared/IconSvg';

const UserWalletAutoConnectAlert = () => {
  const { t } = useTranslation();
  return (
    <Flex
      borderRadius="base"
      p={ 3 }
      mb={ 3 }
      alignItems="center"
      bgColor={{ _light: 'orange.100', _dark: 'orange.900' }}
    >
      <IconSvg
        name="integration/partial"
        color="text.primary"
        boxSize={ 5 }
        flexShrink={ 0 }
        mr={ 2 }
      />
      <Text fontSize="xs" lineHeight="16px">
        { t('userProfile.autoConnectAlert') }
      </Text>
    </Flex>
  );
};

export default React.memo(UserWalletAutoConnectAlert);
