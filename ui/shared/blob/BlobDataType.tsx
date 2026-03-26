import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import * as blobUtils from 'lib/blob';
import { Skeleton } from 'toolkit/chakra/skeleton';
import type { IconName } from 'ui/shared/IconSvg';
import IconSvg from 'ui/shared/IconSvg';
interface Props {
  data: string;
  isLoading?: boolean;
}

const BlobDataType = ({ data, isLoading }: Props) => {
  const { t } = useTranslation();

  const TYPES: Record<string, { iconName: IconName; label: string }> = {
    image: { iconName: 'blobs/image', label: t('blobDataType.image') },
    text: { iconName: 'blobs/text', label: t('blobDataType.text') },
    raw: { iconName: 'blobs/raw', label: t('blobDataType.raw') },
  };
  const guessedType = React.useMemo(() => {
    if (isLoading) {
      return;
    }
    return blobUtils.guessDataType(data);
  }, [ data, isLoading ]);

  const { iconName, label } = (() => {
    if (guessedType?.mime?.startsWith('image/')) {
      return TYPES.image;
    }

    if (
      guessedType?.mime?.startsWith('text/') ||
      [
        'application/json',
        'application/xml',
        'application/javascript',
      ].includes(guessedType?.mime || '')
    ) {
      return TYPES.text;
    }

    return TYPES.raw;
  })();

  return (
    <Flex alignItems="center" columnGap={ 2 }>
      <IconSvg name={ iconName } boxSize={ 5 } color="icon.primary" isLoading={ isLoading }/>
      <Skeleton loading={ isLoading }>{ label }</Skeleton>
    </Flex>
  );
};

export default React.memo(BlobDataType);
