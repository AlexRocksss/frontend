import { Box, chakra } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Link } from 'toolkit/chakra/link';

interface Props {
  className?: string;
}

const AdminSupportText = ({ className }: Props) => {
  const { t } = useTranslation();

  return (
    <Box className={ className }>
      <span>{ t('adminSupport.needHelp') }</span>
      <Link href="mailto:help@blockscout.com">help@blockscout.com</Link>
      <span>{ t('adminSupport.forAssistance') }</span>
    </Box>
  );
};

export default chakra(AdminSupportText);
