import { useTranslation } from 'next-i18next';
import React from 'react';

import { useSettingsContext } from 'lib/contexts/settings';
import { Switch } from 'toolkit/chakra/switch';

const SettingsLocalTime = () => {
  const { t } = useTranslation();
  const settingsContext = useSettingsContext();

  if (!settingsContext) {
    return null;
  }

  const { isLocalTime, toggleIsLocalTime } = settingsContext;

  return (
    <Switch
      id="local-time"
      defaultChecked={ isLocalTime }
      onChange={ toggleIsLocalTime }
      direction="rtl"
      justifyContent="space-between"
      w="100%"
      minH="34px"
    >
      { t('settings.localTimeFormat') }
    </Switch>
  );
};

export default React.memo(SettingsLocalTime);
