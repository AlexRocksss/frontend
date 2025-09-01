import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import { LOCALES } from 'lib/settings/locale';

import SettingsSample from './SettingsSample';
import { local } from 'd3-selection';
// import { useRouter } from 'next/router';
import config from "configs/app";

const SettingsLanguage = () => {
  const [ activeId, setActiveId ] = React.useState<string>();
  // const router = useRouter();

  React.useEffect(() => {
    const storedLocale = localStorage.getItem('NEXT_LOCALE') || 'en';
    setActiveId(storedLocale);
  }, []);

  const handleSelect = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const selectedLocale = event.currentTarget.getAttribute('data-value') || 'en';
    localStorage.setItem('NEXT_LOCALE', selectedLocale);
    window.location.reload();
  }, []);

  return (
    <div>
      <Box fontWeight={ 600 }>{ config.t()("Languages") }</Box>
      <Flex>
        { LOCALES.map((locale) => (
          <SettingsSample
            key={ locale.id }
            label={ locale.label }
            value={ locale.id }
            isActive={ locale.id === activeId }
            bg={ locale.sampleBg }
            onClick={ handleSelect }
          />
        )) }
      </Flex>
    </div>
  );
};

export default React.memo(SettingsLanguage);
