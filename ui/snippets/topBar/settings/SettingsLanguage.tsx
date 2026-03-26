import { Box, Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import { Button } from 'toolkit/chakra/button';

const LANGUAGES = [
  { locale: 'en', label: 'English', shortLabel: 'EN' },
  { locale: 'zh-TW', label: '繁體中文', shortLabel: '繁中' },
] as const;

type LangButtonProps = {
  lang: typeof LANGUAGES[number];
  isActive: boolean;
  onSelect: (locale: string) => void;
};

const LangButton = ({ lang, isActive, onSelect }: LangButtonProps) => {
  const handleClick = React.useCallback(() => onSelect(lang.locale), [ lang.locale, onSelect ]);
  return (
    <Button
      size="xs"
      variant={ isActive ? 'solid' : 'outline' }
      onClick={ handleClick }
      aria-label={ lang.label }
      title={ lang.label }
    >
      { lang.shortLabel }
    </Button>
  );
};

const SettingsLanguage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const currentLocale = router.locale ?? 'en';

  const handleSelect = React.useCallback((locale: string) => {
    // nextjs-routes overrides TransitionOptions and strips the locale field;
    // cast to any to use Next.js built-in locale-switching support
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (router.push as any)(router.asPath, router.asPath, { locale, scroll: false });
  }, [ router ]);

  return (
    <Box>
      <Box fontWeight={ 600 }>{ t('settings.language') }</Box>
      <Flex mt={ 2 } gap={ 2 }>
        { LANGUAGES.map((lang) => (
          <LangButton key={ lang.locale } lang={ lang } isActive={ currentLocale === lang.locale } onSelect={ handleSelect }/>
        )) }
      </Flex>
    </Box>
  );
};

export default React.memo(SettingsLanguage);
