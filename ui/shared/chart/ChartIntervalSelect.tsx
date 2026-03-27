import { createListCollection } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { StatsInterval, StatsIntervalIds } from 'types/client/stats';

import type { SelectOption } from 'toolkit/chakra/select';
import { Select } from 'toolkit/chakra/select';
import { Skeleton } from 'toolkit/chakra/skeleton';
import type { TagProps } from 'toolkit/chakra/tag';
import TagGroupSelect from 'ui/shared/tagGroupSelect/TagGroupSelect';
import { STATS_INTERVALS } from 'ui/stats/constants';

type Props = {
  interval: StatsIntervalIds;
  onIntervalChange: (newInterval: StatsIntervalIds) => void;
  isLoading?: boolean;
  selectTagSize?: TagProps['size'];
};

const ChartIntervalSelect = ({ interval, onIntervalChange, isLoading, selectTagSize }: Props) => {
  const { t } = useTranslation();

  const intervalTitles = React.useMemo((): Record<StatsIntervalIds, { title: string; shortTitle: string }> => ({
    all: { title: t('stats.intervalAllTime'), shortTitle: t('stats.intervalAllTime') },
    oneMonth: { title: t('stats.interval1Month'), shortTitle: t('stats.interval1MonthShort') },
    threeMonths: { title: t('stats.interval3Months'), shortTitle: t('stats.interval3MonthsShort') },
    sixMonths: { title: t('stats.interval6Months'), shortTitle: t('stats.interval6MonthsShort') },
    oneYear: { title: t('stats.interval1Year'), shortTitle: t('stats.interval1YearShort') },
  }), [ t ]);

  const intervalCollection = React.useMemo(() => createListCollection<SelectOption>({
    items: (Object.keys(STATS_INTERVALS) as Array<StatsIntervalIds>).map((id) => ({
      value: id,
      label: intervalTitles[id].title,
    })),
  }), [ intervalTitles ]);

  const intervalListShort = React.useMemo(() => (Object.keys(STATS_INTERVALS) as Array<StatsIntervalIds>).map((id) => ({
    id,
    title: intervalTitles[id].shortTitle,
  })) as Array<StatsInterval>, [ intervalTitles ]);

  const handleItemSelect = React.useCallback(({ value }: { value: Array<string> }) => {
    onIntervalChange(value[0] as StatsIntervalIds);
  }, [ onIntervalChange ]);

  return (
    <>
      <Skeleton hideBelow="lg" borderRadius="base" loading={ isLoading }>
        <TagGroupSelect<StatsIntervalIds> items={ intervalListShort } onChange={ onIntervalChange } value={ interval } tagSize={ selectTagSize }/>
      </Skeleton>
      <Select
        collection={ intervalCollection }
        placeholder={ t('placeholder.selectInterval') }
        defaultValue={ [ interval ] }
        onValueChange={ handleItemSelect }
        hideFrom="lg"
        w="100%"
        loading={ isLoading }
      />
    </>
  );
};

export default React.memo(ChartIntervalSelect);
