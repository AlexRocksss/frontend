import { chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import dayjs from 'lib/date/dayjs';

interface Props {
  date: string | undefined;
}

const NameDomainExpiryStatus = ({ date }: Props) => {
  const { t } = useTranslation();

  if (!date) {
    return null;
  }

  const hasExpired = dayjs(date).isBefore(dayjs());

  if (hasExpired) {
    return <chakra.span color="red.600">{ t('nameDomain.expired') }</chakra.span>;
  }

  const diff = dayjs(date).diff(dayjs(), 'day');
  if (diff < 30) {
    return <chakra.span color="red.600">{ t('nameDomain.daysLeft', { count: diff }) }</chakra.span>;
  }

  return <chakra.span color="text.secondary">{ t('nameDomain.expires', { when: dayjs(date).fromNow() }) }</chakra.span>;
};

export default React.memo(NameDomainExpiryStatus);
