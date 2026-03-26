import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { capitalize } from 'es-toolkit';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { FheOperation } from 'types/api/fheOperations';

import { Badge } from 'toolkit/chakra/badge';
import { Skeleton } from 'toolkit/chakra/skeleton';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import ListItemMobile from 'ui/shared/ListItemMobile/ListItemMobile';
import { getTypeColor } from 'ui/tx/fheOperations/utils';

type Props = FheOperation & { isLoading?: boolean };

const TxFHEOperationsListItem = (props: Props) => {
  const { t } = useTranslation();
  const { log_index: logIndex, operation, type, fhe_type: fheType, is_scalar: isScalar, hcu_cost: hcuCost, hcu_depth: hcuDepth, caller, isLoading } = props;

  return (
    <ListItemMobile>
      <Flex gap={ 2 } flexWrap="wrap" alignItems="center">
        <Badge colorPalette={ getTypeColor(type) } loading={ isLoading }>
          { capitalize(type) }
        </Badge>
        <Badge colorPalette="gray" loading={ isLoading }>
          { fheType }
        </Badge>
        <Badge colorPalette="gray" loading={ isLoading }>
          { isScalar ? t('tx.scalarBadge') : t('tx.nonScalar') }
        </Badge>
      </Flex>

      <Grid templateColumns="110px 1fr" rowGap={ 2 } columnGap={ 2 }>
        <Text fontWeight="medium">{ t('tx.index') }</Text>
        <Skeleton loading={ isLoading } color="text.secondary">
          { logIndex }
        </Skeleton>

        <Text fontWeight="medium">{ t('tx.operation') }</Text>
        <Skeleton loading={ isLoading } color="text.secondary">
          { operation }
        </Skeleton>

        <Text fontWeight="medium">{ t('tx.hcuCost') }</Text>
        <Skeleton loading={ isLoading } color="text.secondary">
          { hcuCost.toLocaleString() }
        </Skeleton>

        <Text fontWeight="medium">{ t('tx.hcuDepth') }</Text>
        <Skeleton loading={ isLoading } color="text.secondary">
          { hcuDepth.toLocaleString() }
        </Skeleton>

        <Text fontWeight="medium">{ t('tx.caller') }</Text>
        <Box minW={ 0 }>
          { caller && caller.hash ? (
            <AddressEntity
              address={ caller }
              truncation="constant"
              isLoading={ isLoading }
            />
          ) : (
            <Text color="text.secondary">—</Text>
          ) }
        </Box>
      </Grid>
    </ListItemMobile>
  );
};

export default React.memo(TxFHEOperationsListItem);
