import { chakra, HStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Button } from 'toolkit/chakra/button';
import IconSvg from 'ui/shared/IconSvg';
import StatusTag from 'ui/shared/statusTag/StatusTag';

import type { Status } from './useUptimeSocketData';

interface Props {
  status: Status;
  onReconnect: () => void;
}

const UptimeStatus = ({ status, onReconnect }: Props) => {
  const { t } = useTranslation();

  const statusTag = (() => {
    switch (status) {
      case 'connected':
        return <StatusTag type="ok" text={ t('megaEth.connected') }/>;
      case 'disconnected':
      case 'error':
        return <StatusTag type="error" text={ t('megaEth.disconnected') }/>;
      case 'initial':
        return <StatusTag type="pending" text={ t('megaEth.initializing') }/>;
    }

    return null;
  })();

  return (
    <HStack ml="auto" columnGap={ 3 }>
      { statusTag }
      <Button variant="link" gap={ 1 } onClick={ onReconnect } disabled={ status === 'connected' }>
        <IconSvg name="refresh" boxSize={ 5 }/>
        <chakra.span hideBelow="lg" fontSize="sm">{ t('megaEth.refresh') }</chakra.span>
      </Button>
    </HStack>
  );
};

export default React.memo(UptimeStatus);
