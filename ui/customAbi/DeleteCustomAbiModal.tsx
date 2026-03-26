import { Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React, { useCallback } from 'react';

import type { CustomAbi, CustomAbis } from 'types/api/account';

import { resourceKey } from 'lib/api/resources';
import useApiFetch from 'lib/api/useApiFetch';
import DeleteModal from 'ui/shared/DeleteModal';

type Props = {
  open: boolean;
  onOpenChange: ({ open }: { open: boolean }) => void;
  data: CustomAbi;
};

const DeleteCustomAbiModal: React.FC<Props> = ({ open, onOpenChange, data }) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const apiFetch = useApiFetch();

  const mutationFn = useCallback(() => {
    return apiFetch('general:custom_abi', {
      pathParams: { id: String(data.id) },
      fetchParams: { method: 'DELETE' },
    });
  }, [ apiFetch, data.id ]);

  const onSuccess = useCallback(async() => {
    queryClient.setQueryData([ resourceKey('general:custom_abi') ], (prevData: CustomAbis | undefined) => {
      return prevData?.filter((item) => item.id !== data.id);
    });
  }, [ data, queryClient ]);

  const renderText = useCallback(() => {
    return (
      <Text>
        { t('customAbi.deleteTextBefore') }
        <Text fontWeight="700" as="span">{ ` "${ data.name || 'name' }" ` }</Text>
        { t('customAbi.deleteTextAfter') }
      </Text>
    );
  }, [ data.name, t ]);

  return (
    <DeleteModal
      open={ open }
      onOpenChange={ onOpenChange }
      title={ t('customAbi.removeTitle') }
      renderContent={ renderText }
      mutationFn={ mutationFn }
      onSuccess={ onSuccess }
    />
  );
};

export default React.memo(DeleteCustomAbiModal);
