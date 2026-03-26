import { useTranslation } from 'next-i18next';
import React from 'react';

import useAccount from 'lib/web3/useAccount';
import { Button } from 'toolkit/chakra/button';
import { Tooltip } from 'toolkit/chakra/tooltip';

interface Props {
  onClick: (address: string) => void;
  isDisabled?: boolean;
}

const ContractMethodAddressButton = ({ onClick, isDisabled }: Props) => {
  const { t } = useTranslation();
  const { address } = useAccount();

  const handleClick = React.useCallback(() => {
    address && onClick(address);
  }, [ address, onClick ]);

  return (
    <Tooltip content={ t('address.connectWalletTooltip') } disabled={ Boolean(address) } disableOnMobile>
      <Button
        variant="subtle"
        size="xs"
        textStyle="md"
        fontWeight={ 500 }
        ml={ 1 }
        onClick={ handleClick }
        disabled={ isDisabled || !address }
      >
        Self
      </Button>
    </Tooltip>
  );
};

export default React.memo(ContractMethodAddressButton);
