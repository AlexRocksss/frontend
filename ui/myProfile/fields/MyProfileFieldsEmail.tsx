import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FormFields } from '../types';

import { FormFieldEmail } from 'toolkit/components/forms/fields/FormFieldEmail';
import IconSvg from 'ui/shared/IconSvg';

interface Props {
  isReadOnly?: boolean;
  defaultValue: string | undefined;
}

const MyProfileFieldsEmail = ({ isReadOnly, defaultValue }: Props) => {
  const { t } = useTranslation();

  return (
    <FormFieldEmail<FormFields>
      name="email"
      placeholder={ t('myProfile.emailPlaceholder') }
      required
      readOnly={ isReadOnly }
      helperText={ t('myProfile.emailHelperText') }
      group={{
        endElement: ({ field }) => {
          const isVerified = defaultValue && field.value === defaultValue;
          return isVerified ? <IconSvg name="certified" boxSize={ 5 } color="green.500" mx={ 5 }/> : null;
        },
      }}
    />
  );
};

export default React.memo(MyProfileFieldsEmail);
