import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { route } from 'nextjs-routes';

import getErrorCause from 'lib/errors/getErrorCause';
import getErrorCauseStatusCode from 'lib/errors/getErrorCauseStatusCode';
import getErrorObjStatusCode from 'lib/errors/getErrorObjStatusCode';
import getErrorProp from 'lib/errors/getErrorProp';
import getResourceErrorPayload from 'lib/errors/getResourceErrorPayload';
import { Button } from 'toolkit/chakra/button';
import { Link } from 'toolkit/chakra/link';

import AdBanner from '../ad/AdBanner';
import AppErrorIcon from './AppErrorIcon';
import AppErrorTitle from './AppErrorTitle';
import AppErrorBlockConsensus from './custom/AppErrorBlockConsensus';
import AppErrorTooManyRequests from './custom/AppErrorTooManyRequests';
import AppErrorTxNotFound from './custom/AppErrorTxNotFound';

interface Props {
  className?: string;
  error: Error | undefined;
}

const AppError = ({ error, className }: Props) => {
  const { t } = useTranslation();

  const ERROR_TEXTS: Record<string, { title: string; text: string }> = {
    '403': { title: t('error.403_title'), text: t('error.403_text') },
    '404': { title: t('error.404_title'), text: t('error.404_text') },
    '422': { title: t('error.422_title'), text: t('error.422_text') },
    '500': { title: t('error.500_title'), text: t('error.500_text') },
  };
  const content = (() => {
    const resourceErrorPayload = getResourceErrorPayload(error);
    const cause = getErrorCause(error);
    const messageInPayload =
          resourceErrorPayload &&
          typeof resourceErrorPayload === 'object' &&
          'message' in resourceErrorPayload &&
          typeof resourceErrorPayload.message === 'string' ?
            resourceErrorPayload.message :
            undefined;
    const statusCode = getErrorCauseStatusCode(error) || getErrorObjStatusCode(error);

    const isInvalidTxHash = cause && 'resource' in cause && cause.resource === 'general:tx' && statusCode === 404;
    const isBlockConsensus = messageInPayload?.includes('Block lost consensus');

    if (isInvalidTxHash) {
      return <AppErrorTxNotFound/>;
    }

    if (isBlockConsensus) {
      const hash =
              resourceErrorPayload &&
              typeof resourceErrorPayload === 'object' &&
              'hash' in resourceErrorPayload &&
              typeof resourceErrorPayload.hash === 'string' ?
                resourceErrorPayload.hash :
                undefined;
      return <AppErrorBlockConsensus hash={ hash }/>;
    }

    switch (statusCode) {
      case 429: {
        const rateLimits = getErrorProp(error, 'rateLimits');
        const bypassOptions = typeof rateLimits === 'object' && rateLimits && 'bypassOptions' in rateLimits ? rateLimits.bypassOptions : undefined;
        const reset = typeof rateLimits === 'object' && rateLimits && 'reset' in rateLimits ? rateLimits.reset : undefined;
        return (
          <AppErrorTooManyRequests
            bypassOptions={ typeof bypassOptions === 'string' ? bypassOptions : undefined }
            reset={ typeof reset === 'string' ? reset : undefined }/>
        );
      }

      default: {
        const { title, text } = ERROR_TEXTS[String(statusCode)] ?? ERROR_TEXTS[500];

        return (
          <>
            <AppErrorIcon statusCode={ statusCode }/>
            <AppErrorTitle title={ title }/>
            <Text color="text.secondary" mt={ 3 }>{ text }</Text>
            <Link
              href={ route({ pathname: '/' }) }
              asChild
            >
              <Button
                mt={ 8 }
                variant="outline"
              >
                Back to home
              </Button>
            </Link>
            { statusCode === 404 && <AdBanner mt={ 12 }/> }
          </>
        );
      }
    }
  })();

  return (
    <Box className={ className } mt={{ base: '52px', lg: '104px' }} maxW="800px">
      { content }
    </Box>
  );
};

export default React.memo(AppError);
