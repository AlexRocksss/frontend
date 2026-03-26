import { chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { CsvExportParams } from 'types/client/address';
import type { ClusterChainConfig } from 'types/multichain';

import { route } from 'nextjs/routes';

import config from 'configs/app';
import { useMultichainContext } from 'lib/contexts/multichain';
import useIsInitialLoading from 'lib/hooks/useIsInitialLoading';
import useIsMobile from 'lib/hooks/useIsMobile';
import { Link } from 'toolkit/chakra/link';
import { Tooltip } from 'toolkit/chakra/tooltip';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  address: string;
  params: CsvExportParams;
  className?: string;
  isLoading?: boolean;
  chainData?: ClusterChainConfig;
}

const AddressCsvExportLink = ({ className, address, params, isLoading, chainData }: Props) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const isInitialLoading = useIsInitialLoading(isLoading);
  const multichainContext = useMultichainContext();

  const chainConfig = chainData?.app_config || multichainContext?.chain.app_config || config;

  if (!chainConfig.features.csvExport.isEnabled) {
    return null;
  }

  return (
    <Tooltip disabled={ !isMobile } content={ t('address.csvExportTooltip') }>
      <Link
        className={ className }
        whiteSpace="nowrap"
        href={ route({ pathname: '/csv-export', query: { ...params, address } }, { chain: chainData ?? multichainContext?.chain }) }
        flexShrink={ 0 }
        loading={ isInitialLoading }
        minW={ 8 }
        justifyContent="center"
        textStyle="sm"
      >
        <IconSvg name="files/csv" boxSize={ 5 }/>
        <chakra.span ml={ 1 } hideBelow="lg">{ t('address.csvExportDownload') }</chakra.span>
      </Link>
    </Tooltip>
  );
};

export default React.memo(chakra(AddressCsvExportLink));
