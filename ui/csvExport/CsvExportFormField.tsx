import { useTranslation } from 'next-i18next';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';

import type { FormFields } from './types';

import dayjs from 'lib/date/dayjs';
import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';

interface Props {
  formApi: UseFormReturn<FormFields>;
  name: 'from' | 'to';
}

const CsvExportFormField = ({ formApi, name }: Props) => {
  const { t } = useTranslation();
  const { formState, getValues, trigger } = formApi;

  const validate = React.useCallback((newValue: string) => {
    if (name === 'from') {
      const toValue = getValues('to');
      if (toValue && dayjs(newValue) > dayjs(toValue)) {
        return t('csvExport.incorrectDate');
      }
      if (formState.errors.to) {
        trigger('to');
      }
    } else {
      const fromValue = getValues('from');
      if (fromValue && dayjs(fromValue) > dayjs(newValue)) {
        return t('csvExport.incorrectDate');
      }
      if (formState.errors.from) {
        trigger('from');
      }
    }
  }, [ formState.errors.from, formState.errors.to, getValues, name, trigger, t ]);

  return (
    <FormFieldText<FormFields, typeof name>
      name={ name }
      inputProps={{ type: 'datetime-local', max: dayjs().format('YYYY-MM-DDTHH:mm') }}
      placeholder={ name === 'from' ? t('csvExport.from') : t('csvExport.to') }
      required
      rules={{ validate }}
      maxW={{ base: 'auto', lg: '220px' }}
    />
  );
};

export default React.memo(CsvExportFormField);
