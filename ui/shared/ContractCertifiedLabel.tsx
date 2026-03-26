import { Flex, chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Tooltip } from 'toolkit/chakra/tooltip';

import IconSvg from './IconSvg';

type Props = {
  iconSize: number;
  className?: string;
};

const ContractCertifiedLabel = ({ iconSize, className }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip content={ t('contractLabel.certifiedTooltip') }>
      <Flex className={ className }>
        <IconSvg name="certified" color="green.500" boxSize={ iconSize } cursor="pointer"/>
      </Flex>
    </Tooltip>
  );
};

export default chakra(ContractCertifiedLabel);
