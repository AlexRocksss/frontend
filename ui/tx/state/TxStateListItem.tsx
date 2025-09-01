import React from 'react';

import type { TxStateChange } from 'types/api/txStateChanges';

import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import ListItemMobileGrid from 'ui/shared/ListItemMobile/ListItemMobileGrid';

import { getStateElements } from './utils';

interface Props {
  data: TxStateChange;
  isLoading?: boolean;
}

const TxStateListItem = ({ data, isLoading }: Props) => {

  const { before, after, change, tag, tokenId } = getStateElements(data, isLoading);

  const storedLocale = localStorage.getItem("NEXT_LOCALE") || "en";
  const enMessage = {
    "Address": "Address",
    "Before": "Before",
    "After": "After",
    "Change": "Change",
    "Token ID": "Token ID"
  }
  const zhMessage = {
    "Address": "地址",
    "Before": "之前",
    "After": "之后",
    "Change": "变更",
    "Token ID": "代币 ID"
  }
  const localeMessage = storedLocale == "en" ? enMessage : zhMessage ;

  return (
    <ListItemMobileGrid.Container>

      <ListItemMobileGrid.Label isLoading={ isLoading }>{ localeMessage["Address"] }</ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value py="3px" display="flex" flexWrap="nowrap" columnGap={ 3 }>
        <AddressEntity
          address={ data.address }
          isLoading={ isLoading }
          truncation="constant"
        />
        { tag }
      </ListItemMobileGrid.Value>

      { before && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>{ localeMessage["Before"] }</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>{ before }</ListItemMobileGrid.Value>
        </>
      ) }

      { after && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>{ localeMessage["After"] }</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>{ after }</ListItemMobileGrid.Value>
        </>
      ) }

      { change && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>{ localeMessage["Change"] }</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>{ change }</ListItemMobileGrid.Value>
        </>
      ) }

      { tokenId && (
        <>
          <ListItemMobileGrid.Label isLoading={ isLoading }>{ localeMessage["Token ID"] }</ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value py="0">{ tokenId }</ListItemMobileGrid.Value>
        </>
      ) }

    </ListItemMobileGrid.Container>
  );
};

export default TxStateListItem;
