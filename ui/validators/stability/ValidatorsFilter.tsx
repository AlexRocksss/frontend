import { createListCollection } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { ValidatorsStabilityFilters } from 'types/api/validators';

import PopoverFilterRadio from 'ui/shared/filters/PopoverFilterRadio';

const DEFAULT_VALUE = 'all';

interface Props {
  hasActiveFilter: boolean;
  defaultValue: ValidatorsStabilityFilters['state_filter'] | undefined;
  onChange: (nextValue: string | Array<string>) => void;
}

const ValidatorsFilter = ({ onChange, defaultValue, hasActiveFilter }: Props) => {
  const { t } = useTranslation();

  const collection = React.useMemo(() => createListCollection({
    items: [
      { value: 'all', label: t('validators.filterAll') },
      { value: 'active', label: t('validators.filterActive') },
      { value: 'probation', label: t('validators.filterProbation') },
      { value: 'inactive', label: t('validators.filterInactive') },
    ],
  }), [ t ]);

  return (
    <PopoverFilterRadio
      name="validators_filter"
      collection={ collection }
      onChange={ onChange }
      hasActiveFilter={ hasActiveFilter }
      initialValue={ defaultValue || DEFAULT_VALUE }
    />
  );
};

export default React.memo(ValidatorsFilter);
