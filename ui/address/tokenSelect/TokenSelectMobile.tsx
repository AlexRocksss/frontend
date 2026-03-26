import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormattedData } from './types';

import { DialogBody, DialogContent, DialogHeader, DialogRoot, DialogTrigger } from 'toolkit/chakra/dialog';
import { useDisclosure } from 'toolkit/hooks/useDisclosure';

import TokenSelectButton from './TokenSelectButton';
import TokenSelectMenu from './TokenSelectMenu';
import useTokenSelect from './useTokenSelect';

interface Props {
  data: FormattedData;
  isLoading?: boolean;
}

const TokenSelectMobile = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  const { open, onOpenChange } = useDisclosure();
  const result = useTokenSelect(data);

  return (
    <DialogRoot open={ open } onOpenChange={ onOpenChange } size="full">
      <DialogTrigger asChild>
        <TokenSelectButton isOpen={ open } data={ result.data } isLoading={ isLoading }/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>{ t('address.tokensDialogHeader') }</DialogHeader>
        <DialogBody>
          <TokenSelectMenu { ...result }/>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default React.memo(TokenSelectMobile);
