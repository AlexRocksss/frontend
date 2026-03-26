import { Grid } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';

import config from 'configs/app';

import RewardsDashboardInfoCard from '../RewardsDashboardInfoCard';

export default function ResourcesTab() {
  const { t } = useTranslation();

  return (
    <Grid
      w="full"
      gap={ 6 }
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
    >
      <RewardsDashboardInfoCard
        title={ t('rewards.badgesTitle') }
        description={ t('rewards.badgesDescription') }
        imageSrc="/static/merits/badges.svg"
        imageWidth="180px"
        imageHeight="86px"
        linkText={ t('rewards.badgesLink') }
        linkHref={ `https://merits.blockscout.com/?tab=badges&utm_source=${ config.chain.id }&utm_medium=badges` }
      />
      <RewardsDashboardInfoCard
        title={ t('rewards.campaignsTitle') }
        description={ t('rewards.campaignsDescription') }
        imageSrc="/static/merits/campaigns.svg"
        imageWidth="180px"
        imageHeight="76px"
        linkText={ t('rewards.campaignsLink') }
        linkHref={ `https://merits.blockscout.com/?tab=campaigns&utm_source=${ config.chain.id }&utm_medium=campaigns` }
      />
      <RewardsDashboardInfoCard
        title={ t('rewards.spendTitle') }
        description={ t('rewards.spendDescription') }
        imageSrc="/static/merits/offers.svg"
        imageWidth="180px"
        imageHeight="86px"
        linkText={ t('rewards.spendLink') }
        linkHref={ `https://merits.blockscout.com/?tab=spend&utm_source=${ config.chain.id }&utm_medium=spend` }
      />
    </Grid>
  );
}
