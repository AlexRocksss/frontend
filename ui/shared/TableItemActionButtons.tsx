import { HStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import usePreventFocusAfterModalClosing from 'lib/hooks/usePreventFocusAfterModalClosing';
import { IconButton } from 'toolkit/chakra/icon-button';
import { Tooltip } from 'toolkit/chakra/tooltip';
import IconSvg from 'ui/shared/IconSvg';

type Props = {
  onEditClick: () => void;
  onDeleteClick: () => void;
  isLoading?: boolean;
};

const TableItemActionButtons = ({ onEditClick, onDeleteClick, isLoading }: Props) => {
  const { t } = useTranslation();
  const onFocusCapture = usePreventFocusAfterModalClosing();

  return (
    <HStack gap={ 6 } alignSelf="flex-end">
      <Tooltip content={ t('action.edit') } disableOnMobile>
        <IconButton
          aria-label={ t('action.edit') }
          variant="link"
          size="2xs"
          onClick={ onEditClick }
          onFocusCapture={ onFocusCapture }
          loadingSkeleton={ isLoading }
          borderRadius="none"
        >
          <IconSvg name="edit"/>
        </IconButton>
      </Tooltip>
      <Tooltip content={ t('action.delete') } disableOnMobile>
        <IconButton
          aria-label={ t('action.delete') }
          variant="link"
          size="2xs"
          onClick={ onDeleteClick }
          onFocusCapture={ onFocusCapture }
          loadingSkeleton={ isLoading }
          borderRadius="none"
        >
          <IconSvg name="delete"/>
        </IconButton>
      </Tooltip>
    </HStack>
  );
};

export default React.memo(TableItemActionButtons);
