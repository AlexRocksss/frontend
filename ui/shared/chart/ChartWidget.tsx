import {
  Box,
  Center,
  chakra,
  Flex,
  IconButton, Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Text,
  Tooltip,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import domToImage from 'dom-to-image';
import React, { useRef, useCallback, useState } from 'react';

import type { TimeChartItem } from './types';

import dayjs from 'lib/date/dayjs';
import { apos } from 'lib/html-entities';
import saveAsCSV from 'lib/saveAsCSV';
import IconSvg from 'ui/shared/IconSvg';

import ChartWidgetGraph from './ChartWidgetGraph';
import FullscreenChartModal from './FullscreenChartModal';
import config from "configs/app";

export type Props = {
  items?: Array<TimeChartItem>;
  title: string;
  description?: string;
  units?: string;
  isLoading: boolean;
  className?: string;
  isError: boolean;
  emptyText?: string;
}

const DOWNLOAD_IMAGE_SCALE = 5;

const ChartWidget = ({ items, title, description, isLoading, className, isError, units, emptyText }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [ isFullscreen, setIsFullscreen ] = useState(false);
  const [ isZoomResetInitial, setIsZoomResetInitial ] = React.useState(true);

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

  const pngBackgroundColor = useColorModeValue('white', 'black');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleZoom = useCallback(() => {
    setIsZoomResetInitial(false);
  }, []);

  const handleZoomResetClick = useCallback(() => {
    setIsZoomResetInitial(true);
  }, []);

  const showChartFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const clearFullscreenChart = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const handleFileSaveClick = useCallback(() => {
    // wait for context menu to close
    setTimeout(() => {
      if (ref.current) {
        domToImage.toPng(ref.current,
          {
            quality: 100,
            bgcolor: pngBackgroundColor,
            width: ref.current.offsetWidth * DOWNLOAD_IMAGE_SCALE,
            height: ref.current.offsetHeight * DOWNLOAD_IMAGE_SCALE,
            filter: (node) => node.nodeName !== 'BUTTON',
            style: {
              borderColor: 'transparent',
              transform: `scale(${ DOWNLOAD_IMAGE_SCALE })`,
              'transform-origin': 'top left',
            },
          })
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = `${ title } (Blockscout chart).png`;
            link.href = dataUrl;
            link.click();
            link.remove();
          });
      }
    }, 100);
  }, [ pngBackgroundColor, title ]);

  const handleSVGSavingClick = useCallback(() => {
    if (items) {
      const headerRows = [
        'Date', 'Value',
      ];
      const dataRows = items.map((item) => [
        dayjs(item.date).format('YYYY-MM-DD'), String(item.value),
      ]);

      saveAsCSV(headerRows, dataRows, `${ title } (Blockscout stats)`);
    }
  }, [ items, title ]);

  const hasItems = items && items.length > 2;

  const content = (() => {
    if (isError) {
      return (
        <Flex
          alignItems="center"
          justifyContent="center"
          flexGrow={ 1 }
          py={ 4 }
        >
          <Text
            variant="secondary"
            fontSize="sm"
            textAlign="center"
          >
            { `The data didn${ apos }t load. Please, ` }
            <Link href={ window.document.location.href }>try to reload the page.</Link>
          </Text>
        </Flex>
      );
    }

    if (isLoading) {
      return <Skeleton flexGrow={ 1 } w="100%"/>;
    }

    if (!hasItems) {
      return (
        <Center flexGrow={ 1 }>
          <Text variant="secondary" fontSize="sm">{ emptyText || 'No data' }</Text>
        </Center>
      );
    }

    return (
      <Box flexGrow={ 1 } maxW="100%">
        <ChartWidgetGraph
          items={ items }
          onZoom={ handleZoom }
          isZoomResetInitial={ isZoomResetInitial }
          title={ title }
          units={ units }
        />
      </Box>
    );
  })();

  return (
    <>
      <Flex
        height="100%"
        ref={ ref }
        flexDir="column"
        padding={{ base: 3, lg: 4 }}
        borderRadius="md"
        border="1px"
        borderColor={ borderColor }
        className={ className }
      >
        <Flex columnGap={ 6 } mb={ 1 } alignItems="flex-start">
          <Flex flexGrow={ 1 } flexDir="column" alignItems="flex-start">
            <Skeleton
              isLoaded={ !isLoading }
              fontWeight={ 600 }
              size={{ base: 'xs', lg: 'sm' }}
            >
              { localeMessages[title] }
            </Skeleton>

            { description && (
              <Skeleton
                isLoaded={ !isLoading }
                color="text_secondary"
                fontSize="xs"
                mt={ 1 }
              >
                <span>{ localeMessages[description] }</span>
              </Skeleton>
            ) }
          </Flex>

          <Flex ml="auto" columnGap={ 2 }>
            <Tooltip label="Reset zoom">
              <IconButton
                hidden={ isZoomResetInitial }
                aria-label="Reset zoom"
                colorScheme="blue"
                w={ 9 }
                h={ 8 }
                size="sm"
                variant="outline"
                onClick={ handleZoomResetClick }
                icon={ <IconSvg name="repeat_arrow" w={ 4 } h={ 4 }/> }
              />
            </Tooltip>

            { hasItems && (
              <Menu>
                <Skeleton isLoaded={ !isLoading } borderRadius="base">
                  <MenuButton
                    w="36px"
                    h="32px"
                    icon={ <IconSvg name="dots" boxSize={ 4 } transform="rotate(-90deg)"/> }
                    colorScheme="gray"
                    variant="ghost"
                    as={ IconButton }
                  >
                    <VisuallyHidden>
                      Open chart options menu
                    </VisuallyHidden>
                  </MenuButton>
                </Skeleton>
                <MenuList>
                  <MenuItem
                    display="flex"
                    alignItems="center"
                    onClick={ showChartFullscreen }
                  >
                    <IconSvg name="scope" boxSize={ 5 } mr={ 3 }/>
                  View fullscreen
                  </MenuItem>

                  <MenuItem
                    display="flex"
                    alignItems="center"
                    onClick={ handleFileSaveClick }
                  >
                    <IconSvg name="files/image" boxSize={ 5 } mr={ 3 }/>
                  Save as PNG
                  </MenuItem>

                  <MenuItem
                    display="flex"
                    alignItems="center"
                    onClick={ handleSVGSavingClick }
                  >
                    <IconSvg name="files/csv" boxSize={ 5 } mr={ 3 }/>
                  Save as CSV
                  </MenuItem>
                </MenuList>
              </Menu>
            ) }
          </Flex>
        </Flex>

        { content }
      </Flex>

      { hasItems && (
        <FullscreenChartModal
          isOpen={ isFullscreen }
          items={ items }
          title={ title }
          description={ description }
          onClose={ clearFullscreenChart }
          units={ units }
        />
      ) }
    </>
  );
};

export default React.memo(chakra(ChartWidget));
