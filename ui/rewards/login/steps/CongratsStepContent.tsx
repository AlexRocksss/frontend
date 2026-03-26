import { Text, Box, Flex, Center } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { route } from 'nextjs-routes';

import { useRewardsContext } from 'lib/contexts/rewards';
import { Button } from 'toolkit/chakra/button';
import { Skeleton } from 'toolkit/chakra/skeleton';
import IconSvg from 'ui/shared/IconSvg';

import MeritsIcon from '../../MeritsIcon';
import RewardsReadOnlyInputWithCopy from '../../RewardsReadOnlyInputWithCopy';

type Props = {
  isReferral: boolean;
  customReferralReward: string | undefined;
};

const CongratsStepContent = ({ isReferral, customReferralReward }: Props) => {
  const { t } = useTranslation();
  const { referralsQuery, rewardsConfigQuery } = useRewardsContext();

  const registrationReward = Number(rewardsConfigQuery.data?.rewards?.registration);
  const registrationWithReferralReward = customReferralReward ?
    Number(customReferralReward) + registrationReward :
    Number(rewardsConfigQuery.data?.rewards?.registration_with_referral);
  const referralReward = registrationWithReferralReward - registrationReward;

  const refLink = referralsQuery.data?.link || 'N/A';
  const shareText = `I joined the @blockscout Merits Program and got my first ${ registrationReward || 'N/A' } #Merits! Use this link for a sign-up bonus and start earning rewards with @blockscout block explorer.\n\n${ refLink }`; // eslint-disable-line max-len

  const textColor = { _light: 'blue.700', _dark: 'blue.100' };

  return (
    <>
      <Flex
        alignItems="center"
        background={{ _light: 'linear-gradient(254.96deg, #9CD8FF 9.09%, #D0EFFF 88.45%)', _dark: 'linear-gradient(255deg, #1B253B 9.09%, #222C3F 88.45%)' }}
        borderRadius="md"
        p={ 2 }
        pl={{ base: isReferral ? 4 : 8, md: 8 }}
        mb={ 8 }
        h="90px"
      >
        <MeritsIcon boxSize={{ base: isReferral ? 8 : 12, md: 12 }} mr={{ base: isReferral ? 1 : 2, md: 2 }}/>
        <Skeleton loading={ rewardsConfigQuery.isLoading }>
          <Text fontSize={{ base: isReferral ? '24px' : '30px', md: '30px' }} fontWeight="700" color={ textColor }>
            +{ (isReferral ? registrationWithReferralReward : registrationReward) || 'N/A' }
          </Text>
        </Skeleton>
        { isReferral && (
          <Flex alignItems="center" h="56px">
            <Box w="1px" h="full" bgColor={{ _light: 'whiteAlpha.800', _dark: 'whiteAlpha.100' }} mx={{ base: 3, md: 8 }}/>
            <Flex flexDirection="column" justifyContent="space-between" gap={ 2 }>
              { [
                {
                  title: t('rewards.congratsRegistrationTitle'),
                  value: registrationReward || 'N/A',
                },
                {
                  title: t('rewards.congratsReferralTitle'),
                  value: referralReward || 'N/A',
                },
              ].map(({ title, value }) => (
                <Flex key={ title } alignItems="center" gap={{ base: 1, md: 2 }}>
                  <MeritsIcon boxSize={{ base: 5, md: 6 }}/>
                  <Skeleton loading={ rewardsConfigQuery.isLoading }>
                    <Text fontSize="sm" fontWeight="700" color={ textColor }>
                      +{ value }
                    </Text>
                  </Skeleton>
                  <Text fontSize="sm" color={ textColor }>
                    { title }
                  </Text>
                </Flex>
              )) }
            </Flex>
          </Flex>
        ) }
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" px={ 3 } mb={ 8 }>
        <Flex alignItems="center" gap={ 2 }>
          <Center
            boxSize={ 8 }
            borderRadius="8px"
            color={{ _light: 'blue.500', _dark: 'blue.100' }}
            bgColor={{ _light: 'blue.50', _dark: 'blue.800' }}
          >
            <IconSvg name="profile" boxSize={ 5 }/>
          </Center>
          <Text fontSize="lg" fontWeight="500">
            { t('rewards.congratsReferralHeading') }
          </Text>
        </Flex>
        <Text fontSize="md" mt={ 2 }>
          { t('rewards.congratsReceiveBonus', {
            share: rewardsConfigQuery.data?.rewards?.referral_share ?
              Number(rewardsConfigQuery.data.rewards.referral_share) * 100 :
              'N/A',
          }) }
        </Text>
        <RewardsReadOnlyInputWithCopy
          label={ t('rewards.congratsReferralLink') }
          value={ refLink }
          isLoading={ referralsQuery.isLoading }
          mt={ 3 }
          w="100%"
        />
        <Skeleton loading={ referralsQuery.isLoading } mt={ 6 }>
          <Button asChild>
            <a href={ `https://x.com/intent/tweet?text=${ encodeURIComponent(shareText) }` } target="_blank" rel="noopener noreferrer">
              { t('rewards.congratsShareOn') } <IconSvg name="social/twitter" boxSize={ 6 } ml={ 1 }/>
            </a>
          </Button>
        </Skeleton>
      </Flex>
      <Flex flexDirection="column" alignItems="flex-start" px={ 3 }>
        <Flex alignItems="center" gap={ 2 }>
          <Center
            boxSize={ 8 }
            borderRadius="8px"
            color={{ _light: 'blue.500', _dark: 'blue.100' }}
            bgColor={{ _light: 'blue.50', _dark: 'blue.800' }}
          >
            { /* FIXME use non-navigation icon */ }
            <IconSvg name="navigation/stats" boxSize={ 6 }/>
          </Center>
          <Text fontSize="lg" fontWeight="500">
            { t('rewards.congratsDashboardHeading') }
          </Text>
        </Flex>
        <Text fontSize="md" mt={ 2 }>
          { t('rewards.congratsDashboardText') }
        </Text>
        <Button asChild mt={ 3 }>
          <a href={ route({ pathname: '/account/merits' }) }>{ t('rewards.congratsOpen') }</a>
        </Button>
      </Flex>
    </>
  );
};

export default CongratsStepContent;
