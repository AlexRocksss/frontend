import { Box, Button, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';

import type { TimeChartItem } from './types';

import IconSvg from 'ui/shared/IconSvg';

import ChartWidgetGraph from './ChartWidgetGraph';
import config from "configs/app";

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
  const [ isZoomResetInitial, setIsZoomResetInitial ] = React.useState(true);

  const handleZoom = useCallback(() => {
    setIsZoomResetInitial(false);
  }, []);

  const handleZoomResetClick = useCallback(() => {
    setIsZoomResetInitial(true);
  }, []);

  const localeMessages: any = {
    "Accounts growth": config.t()('Accounts growth'),
    "Cumulative accounts number per period": config.t()('Cumulative accounts number per period'),
    "Active accounts": config.t()('Active accounts'),
    "Active accounts number per period": config.t()('Active accounts number per period'),
    "New accounts": config.t()('New accounts'),
    "New accounts number per day": config.t()('New accounts number per day'),
    "Average transaction fee": config.t()('Average transaction fee'),
    "The average amount in ENI spent per transaction": config.t()('The average amount in ENI spent per transaction'),
    "New transactions": config.t()('New transactions'),
    "New transactions number": config.t()('New transactions number'),
    "Transactions fees": config.t()('Transactions fees'),
    "Amount of tokens paid as fees": config.t()('Amount of tokens paid as fees'),
    "Transactions growth": config.t()('Transactions growth'),
    "Cumulative transactions number": config.t()('Cumulative transactions number'),
    "Transactions success rate": config.t()('Transactions success rate'),
    "Successful transactions rate per day": config.t()('Successful transactions rate per day'),
    "Average block rewards": config.t()('Average block rewards'),
    "Average amount of distributed reward in tokens per day": config.t()('Average amount of distributed reward in tokens per day'),
    "Average block size": config.t()('Average block size'),
    "Average size of blocks in bytes": config.t()('Average size of blocks in bytes'),
    "New blocks": config.t()('New blocks'),
    "New blocks number": config.t()('New blocks number'),
    "New ENI transfers": config.t()('New ENI transfers'),
    "New token transfers number for the period": config.t()('New token transfers number for the period'),
    "Average gas limit": config.t()('Average gas limit'),
    "Average gas limit per block for the period": config.t()('Average gas limit per block for the period'),
    "Average gas price": config.t()('Average gas price'),
    "Average gas price for the period (Gwei)": config.t()('Average gas price for the period (Gwei)'),
    "Gas used growth": config.t()('Gas used growth'),
    "Cumulative gas used for the period": config.t()('Cumulative gas used for the period'),
    "Contracts growth": config.t()('Contracts growth'),
    "Cumulative number of contracts for the period": config.t()('Cumulative number of contracts for the period'),
    "New contracts": config.t()('New contracts'),
    "New contracts number for the period": config.t()('New contracts number for the period'),
    "New verified contracts": config.t()('New verified contracts'),
    "New verified contracts number for the period": config.t()('New verified contracts number for the period'),
    "Verified contracts growth": config.t()('Verified contracts growth'),
    "Cumulative number verified contracts for the period": config.t()('Cumulative number verified contracts for the period'),
    "Balances": config.t()("Balances")
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
