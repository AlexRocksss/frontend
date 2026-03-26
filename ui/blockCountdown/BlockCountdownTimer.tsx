import { HStack, StackSeparator } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { SECOND } from 'toolkit/utils/consts';

import BlockCountdownTimerItem from './BlockCountdownTimerItem';
import splitSecondsInPeriods from './splitSecondsInPeriods';

interface Props {
  value: number;
  onFinish: () => void;
}

const BlockCountdownTimer = ({ value: initialValue, onFinish }: Props) => {
  const { t } = useTranslation();

  const [ value, setValue ] = React.useState(initialValue);

  React.useEffect(() => {
    const intervalId = window.setInterval(() => {
      setValue((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        onFinish();
        return 0;
      });
    }, SECOND);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [ initialValue, onFinish ]);

  const periods = splitSecondsInPeriods(value);

  return (
    <HStack
      bgColor={{ _light: 'gray.50', _dark: 'whiteAlpha.100' }}
      mt={{ base: 6, lg: 8 }}
      p={{ base: 3, lg: 4 }}
      borderRadius="base"
      separator={ <StackSeparator borderColor="border.divider"/> }
    >
      <BlockCountdownTimerItem label={ t('blockCountdown.days') } value={ periods.days }/>
      <BlockCountdownTimerItem label={ t('blockCountdown.hours') } value={ periods.hours }/>
      <BlockCountdownTimerItem label={ t('blockCountdown.minutes') } value={ periods.minutes }/>
      <BlockCountdownTimerItem label={ t('blockCountdown.seconds') } value={ periods.seconds }/>
    </HStack>
  );
};

export default React.memo(BlockCountdownTimer);
