import { chakra, Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { route } from 'nextjs-routes';

import { Link } from 'toolkit/chakra/link';

interface Props {
  blockHeight: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  isMultichain?: boolean;
}

const SearchBarSuggestBlockCountdown = ({ blockHeight, onClick, className, isMultichain }: Props) => {
  const { t } = useTranslation();

  if (isMultichain) {
    return (
      <Box className={ className }>
        { t('searchBar.blockNotCreated') } <Link href={ route({ pathname: '/blocks' }) } onClick={ onClick }>{ t('searchBar.viewExistingBlocks') }</Link>.
      </Box>
    );
  }

  return (
    <Box className={ className }>
      <span>{ t('searchBar.learnEstimatedTime_pre') } </span>
      <Link href={ route({ pathname: '/block/countdown/[height]', query: { height: blockHeight } }) } onClick={ onClick }>
        { t('searchBar.learnEstimatedTime_link') }
      </Link>
      <span> { t('searchBar.learnEstimatedTime_post') }</span>
    </Box>
  );
};

export default React.memo(chakra(SearchBarSuggestBlockCountdown));
