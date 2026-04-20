import type { GridProps, HTMLChakraProps } from '@chakra-ui/react';
import { Box, Grid, Flex, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { CustomLinksGroup } from 'types/footerLinks';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import useApiQuery from 'lib/api/useApiQuery';
import useFetch from 'lib/hooks/useFetch';
import { useColorModeValue } from 'toolkit/chakra/color-mode';
import { Image } from 'toolkit/chakra/image';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { CONTENT_MAX_WIDTH } from 'ui/shared/layout/utils';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

import FooterLinkItem from './FooterLinkItem';
import IntTxsIndexingStatus from './IntTxsIndexingStatus';
import getApiVersionUrl from './utils/getApiVersionUrl';

const MAX_LINKS_COLUMNS = 4;

const LOGO_LIGHT = 'https://raw.githubusercontent.com/AlexRocksss/frontend/eni-v2.7.0/public/static/logo.png';
const LOGO_DARK = 'https://raw.githubusercontent.com/AlexRocksss/frontend/eni-v2.7.0/public/static/logo-dark.png';

const Footer = () => {
  const { t } = useTranslation();

  const { data: backendVersionData } = useApiQuery('general:config_backend_version', {
    queryOptions: {
      staleTime: Infinity,
      enabled: !config.features.multichain.isEnabled,
      refetchOnMount: false,
    },
  });
  const apiVersionUrl = getApiVersionUrl(backendVersionData?.backend_version);

  const logoSrc = useColorModeValue(LOGO_LIGHT, LOGO_DARK);

  const fetch = useFetch();

  const { isPlaceholderData, data: linksData } = useQuery<unknown, ResourceError<unknown>, Array<CustomLinksGroup>>({
    queryKey: [ 'footer-links' ],
    queryFn: async() => fetch(config.UI.footer.links || '', undefined, { resource: 'footer-links' }),
    enabled: Boolean(config.UI.footer.links),
    staleTime: Infinity,
    placeholderData: [],
  });

  const footerGroupTitles: Record<string, string> = {
    'ENI Network': t('footer.customGroupENINetwork'),
    'ENI Developers': t('footer.customGroupENIDevelopers'),
    'ENI Community': t('footer.customGroupENICommunity'),
  };

  const footerLinkTexts: Record<string, string> = {
    About: t('footer.customLinkAbout'),
    'Chainlist (ENI Mainnet)': t('footer.customLinkChainlistMainnet'),
    'Chainlist (ENI Testnet)': t('footer.customLinkChainlistTestnet'),
    'Testnet Faucet': t('footer.customLinkTestnetFaucet'),
    Documentation: t('footer.customLinkDocumentation'),
    'Github (eni-chain)': t('footer.customLinkGithubEniChain'),
    X: t('footer.customLinkX'),
    Telegram: t('footer.customLinkTelegram'),
    Discord: t('footer.customLinkDiscord'),
    LinkedIn: t('footer.customLinkLinkedIn'),
  };

  const colNum = isPlaceholderData ? 1 : Math.min(linksData?.length || Infinity, MAX_LINKS_COLUMNS);

  const renderNetworkInfo = React.useCallback((gridArea?: GridProps['gridArea']) => {
    return (
      <Flex
        alignItems="center"
        gridArea={ gridArea }
        flexWrap="wrap"
        justifyContent="flex-start"
        columnGap={ 3 }
        rowGap={ 2 }
        mb={{ base: 5, lg: 10 }}
        _empty={{ display: 'none' }}
      >
        { !config.UI.indexingAlert.intTxs.isHidden && <IntTxsIndexingStatus/> }
        { !config.features.multichain.isEnabled && <NetworkAddToWallet source="Footer"/> }
      </Flex>
    );
  }, []);

  const renderProjectInfo = React.useCallback((gridArea?: GridProps['gridArea']) => {
    return (
      <Box gridArea={ gridArea }>
        <Image src={ logoSrc } alt="ENI" h="18px"/>
        <Text mt={ 3 } fontSize="xs">
          { t('footer.description') }
        </Text>
        <Box mt={ 6 } alignItems="start" textStyle="xs">
          { apiVersionUrl && (
            <Text>
              { t('footer.backend') } <Link href={ apiVersionUrl } external noIcon>{ backendVersionData?.backend_version }</Link>
            </Text>
          ) }
          <Text>{ t('footer.version') }</Text>
        </Box>
      </Box>
    );
  }, [ apiVersionUrl, backendVersionData?.backend_version, logoSrc, t ]);

  const containerProps: HTMLChakraProps<'div'> = {
    as: 'footer',
    borderTopWidth: '1px',
    borderTopColor: 'border.divider',
  };

  const contentProps: GridProps = {
    px: { base: 4, lg: config.UI.navigation.layout === 'horizontal' ? 6 : 12, '2xl': 6 },
    py: { base: 4, lg: 8 },
    gridTemplateColumns: { base: '1fr', lg: 'minmax(auto, 470px) 1fr' },
    columnGap: { lg: '32px', xl: '100px' },
    maxW: `${ CONTENT_MAX_WIDTH }px`,
    m: '0 auto',
  };

  const renderRecaptcha = (gridArea?: GridProps['gridArea']) => {
    if (!config.services.reCaptchaV2.siteKey) {
      return <Box gridArea={ gridArea }/>;
    }

    return (
      <Box gridArea={ gridArea } textStyle="xs" mt={ 6 }>
        <span>{ t('footer.recaptcha_pre') } </span>
        <Link href="https://policies.google.com/privacy" external noIcon>{ t('footer.recaptcha_privacyPolicy') }</Link>
        <span> { t('footer.recaptcha_and') } </span>
        <Link href="https://policies.google.com/terms" external noIcon>{ t('footer.recaptcha_terms') }</Link>
        <span> { t('footer.recaptcha_post') }</span>
      </Box>
    );
  };

  if (config.UI.footer.links) {
    return (
      <Box { ...containerProps }>
        <Grid { ...contentProps }>
          <div>
            { renderNetworkInfo() }
            { renderProjectInfo() }
            { renderRecaptcha() }
          </div>

          <Grid
            gap={{ base: 6, lg: colNum === MAX_LINKS_COLUMNS ? 2 : 8, xl: 12 }}
            gridTemplateColumns={{
              base: 'repeat(auto-fill, 160px)',
              lg: `repeat(${ colNum }, 135px)`,
              xl: `repeat(${ colNum }, 160px)`,
            }}
            justifyContent={{ lg: 'flex-end' }}
            mt={{ base: 8, lg: 0 }}
          >
            {
              (linksData || [])
                .slice(0, colNum)
                .map(linkGroup => (
                  <Box key={ linkGroup.title }>
                    <Skeleton fontWeight={ 500 } mb={ 3 } display="inline-block" loading={ isPlaceholderData }>
                      { footerGroupTitles[linkGroup.title] || linkGroup.title }
                    </Skeleton>
                    <VStack gap={ 1 } alignItems="start">
                      { linkGroup.links.map(link => (
                        <FooterLinkItem
                          { ...link }
                          text={ footerLinkTexts[link.text] || link.text }
                          key={ link.text }
                          isLoading={ isPlaceholderData }
                        />
                      )) }
                    </VStack>
                  </Box>
                ))
            }
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box { ...containerProps }>
      <Grid
        { ...contentProps }
        gridTemplateAreas={{
          lg: `
          "network ."
          "info ."
          "recaptcha ."
        `,
        }}
      >

        { renderNetworkInfo({ lg: 'network' }) }
        { renderProjectInfo({ lg: 'info' }) }
        { renderRecaptcha({ lg: 'recaptcha' }) }

      </Grid>
    </Box>
  );
};

export default React.memo(Footer);
