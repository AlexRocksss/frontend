import { Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { route } from 'nextjs-routes';

import useIsMobile from 'lib/hooks/useIsMobile';
import { Button } from 'toolkit/chakra/button';
import { DialogBody, DialogContent, DialogFooter, DialogHeader, DialogRoot } from 'toolkit/chakra/dialog';
import { Link } from 'toolkit/chakra/link';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  appId: string;
};

const MarketplaceDisclaimerModal = ({ isOpen, onClose, appId }: Props) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const handleContinueClick = React.useCallback(() => {
    window.localStorage.setItem('marketplace-disclaimer-shown', 'true');
  }, [ ]);

  return (
    <DialogRoot
      open={ isOpen }
      onOpenChange={ onClose }
      size={ isMobile ? 'full' : 'md' }
    >
      <DialogContent>
        <DialogHeader>
          { t('marketplace.disclaimerHeader') }
        </DialogHeader>

        <DialogBody>
          <Text color={{ _light: 'gray.800', _dark: 'whiteAlpha.800' }}>
            { t('marketplace.disclaimerBody') }
            <br/><br/>
            { t('marketplace.disclaimerAgree') }
          </Text>
        </DialogBody>

        <DialogFooter
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Link href={ route({ pathname: '/apps/[id]', query: { id: appId } }) } asChild>
            <Button onClick={ handleContinueClick } >
              { t('marketplace.continueToApp') }
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={ onClose }
          >
            { t('marketplace.cancel') }
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default MarketplaceDisclaimerModal;
