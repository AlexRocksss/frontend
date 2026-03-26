import { Box, createListCollection, Separator } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ExternalChain } from 'types/externalChains';

import useIsInitialLoading from 'lib/hooks/useIsInitialLoading';
import useIsMobile from 'lib/hooks/useIsMobile';
import type { SelectOption, SelectProps, ViewMode } from 'toolkit/chakra/select';
import { Select } from 'toolkit/chakra/select';
import { FilterInput } from 'toolkit/components/filters/FilterInput';
import IconSvg from 'ui/shared/IconSvg';

import ChainIcon from './ChainIcon';

export interface Props extends Omit<SelectProps, 'collection' | 'placeholder'> {
  loading?: boolean;
  mode?: ViewMode;
  chainsConfig: Array<Omit<ExternalChain, 'explorer_url'>>;
  chainIds?: Array<string>;
  withAllOption?: boolean;
}

const ChainSelect = ({ loading, mode, chainsConfig, chainIds, withAllOption, ...props }: Props) => {
  const { t } = useTranslation();

  const [ inputValue, setInputValue ] = React.useState('');

  const isInitialLoading = useIsInitialLoading(loading);
  const isMobile = useIsMobile();

  const allItems = React.useMemo(() => {
    const ALL_OPTION: SelectOption = {
      value: 'all',
      label: t('chainSelect.allChains'),
      icon: <IconSvg name="pie_chart" boxSize={ 5 }/>,
      afterElement: <Separator orientation="horizontal" w="full"/>,
    };
    const chainItems = chainsConfig
      .filter((chain) => !chainIds || isInitialLoading || chainIds.includes(chain.id))
      .map((chain) => ({
        value: chain.id,
        label: chain.name || `Chain ${ chain.id }`,
        icon: <ChainIcon data={ chain } alt={ `${ chain.name } logo` } borderRadius="none" noTooltip/>,
      })) || [];

    return [ withAllOption ? ALL_OPTION : undefined, ...chainItems ].filter(Boolean);
  }, [ chainsConfig, chainIds, withAllOption, isInitialLoading, t ]);

  const collection = React.useMemo(() => {
    return createListCollection<SelectOption>({ items: allItems });
  }, [ allItems ]);

  const handleFilterChange = React.useCallback((value: string) => {
    setInputValue(value);
  }, [ ]);

  const itemFilter = React.useCallback((item: SelectOption) => {
    return item.label.toLowerCase().includes(inputValue.toLowerCase());
  }, [ inputValue ]);

  const contentHeader = allItems.length > 10 ? (
    <Box px="4" pt={ 4 } pb={ 2 } position="sticky" top={ 0 } zIndex={ 1 } bgColor="popover.bg">
      <FilterInput
        placeholder={ t('placeholder.findChain') }
        initialValue={ inputValue }
        onChange={ handleFilterChange }
      />
    </Box>
  ) : null;

  if (allItems.length === 0) {
    return null;
  }

  return (
    <Select
      collection={ collection }
      defaultValue={ allItems.length > 0 ? [ allItems[0].value ] : undefined }
      placeholder={ t('placeholder.selectChain') }
      loading={ isInitialLoading }
      mode={ isMobile && !mode ? 'compact' : mode }
      w="fit-content"
      flexShrink={ 0 }
      contentHeader={ contentHeader }
      contentProps={ contentHeader ? { pt: 0 } : undefined }
      itemFilter={ itemFilter }
      { ...props }
    />
  );
};

export default React.memo(ChainSelect);
