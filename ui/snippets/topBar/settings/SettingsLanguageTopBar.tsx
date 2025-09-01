import { Flex } from '@chakra-ui/react';
import React from 'react';

import { LOCALES } from 'lib/settings/locale';

import SettingsSampleTopBar from './SettingsSampleTopBar';

const SettingsLanguageTopBar = () => {
  const [ activeId, setActiveId ] = React.useState<string>();

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
    <div style={{ marginRight: '8px', backgroundColor: 'lightgrey', borderRadius: '20px' }}>
      <Flex>
        { LOCALES.map((locale) => (
          <SettingsSampleTopBar
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

export default React.memo(SettingsLanguageTopBar);
