import { useTranslation } from 'next-i18next';
import React from 'react';

import { CollapsibleList } from 'toolkit/chakra/collapsible';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';

interface Props {
  items: Array<string>;
}

const TxAllowedPeekers = ({ items }: Props) => {
  const { t } = useTranslation();
  const renderItem = React.useCallback((item: string) => {
    return <AddressEntity key={ item } address={{ hash: item, is_contract: true }}/>;
  }, []);

  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('tx.hintAllowedPeekers') }
      >
        { t('tx.allowedPeekers') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <CollapsibleList
          items={ items }
          renderItem={ renderItem }
          cutLength={ 2 }
          rowGap={ 3 }
        />
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(TxAllowedPeekers);
