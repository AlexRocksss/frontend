import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

import { LOCALES } from 'lib/settings/locale';

const SettingsLanguageDropdown = () => {
  const [ activeId, setActiveId ] = React.useState<string>('en');

  React.useEffect(() => {
    const storedLocale = localStorage.getItem('NEXT_LOCALE') || 'en';
    setActiveId(storedLocale);
  }, []);

  const handleSelect = (localeId: string) => {
    localStorage.setItem('NEXT_LOCALE', localeId);
    window.location.reload();
  };

  const handleSelectFactory = (id: string) => () => {
    handleSelect(id);
  };

  const activeLocale = LOCALES.find(locale => locale.id === activeId);

  // Theme-based styles
  const buttonBg = useColorModeValue('transparent', 'transparent');
  const buttonHoverBg = useColorModeValue('#EBF8FF', '#FFFFFF0F');
  const buttonTextColor = useColorModeValue('#1A202C', '#A0AEC0');
  const menuBg = useColorModeValue('white', '#171923');
  const menuItemHoverBg = useColorModeValue('#EBF8FF', '#FFFFFF0F');

  return (
    <Box mr="8px">
      <Menu>
        <MenuButton
          as={ Button }
          size="sm"
          fontSize="sm"
          px="3"
          py="2"
          bg={ buttonBg }
          color={ buttonTextColor }
          border="1px solid #2B6CB0" // Add border
          borderRadius="20px"
          _hover={{ bg: buttonHoverBg }}
          _expanded={{ bg: buttonBg }}
        >
          <Flex align="center" gap="6px">
            <Box
              w="16px"
              h="16px"
              borderRadius="full"
              background={ activeLocale?.sampleBg }
              backgroundRepeat="no-repeat"
              backgroundPosition="center"
              backgroundSize="contain"
            />
            { activeLocale?.label || 'Language' }
          </Flex>
        </MenuButton>
        <MenuList bg={ menuBg } zIndex="1500">
          { LOCALES.map((locale) => (
            <MenuItem
              key={ locale.id }
              onClick={ handleSelectFactory(locale.id) }
              _hover={{ bg: menuItemHoverBg }}
              bg={ locale.id === activeId ? menuItemHoverBg : 'transparent' }
            >
              <Flex align="center" gap="8px" color={ buttonTextColor }>
                <Box
                  w="16px"
                  h="16px"
                  borderRadius="full"
                  background={ locale.sampleBg }
                  backgroundRepeat="no-repeat"
                  backgroundPosition="center"
                  backgroundSize="contain"
                />
                { locale.label }
              </Flex>
            </MenuItem>
          )) }
        </MenuList>
      </Menu>
    </Box>
  );
};

export default React.memo(SettingsLanguageDropdown);
