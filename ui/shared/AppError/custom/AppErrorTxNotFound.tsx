/* eslint-disable max-len */
import { Box, Flex, List, chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { route } from 'nextjs-routes';

import { Button } from 'toolkit/chakra/button';
import { Link } from 'toolkit/chakra/link';
import Puzzle15 from 'ui/games/Puzzle15';
import IconSvg from 'ui/shared/IconSvg';

import AppErrorTitle from '../AppErrorTitle';
const AppErrorTxNotFound = () => {
  const { t } = useTranslation();
  const snippet = {
    borderColor: { _light: 'blackAlpha.300', _dark: 'whiteAlpha.300' },
    iconBg: { _light: 'blackAlpha.800', _dark: 'whiteAlpha.800' },
    iconColor: { _light: 'white', _dark: 'black' },
  };

  const [ isPuzzleOpen, setIsPuzzleOpen ] = React.useState(false);

  const showPuzzle = React.useCallback(() => {
    setIsPuzzleOpen(true);
  }, []);

  return (
    <>
      <Box p={ 4 } borderColor={ snippet.borderColor } borderRadius="md" w="230px" borderWidth="1px">
        <Flex alignItems="center" pb={ 4 } borderBottomWidth="1px" borderColor={ snippet.borderColor }>
          { /* FIXME use non-navigation icon */ }
          <IconSvg name="navigation/transactions" boxSize={ 8 } color={ snippet.iconColor } bgColor={ snippet.iconBg } p={ 1 } borderRadius="md"/>
          <Box ml={ 2 }>
            <Box w="125px" h="8px" borderRadius="full" bgColor={ snippet.iconBg }/>
            <Box w="30px" h="8px" borderRadius="full" bgColor={ snippet.borderColor } mt={ 1.5 }/>
          </Box>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mt={ 3 }>
          <Flex alignItems="center">
            <Box boxSize={ 5 } borderRadius="full" bgColor={ snippet.borderColor }/>
            <Box w="65px" h="8px" borderRadius="full" bgColor={ snippet.borderColor } ml={ 1.5 }/>
          </Flex>
          <Flex alignItems="center">
            <Box boxSize={ 5 } borderRadius="full" bgColor={ snippet.borderColor }/>
            <Box w="65px" h="8px" borderRadius="full" bgColor={ snippet.borderColor } ml={ 1.5 }/>
          </Flex>
        </Flex>
      </Box>
      <AppErrorTitle title={ t('error.txNotFound_title') }/>
      <List.Root mt={ 3 } gap={ 3 } as="ol" pl={ 5 }>
        <List.Item>
          { t('error.txNotFound_item1') }
        </List.Item>
        <List.Item>
          { t('error.txNotFound_item2') }
        </List.Item>
        <List.Item>
          { t('error.txNotFound_item3') }
        </List.Item>
        <List.Item>
          <span>{ t('error.txNotFound_item4_pre') }</span>
          <chakra.span fontWeight={ 600 }>{ t('error.txNotFound_item4_bold') }</chakra.span>
          <span>{ t('error.txNotFound_item4_post') }</span>
        </List.Item>
        <List.Item>
          <span>{ t('error.txNotFound_item5_pre') }<Link onClick={ showPuzzle }>{ t('error.txNotFound_item5_link') }</Link>{ t('error.txNotFound_item5_post') }</span>
        </List.Item>
      </List.Root>
      { isPuzzleOpen && <Puzzle15/> }
      <Link href={ route({ pathname: '/' }) } asChild>
        <Button
          mt={ 8 }
          variant="outline"
        >
          { t('action.backToHome') }
        </Button>
      </Link>
    </>
  );
};

export default AppErrorTxNotFound;
