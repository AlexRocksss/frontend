import { Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import * as cookiesLib from 'lib/cookies';
import { Tooltip } from 'toolkit/chakra/tooltip';

const LANGUAGES = [
  { locale: 'en', label: 'English', icon: '/assets/icons/lang/lang-en.png' },
  { locale: 'zh-TW', label: '繁體中文', icon: '/assets/icons/lang/lang-zh.png' },
] as const;

type Lang = typeof LANGUAGES[number];

interface LangSampleProps {
  lang: Lang;
  isActive: boolean;
  onClick: (locale: string) => void;
}

const LangSample = ({ lang, isActive, onClick }: LangSampleProps) => {
  const bgColor = { base: 'white', _dark: 'gray.900' };
  const activeBgColor = { base: 'blue.50', _dark: 'whiteAlpha.100' };
  const activeBorderColor = { base: 'blackAlpha.800', _dark: 'gray.50' };
  const handleClick = React.useCallback(() => onClick(lang.locale), [ lang.locale, onClick ]);

  return (
    <Box p="9px" bgColor={ isActive ? activeBgColor : 'transparent' } borderRadius="base">
      <Tooltip content={ lang.label }>
        <Box
          boxSize="22px"
          borderRadius="full"
          borderWidth="1px"
          borderColor={ isActive ? activeBgColor : bgColor }
          position="relative"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          onClick={ handleClick }
          _before={{
            position: 'absolute',
            display: 'block',
            boxSizing: 'content-box',
            content: '""',
            top: '-3px',
            left: '-3px',
            width: 'calc(100% + 2px)',
            height: 'calc(100% + 2px)',
            borderStyle: 'solid',
            borderRadius: 'full',
            borderWidth: '2px',
            borderColor: isActive ? activeBorderColor : 'transparent',
          }}
          _hover={{
            _before: {
              borderColor: isActive ? activeBorderColor : 'hover',
            },
          }}
        >
          { /* eslint-disable-next-line @next/next/no-img-element */ }
          <img src={ lang.icon } alt={ lang.label } width="22" height="22" style={{ objectFit: 'cover', borderRadius: '50%' }}/>
        </Box>
      </Tooltip>
    </Box>
  );
};

const SettingsLanguage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const currentLocale = router.locale ?? 'en';
  const activeLang = LANGUAGES.find((l) => l.locale === currentLocale) ?? LANGUAGES[0];

  const handleSelect = React.useCallback((locale: string) => {
    cookiesLib.set(cookiesLib.NAMES.LOCALE, locale, { expires: 365 });
    // Navigate to asPath (locale-prefix-free) so the middleware can rewrite
    // based on the new cookie value without a URL change.
    window.location.href = router.asPath;
  }, [ router.asPath ]);

  return (
    <div>
      <Box fontWeight={ 600 }>{ t('settings.language') }</Box>
      <Box color="text.secondary" mt={ 1 } mb={ 2 }>{ activeLang.label }</Box>
      <Flex>
        { LANGUAGES.map((lang) => (
          <LangSample
            key={ lang.locale }
            lang={ lang }
            isActive={ currentLocale === lang.locale }
            onClick={ handleSelect }
          />
        )) }
      </Flex>
    </div>
  );
};

export default React.memo(SettingsLanguage);
