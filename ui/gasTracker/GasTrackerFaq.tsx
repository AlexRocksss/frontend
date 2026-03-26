import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import config from 'configs/app';
import { currencyUnits } from 'lib/units';
import { AccordionRoot } from 'toolkit/chakra/accordion';
import { Heading } from 'toolkit/chakra/heading';

import GasTrackerFaqItem from './GasTrackerFaqItem';

const GasTrackerFaq = () => {
  const { t } = useTranslation();

  const faqItems = React.useMemo(() => [
    {
      question: t('gasTracker.faqQ1'),
      answer: t('gasTracker.faqA1'),
    },
    {
      question: t('gasTracker.faqQ2', { chain: config.chain.name }),
      answer: t('gasTracker.faqA2', { chain: config.chain.name, gwei: currencyUnits.gwei }),
    },
    {
      question: t('gasTracker.faqQ3', { chain: config.chain.name }),
      answer: t('gasTracker.faqA3', { chain: config.chain.name }),
    },
    {
      question: t('gasTracker.faqQ4'),
      answer: t('gasTracker.faqA4'),
    },
  ], [ t ]);

  return (
    <Box mt={ 12 }>
      <Heading level="2" mb={ 4 }>{ t('gasTracker.faqHeading') }</Heading>
      <AccordionRoot variant="faq">
        { faqItems.map((item, index) => (
          <GasTrackerFaqItem key={ index } question={ item.question } answer={ item.answer }/>
        )) }
      </AccordionRoot>
    </Box>
  );
};

export default GasTrackerFaq;
