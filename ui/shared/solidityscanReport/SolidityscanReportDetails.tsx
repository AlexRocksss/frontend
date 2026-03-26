import { Box, Flex, Text, Grid, chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { SolidityScanReportSeverityDistribution } from 'lib/solidityScan/schema';

type DistributionItem = {
  id: keyof SolidityScanReportSeverityDistribution;
  name: string;
  color: string;
};

const DISTRIBUTION_COLORS: Record<string, string> = {
  critical: '#891F11',
  high: '#EC672C',
  medium: '#FBE74D',
  low: '#68C88E',
  informational: '#A3AEBE',
  gas: '#A47585',
};

interface Props {
  vulnerabilities: SolidityScanReportSeverityDistribution;
  vulnerabilitiesCount: number;
}

type ItemProps = {
  item: DistributionItem;
  vulnerabilities: SolidityScanReportSeverityDistribution;
  vulnerabilitiesCount: number;
};

const SolidityScanReportItem = ({ item, vulnerabilities, vulnerabilitiesCount }: ItemProps) => {
  const vulnerability = vulnerabilities[item.id];

  if (vulnerability === undefined) {
    return null;
  }

  return (
    <>
      <Box w={ 3 } h={ 3 } bg={ item.color } borderRadius="6px" mr={ 2 }></Box>
      <Flex justifyContent="space-between" mr={ 3 }>
        <Text>{ item.name }</Text>
        <Text color={ vulnerability > 0 ? 'text.primary' : 'text.secondary' }>{ vulnerabilities[item.id] }</Text>
      </Flex>
      <Box bg={{ _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' }} h="10px" borderRadius="8px">
        <Box bg={ item.color } w={ `${ vulnerability / vulnerabilitiesCount * 100 }%` } h="10px" borderRadius="8px"/>
      </Box>
    </>
  );
};

const SolidityscanReportDetails = ({ vulnerabilities, vulnerabilitiesCount }: Props) => {
  const { t } = useTranslation();

  const DISTRIBUTION_ITEMS: Array<DistributionItem> = [
    { id: 'critical', name: t('solidityScan.critical'), color: DISTRIBUTION_COLORS.critical },
    { id: 'high', name: t('solidityScan.high'), color: DISTRIBUTION_COLORS.high },
    { id: 'medium', name: t('solidityScan.medium'), color: DISTRIBUTION_COLORS.medium },
    { id: 'low', name: t('solidityScan.low'), color: DISTRIBUTION_COLORS.low },
    { id: 'informational', name: t('solidityScan.informational'), color: DISTRIBUTION_COLORS.informational },
    { id: 'gas', name: t('solidityScan.gas'), color: DISTRIBUTION_COLORS.gas },
  ];

  return (
    <Grid templateColumns="20px 1fr 100px" alignItems="center" rowGap={ 2 }>
      { DISTRIBUTION_ITEMS.map(item => (
        <SolidityScanReportItem item={ item } key={ item.id } vulnerabilities={ vulnerabilities } vulnerabilitiesCount={ vulnerabilitiesCount }/>
      )) }
    </Grid>
  );
};

export default chakra(SolidityscanReportDetails);
