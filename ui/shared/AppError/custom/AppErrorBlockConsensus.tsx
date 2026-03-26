import { useTranslation } from 'next-i18next';
import React from 'react';

import { route } from 'nextjs-routes';

import { Button } from 'toolkit/chakra/button';
import { Link } from 'toolkit/chakra/link';

import AppErrorIcon from '../AppErrorIcon';
import AppErrorTitle from '../AppErrorTitle';

interface Props {
  hash?: string;
}

const AppErrorBlockConsensus = ({ hash }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <AppErrorIcon statusCode={ 404 }/>
      <AppErrorTitle title={ t('error.blockReorg_title') }/>
      <Link href={ hash ? route({ pathname: '/block/[height_or_hash]', query: { height_or_hash: hash } }) : route({ pathname: '/' }) } asChild>
        <Button
          mt={ 8 }
          variant="outline"
        >
          { hash ? t('action.viewReorg') : t('action.backToHome') }
        </Button>
      </Link>
    </>
  );
};

export default AppErrorBlockConsensus;
