import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { EssentialDappsConfig } from 'types/client/marketplace';

import config from 'configs/app';

import EssentialDappCard from './EssentialDappCard';

const feature = config.features.marketplace;
const essentialDappsConfig = feature.isEnabled ? feature.essentialDapps : undefined;

const EssentialDappsList = () => {
  const { t } = useTranslation();

  const essentialDapps = React.useMemo(() => [
    {
      id: 'swap',
      title: t('marketplace.swapTitle'),
      description: t('marketplace.swapDescription'),
      buttonText: t('marketplace.swapButton'),
      imageUrl: '/static/marketplace/swap.png',
      darkImageUrl: '/static/marketplace/swap-dark.png',
    },
    {
      id: 'revoke',
      title: t('marketplace.revokeTitle'),
      description: t('marketplace.revokeDescription'),
      buttonText: t('marketplace.revokeGetStarted'),
      imageUrl: '/static/marketplace/revoke.png',
      darkImageUrl: '/static/marketplace/revoke-dark.png',
    },
    {
      id: 'multisend',
      title: t('marketplace.multisendTitle'),
      description: t('marketplace.multisendDescription'),
      buttonText: t('marketplace.multisendButton'),
      imageUrl: '/static/marketplace/multisend.png',
      darkImageUrl: '/static/marketplace/multisend-dark.png',
    },
  ].filter((dapp) =>
    feature.isEnabled && Boolean(essentialDappsConfig?.[dapp.id as keyof EssentialDappsConfig]),
  ), [ t ]);

  return (
    <Flex
      gap={{ base: 2, md: 3 }}
      mb={ 8 }
      w="full"
      overflowX={{ base: 'auto', md: 'initial' }}
      css={{
        // hide scrollbar
        '&::-webkit-scrollbar': { /* Chromiums */
          display: 'none',
        },
        '-ms-overflow-style': 'none', /* IE and Edge */
        scrollbarWidth: 'none', /* Firefox */
      }}
    >
      { essentialDapps.map((dapp) => (
        <EssentialDappCard
          key={ dapp.id }
          id={ dapp.id }
          title={ dapp.title }
          description={ dapp.description }
          buttonText={ dapp.buttonText }
          imageUrl={ dapp.imageUrl }
          darkImageUrl={ dapp.darkImageUrl }
        />
      )) }
    </Flex>
  );
};

export default EssentialDappsList;
