import { createListCollection } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Fields } from '../types';
import type { TokenInfoApplicationConfig } from 'types/api/account';

import { FormFieldSelect } from 'toolkit/components/forms/fields/FormFieldSelect';

interface Props {
  readOnly?: boolean;
  config: TokenInfoApplicationConfig['projectSectors'];
}

const TokenInfoFieldProjectSector = ({ readOnly, config }: Props) => {
  const { t } = useTranslation();

  const collection = React.useMemo(() => {
    const items = config.map((option) => ({ label: option, value: option }));
    return createListCollection({ items });
  }, [ config ]);

  return (
    <FormFieldSelect<Fields, 'project_sector'>
      name="project_sector"
      placeholder={ t('tokenInfo.projectIndustry') }
      collection={ collection }
      readOnly={ readOnly }
    />
  );
};

export default React.memo(TokenInfoFieldProjectSector);
