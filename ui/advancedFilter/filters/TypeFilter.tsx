import { Flex } from '@chakra-ui/react';
import { isEqual, without } from 'es-toolkit';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { AdvancedFilterParams, AdvancedFilterType } from 'types/api/advancedFilter';

import { useMultichainContext } from 'lib/contexts/multichain';
import { Checkbox, CheckboxGroup } from 'toolkit/chakra/checkbox';
import TableColumnFilter from 'ui/shared/filters/TableColumnFilter';

import { getAdvancedFilterTypes } from '../constants';

const RESET_VALUE = 'all';

const FILTER_PARAM = 'transaction_types';

type Props = {
  value?: Array<AdvancedFilterType | typeof RESET_VALUE>;
  handleFilterChange: (filed: keyof AdvancedFilterParams, value: Array<AdvancedFilterType>) => void;
};

const TypeFilter = ({ value = [ RESET_VALUE ], handleFilterChange }: Props) => {
  const { t } = useTranslation();
  const [ currentValue, setCurrentValue ] = React.useState<Array<AdvancedFilterType | typeof RESET_VALUE>>([ ...value ]);

  const multichainContext = useMultichainContext();

  const handleChange = React.useCallback((value: Array<string>) => {
    setCurrentValue((prev) => {
      if (value.length === 0) {
        return [ RESET_VALUE ];
      }

      const diff = value.filter(item => !prev.includes(item));
      if (diff.includes(RESET_VALUE)) {
        return [ RESET_VALUE ];
      }

      return without(value as Array<AdvancedFilterType>, RESET_VALUE);
    });
  }, []);

  const onReset = React.useCallback(() => setCurrentValue([ RESET_VALUE ]), []);

  const onFilter = React.useCallback(() => {
    const value: Array<AdvancedFilterType> = currentValue.filter(item => item !== RESET_VALUE) as Array<AdvancedFilterType>;
    handleFilterChange(FILTER_PARAM, value);
  }, [ handleFilterChange, currentValue ]);

  const typeNameOverrides = React.useMemo<Partial<Record<string, string>>>(() => ({
    all: t('advancedFilter.filterTypeAll'),
    coin_transfer: t('advancedFilter.filterTypeCoinTransfer'),
    contract_creation: t('advancedFilter.filterTypeContractCreation'),
    contract_interaction: t('advancedFilter.filterTypeContractInteraction'),
  }), [ t ]);

  const advancedFilterTypes = React.useMemo(() => {
    return getAdvancedFilterTypes(multichainContext?.chain?.app_config, true).map(type => ({
      ...type,
      name: typeNameOverrides[type.id] ?? type.name,
    }));
  }, [ multichainContext?.chain?.app_config, typeNameOverrides ]);

  return (
    <TableColumnFilter
      title={ t('advancedFilter.filterType') }
      isFilled={ !(currentValue.length === 1 && currentValue[0] === RESET_VALUE) }
      isTouched={ !isEqual(currentValue.sort(), value.sort()) }
      onFilter={ onFilter }
      onReset={ onReset }
      hasReset
    >
      <Flex display="flex" flexDir="column" rowGap={ 3 }>
        <CheckboxGroup value={ currentValue } onValueChange={ handleChange } orientation="vertical">
          { advancedFilterTypes.map(type => (
            <Checkbox
              key={ type.id }
              value={ type.id }
            >
              { type.name }
            </Checkbox>
          )) }
        </CheckboxGroup>
      </Flex>
    </TableColumnFilter>
  );
};

export default TypeFilter;
