import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { DialogBody, DialogContent, DialogRoot, DialogHeader } from 'toolkit/chakra/dialog';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const RewardsTaskDetailsModal = ({ isOpen, onClose, title, children }: Props) => {
  const { t } = useTranslation();
  const handleOpenChange = React.useCallback(({ open }: { open: boolean }) => {
    if (!open) {
      onClose();
    }
  }, [ onClose ]);

  return (
    <DialogRoot
      open={ isOpen }
      onOpenChange={ handleOpenChange }
      size={{ lgDown: 'full', lg: 'sm' }}
    >
      <DialogContent>
        <DialogHeader>
          { title }
        </DialogHeader>
        <DialogBody>
          <Text>{ children }</Text>
          <Text textStyle="sm" color="text.secondary" mt={ 3 }>
            { t('rewards.taskDetailsNote') }
          </Text>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default RewardsTaskDetailsModal;
