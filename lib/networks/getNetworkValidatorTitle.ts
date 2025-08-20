import { useTranslations } from 'next-intl';
import config from 'configs/app';

export default function getNetworkValidatorTitle() {
  const t = useTranslations();
  return config.chain.verificationType === 'validation' ? `${t('validator')}` : `${t('miner')}`;
}
