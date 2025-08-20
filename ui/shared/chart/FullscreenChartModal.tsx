import { Box, Button, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';

import type { TimeChartItem } from './types';

import IconSvg from 'ui/shared/IconSvg';

import ChartWidgetGraph from './ChartWidgetGraph';
import config from "configs/app";
import { useTranslations } from 'next-intl';

type Props = {
  isOpen: boolean;
  title: string;
  description?: string;
  items: Array<TimeChartItem>;
  onClose: () => void;
  units?: string;
}

const FullscreenChartModal = ({
  isOpen,
  title,
  description,
  items,
  units,
  onClose,
}: Props) => {
  const t = useTranslations();
  const [ isZoomResetInitial, setIsZoomResetInitial ] = React.useState(true);

  const handleZoom = useCallback(() => {
    setIsZoomResetInitial(false);
  }, []);

  const handleZoomResetClick = useCallback(() => {
    setIsZoomResetInitial(true);
  }, []);

  const localeMessages: any = {
    "Accounts growth": t('Accounts growth'),
    "Cumulative accounts number per period": t('Cumulative accounts number per period'),
    "Active accounts": t('Active accounts'),
    "Active accounts number per period": t('Active accounts number per period'),
    "New accounts": t('New accounts'),
    "New accounts number per day": t('New accounts number per day'),
    "Average transaction fee": t('Average transaction fee'),
    "The average amount in ENI spent per transaction": t('The average amount in ENI spent per transaction'),
    "New transactions": t('New transactions'),
    "New transactions number": t('New transactions number'),
    "Transactions fees": t('Transactions fees'),
    "Amount of tokens paid as fees": t('Amount of tokens paid as fees'),
    "Transactions growth": t('Transactions growth'),
    "Cumulative transactions number": t('Cumulative transactions number'),
    "Transactions success rate": t('Transactions success rate'),
    "Successful transactions rate per day": t('Successful transactions rate per day'),
    "Average block rewards": t('Average block rewards'),
    "Average amount of distributed reward in tokens per day": t('Average amount of distributed reward in tokens per day'),
    "Average block size": t('Average block size'),
    "Average size of blocks in bytes": t('Average size of blocks in bytes'),
    "New blocks": t('New blocks'),
    "New blocks number": t('New blocks number'),
    "New ENI transfers": t('New ENI transfers'),
    "New token transfers number for the period": t('New token transfers number for the period'),
    "Average gas limit": t('Average gas limit'),
    "Average gas limit per block for the period": t('Average gas limit per block for the period'),
    "Average gas price": t('Average gas price'),
    "Average gas price for the period (Gwei)": t('Average gas price for the period (Gwei)'),
    "Gas used growth": t('Gas used growth'),
    "Cumulative gas used for the period": t('Cumulative gas used for the period'),
    "Contracts growth": t('Contracts growth'),
    "Cumulative number of contracts for the period": t('Cumulative number of contracts for the period'),
    "New contracts": t('New contracts'),
    "New contracts number for the period": t('New contracts number for the period'),
    "New verified contracts": t('New verified contracts'),
    "New verified contracts number for the period": t('New verified contracts number for the period'),
    "Verified contracts growth": t('Verified contracts growth'),
    "Cumulative number verified contracts for the period": t('Cumulative number verified contracts for the period'),
    "Balances": t("Balances")
  }  

  return (
    <Modal
      isOpen={ isOpen }
      onClose={ onClose }
      size="full"
      isCentered
    >
      <ModalOverlay/>

      <ModalContent>

        <Box
          mb={ 1 }
        >
          <Grid
            gridColumnGap={ 2 }
          >
            <Heading
              mb={ 1 }
              size={{ base: 'xs', sm: 'md' }}
            >
              { localeMessages[title] }
            </Heading>

            { description && (
              <Text
                gridColumn={ 1 }
                as="p"
                variant="secondary"
                fontSize="xs"
              >
                { localeMessages[description] }
              </Text>
            ) }

            { !isZoomResetInitial && (
              <Button
                leftIcon={ <IconSvg name="repeat_arrow" w={ 4 } h={ 4 }/> }
                colorScheme="blue"
                gridColumn={ 2 }
                justifySelf="end"
                alignSelf="top"
                gridRow="1/3"
                size="sm"
                variant="outline"
                onClick={ handleZoomResetClick }
              >
                Reset zoom
              </Button>
            ) }
          </Grid>
        </Box>

        <ModalCloseButton/>

        <ModalBody
          h="100%"
        >
          <ChartWidgetGraph
            margin={{ bottom: 60 }}
            isEnlarged
            items={ items }
            units={ units }
            onZoom={ handleZoom }
            isZoomResetInitial={ isZoomResetInitial }
            title={ title }
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FullscreenChartModal;
