import { Center } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { Image } from 'toolkit/chakra/image';

interface Props {
  src: string;
}

const BlobDataImage = ({ src }: Props) => {
  const { t } = useTranslation();
  return (
    <Center
      bgColor={{ _light: 'blackAlpha.50', _dark: 'whiteAlpha.50' }}
      p={ 4 }
      minH="200px"
      w="100%"
      borderRadius="md"
    >
      <Image
        src={ src }
        objectFit="contain"
        maxW="100%"
        maxH="100%"
        objectPosition="center"
        alt={ t('blob.imageAlt') }
      />
    </Center>
  );
};

export default React.memo(BlobDataImage);
