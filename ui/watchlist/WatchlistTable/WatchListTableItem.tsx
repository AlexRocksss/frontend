import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React, { useCallback, useState } from 'react';

import type { WatchlistAddress } from 'types/api/account';

import useApiFetch from 'lib/api/useApiFetch';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Switch } from 'toolkit/chakra/switch';
import { TableCell, TableRow } from 'toolkit/chakra/table';
import { Tag } from 'toolkit/chakra/tag';
import { toaster } from 'toolkit/chakra/toaster';
import TableItemActionButtons from 'ui/shared/TableItemActionButtons';

import WatchListAddressItem from './WatchListAddressItem';

interface Props {
  item: WatchlistAddress;
  isLoading?: boolean;
  onEditClick: (data: WatchlistAddress) => void;
  onDeleteClick: (data: WatchlistAddress) => void;
  hasEmail: boolean;
}

const WatchListTableItem = ({ item, isLoading, onEditClick, onDeleteClick, hasEmail }: Props) => {
  const { t } = useTranslation();
  const [ notificationEnabled, setNotificationEnabled ] = useState(item.notification_methods.email);
  const [ switchDisabled, setSwitchDisabled ] = useState(false);
  const onItemEditClick = useCallback(() => {
    return onEditClick(item);
  }, [ item, onEditClick ]);

  const onItemDeleteClick = useCallback(() => {
    return onDeleteClick(item);
  }, [ item, onDeleteClick ]);

  const apiFetch = useApiFetch();

  const showErrorToast = useCallback(() => {
    toaster.error({
      title: 'Error',
      description: t('watchlist.errorRequest'),
    });
  }, [ t ]);

  const showNotificationToast = useCallback((isOn: boolean) => {
    toaster.success({
      title: 'Success',
      description: isOn ? t('watchlist.notificationOn') : t('watchlist.notificationOff'),
    });
  }, [ t ]);

  const { mutate } = useMutation<WatchlistAddress>({
    mutationFn: () => {
      setSwitchDisabled(true);
      const body = { ...item, notification_methods: { email: !notificationEnabled } };
      setNotificationEnabled(prevState => !prevState);
      return apiFetch('general:watchlist', {
        pathParams: { id: String(item.id) },
        fetchParams: { method: 'PUT', body },
      }) as Promise<WatchlistAddress>;
    },
    onError: () => {
      showErrorToast();
      setNotificationEnabled(prevState => !prevState);
      setSwitchDisabled(false);
    },
    onSuccess: (data) => {
      setSwitchDisabled(false);
      showNotificationToast(data.notification_methods.email);
    },
  });

  const onSwitch = useCallback(() => {
    return mutate();
  }, [ mutate ]);

  return (
    <TableRow alignItems="top" key={ item.address_hash }>
      <TableCell><WatchListAddressItem item={ item } isLoading={ isLoading }/></TableCell>
      <TableCell>
        <Tag loading={ isLoading } truncated>{ item.name }</Tag>
      </TableCell>
      <TableCell>
        <Skeleton loading={ isLoading } display="inline-block">
          <Switch
            checked={ notificationEnabled }
            onCheckedChange={ onSwitch }
            disabled={ !hasEmail || switchDisabled }
            aria-label={ t('watchlist.emailNotificationHeader') }
          />
        </Skeleton>
      </TableCell>
      <TableCell>
        <TableItemActionButtons onDeleteClick={ onItemDeleteClick } onEditClick={ onItemEditClick } isLoading={ isLoading }/>
      </TableCell>
    </TableRow>
  );
};

export default WatchListTableItem;
