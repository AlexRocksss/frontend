import { Box } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { CeloEpochDetails } from 'types/api/epochs';

import { Heading } from 'toolkit/chakra/heading';
import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';

import EpochElectionRewardsListItem from './EpochElectionRewardsListItem';
import EpochElectionRewardsTableItem from './EpochElectionRewardsTableItem';

interface Props {
  data: CeloEpochDetails;
  isLoading?: boolean;
}

const EpochElectionRewards = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();
  if (!data.aggregated_election_rewards) {
    return null;
  }

  return (
    <Box mt={ 6 }>
      <Heading level="3" mb={ 3 }>{ t('epochs.electionRewards') }</Heading>
      <Box hideBelow="lg">
        <TableRoot style={{ tableLayout: 'auto' }}>
          <TableHeaderSticky>
            <TableRow>
              <TableColumnHeader width="24px"/>
              <TableColumnHeader width="180px">{ t('epochs.rewardType') }</TableColumnHeader>
              <TableColumnHeader/>
              <TableColumnHeader isNumeric>{ t('epochs.value') }</TableColumnHeader>
            </TableRow>
          </TableHeaderSticky>
          <TableBody>
            { Object.entries(data.aggregated_election_rewards).map((entry) => {
              const key = entry[0] as keyof CeloEpochDetails['aggregated_election_rewards'];
              const value = entry[1];

              if (!value) {
                return null;
              }

              return (
                <EpochElectionRewardsTableItem
                  key={ key }
                  type={ key }
                  isLoading={ isLoading }
                  data={ value }
                />
              );
            }) }
          </TableBody>
        </TableRoot>
      </Box>
      <Box hideFrom="lg">
        { Object.entries(data.aggregated_election_rewards).map((entry) => {
          const key = entry[0] as keyof CeloEpochDetails['aggregated_election_rewards'];
          const value = entry[1];

          if (!value) {
            return null;
          }

          return (
            <EpochElectionRewardsListItem
              key={ key }
              type={ key }
              isLoading={ isLoading }
              data={ value }
            />
          );
        }) }
      </Box>
    </Box>
  );
};

export default React.memo(EpochElectionRewards);
