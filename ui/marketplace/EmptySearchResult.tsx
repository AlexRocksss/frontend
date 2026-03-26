import { useTranslation } from 'next-i18next';
import React from 'react';

import { MarketplaceCategory } from 'types/client/marketplace';

import config from 'configs/app';
import { EmptyState } from 'toolkit/chakra/empty-state';
import { Link } from 'toolkit/chakra/link';
import { space } from 'toolkit/utils/htmlEntities';
import IconSvg from 'ui/shared/IconSvg';

const feature = config.features.marketplace;

type Props = {
  favoriteApps: Array<string>;
  selectedCategoryId?: string;
};

const EmptySearchResult = ({ favoriteApps, selectedCategoryId }: Props) => {
  const { t } = useTranslation();

  return (
    <EmptyState
      description={
        (selectedCategoryId === MarketplaceCategory.FAVORITES && !favoriteApps.length) ? (
          <>
            { t('marketplace.noFavoriteApps') }<br/>
            { t('marketplace.addToFavoriteHintBefore') }{ space }
            <IconSvg name="heart_outline" boxSize={ 5 } verticalAlign="text-bottom" color="icon.secondary"/>{ space }
            { t('marketplace.addToFavoriteHintAfter') }
          </>
        ) : (
          <>
            { t('marketplace.noMatchingApps') }
            { 'suggestIdeasFormUrl' in feature && (
              <>
                { ' ' }{ t('marketplace.shareIdea') }<br/>
                <Link external href={ feature.suggestIdeasFormUrl }>{ t('marketplace.shareIdeaLink') }</Link>
              </>
            ) }
          </>
        )
      }
    />
  );
};

export default React.memo(EmptySearchResult);
