import { Flex, Separator, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { IconButton } from 'toolkit/chakra/icon-button';
import { PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from 'toolkit/chakra/popover';
import { Tooltip } from 'toolkit/chakra/tooltip';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';
import IconSvg from 'ui/shared/IconSvg';

import SettingsAddressFormat from './SettingsAddressFormat';
import SettingsColorTheme from './SettingsColorTheme';
import SettingsIdentIcon from './SettingsIdentIcon';
import SettingsLanguage from './SettingsLanguage';
import SettingsLocalTime from './SettingsLocalTime';
import SettingsPoorReputationTokens from './SettingsPoorReputationTokens';
import SettingsScamTokens from './SettingsScamTokens';

const Settings = () => {
  const { t } = useTranslation();
  const popover = useDisclosure();
  const tooltip = useDisclosure();

  const handlePopoverOpenChange = React.useCallback(({ open }: { open: boolean }) => {
    open && tooltip.onClose();
    popover.onOpenChange({ open });
  }, [ popover, tooltip ]);

  const handleTooltipOpenChange = React.useCallback(({ open }: { open: boolean }) => {
    if (!popover.open) {
      tooltip.onOpenChange({ open });
    }
  }, [ popover, tooltip ]);

  return (
    <PopoverRoot
      positioning={{ placement: 'bottom-start' }}
      open={ popover.open }
      onOpenChange={ handlePopoverOpenChange }
      // should be false to enable auto-switch to default color theme
      lazyMount={ false }
    >
      <Tooltip content={ t('settings.websiteSettings') } disableOnMobile open={ tooltip.open } onOpenChange={ handleTooltipOpenChange }>
        <Flex alignItems="center">
          <PopoverTrigger>
            <IconButton
              variant="link"
              size="2xs"
              borderRadius="sm"
              aria-label="User settings"
            >
              <IconSvg name="gear"/>
            </IconButton>
          </PopoverTrigger>
        </Flex>
      </Tooltip>
      <PopoverContent overflowY="hidden" w="auto" fontSize="sm">
        <PopoverBody>
          <SettingsColorTheme onSelect={ popover.onClose }/>
          <Separator my={ 3 }/>
          <SettingsIdentIcon/>
          <SettingsAddressFormat/>
          <Separator my={ 3 }/>
          <VStack gap={ 1 }>
            <SettingsScamTokens/>
            <SettingsPoorReputationTokens/>
            <SettingsLocalTime/>
          </VStack>
          <Separator my={ 3 }/>
          <SettingsLanguage/>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default React.memo(Settings);
