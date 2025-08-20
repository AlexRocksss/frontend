import { Heading } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import useHasAccount from 'lib/hooks/useHasAccount';
import LatestDeposits from 'ui/home/LatestDeposits';
import LatestTxs from 'ui/home/LatestTxs';
import LatestWatchlistTxs from 'ui/home/LatestWatchlistTxs';
import TabsWithScroll from 'ui/shared/Tabs/TabsWithScroll';
import { useTranslations } from 'next-intl';
const rollupFeature = config.features.rollup;

const TAB_LIST_PROPS = {
  mb: { base: 3, lg: 3 },
};

const TransactionsHome = () => {
  const t = useTranslations();
  const hasAccount = useHasAccount();
  if ((rollupFeature.isEnabled && rollupFeature.type === 'optimistic') || hasAccount) {
    const tabs = [
      { id: 'txn', title: t('Latest txn'), component: <LatestTxs/> },
      rollupFeature.isEnabled && rollupFeature.type === 'optimistic' && { id: 'deposits', title: t('Deposits (L1→L2 txn)'), component: <LatestDeposits/> },
      hasAccount && { id: 'watchlist', title: 'Watch list', component: <LatestWatchlistTxs/> },
    ].filter(Boolean);
    return (
      <>
        <Heading as="h4" size="sm" mb={ 3 }>{t('Transactions')}</Heading>
        <TabsWithScroll tabs={ tabs } lazyBehavior="keepMounted" tabListProps={ TAB_LIST_PROPS }/>
      </>
    );
  }

  return (
    <>
      <Heading as="h4" size="sm" mb={ 3 }>{t('Latest transactions')}</Heading>
      <LatestTxs/>
    </>
  );
};

export default TransactionsHome;
