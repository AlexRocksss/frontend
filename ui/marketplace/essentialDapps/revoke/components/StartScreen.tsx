import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Heading } from 'toolkit/chakra/heading';
import IconSvg from 'ui/shared/IconSvg';
import type { IconName } from 'ui/shared/IconSvg';

export default function StartScreen() {
  const { t } = useTranslation();

  const steps = React.useMemo(() => [
    { text: t('marketplace.revokeStep1'), icon: 'wallet' as IconName },
    { text: t('marketplace.revokeStep2'), icon: 'search' as IconName },
    { text: t('marketplace.revokeStep3'), icon: 'return' as IconName },
  ], [ t ]);

  return (
    <Flex flexDir="column" w="full" gap={{ base: 3, md: 6 }}>
      <Heading level="3">
        { t('marketplace.revokeHowTo') }
      </Heading>
      <Flex flexDir={{ base: 'column', md: 'row' }} gap={{ base: 2, md: 6 }}>
        { steps.map((step, index) => (
          <Flex
            key={ index }
            flexDir={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'center' }}
            p={ 6 }
            borderRadius="md"
            bgColor={{ _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' }}
            flex={ 1 }
            gap={ 6 }
          >
            <IconSvg name={ step.icon } boxSize={ 6 }/>
            <Text textStyle="sm">
              { step.text }
            </Text>
          </Flex>
        )) }
      </Flex>
    </Flex>
  );
}
