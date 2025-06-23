import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import { LOCALES } from 'lib/settings/locale';

import SettingsSample from './SettingsSample';

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

  const half = Math.ceil(LOCALES.length / 2);
  const firstRow = LOCALES.slice(0, half);
  const secondRow = LOCALES.slice(half);

  return (
    <div>
      <Box fontWeight={ 600 }>{ config.t()('Languages') }</Box>
      <Flex>
        { firstRow.map((locale) => (
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
      <Flex>
        { secondRow.map((locale) => (
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
