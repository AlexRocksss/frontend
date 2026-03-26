import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React, { useCallback } from 'react';

import type { WatchlistAddress } from 'types/api/account';

import useApiFetch from 'lib/api/useApiFetch';
import useIsMobile from 'lib/hooks/useIsMobile';
import DeleteModal from 'ui/shared/DeleteModal';

type Props = {
  open: boolean;
  onOpenChange: ({ open }: { open: boolean }) => void;
  onSuccess: () => Promise<void>;
  data: Pick<WatchlistAddress, 'address_hash' | 'id'>;
};

const DeleteAddressModal: React.FC<Props> = ({ open, onOpenChange, onSuccess, data }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const apiFetch = useApiFetch();

  const mutationFn = useCallback(() => {
    return apiFetch('general:watchlist', {
      pathParams: { id: String(data.id) },
      fetchParams: { method: 'DELETE' },
    });
  }, [ data?.id, apiFetch ]);

  const address = data?.address_hash;

  const renderModalContent = useCallback(() => {
    const addressString = isMobile ? [ address.slice(0, 4), address.slice(-4) ].join('...') : address;
    return (
      <Text>
        { t('watchlist.deleteAddressTextBefore') }
        <Text fontWeight="700" as="span"> { addressString || 'address' }</Text>
        { ' ' }{ t('watchlist.deleteAddressTextAfter') }
      </Text>
    );
  }, [ address, isMobile, t ]);

  return (
    <DeleteModal
      open={ open }
      onOpenChange={ onOpenChange }
      title={ t('watchlist.removeAddressTitle') }
      renderContent={ renderModalContent }
      mutationFn={ mutationFn }
      onSuccess={ onSuccess }
    />
  );
};

export default DeleteAddressModal;
