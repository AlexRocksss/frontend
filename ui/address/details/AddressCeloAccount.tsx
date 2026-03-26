import { upperFirst } from 'es-toolkit';
import { useTranslation } from 'next-i18next';
import React from 'react';

import type { Address } from 'types/api/address';
import type { ExcludeNull, ExcludeUndefined } from 'types/utils';

import { currencyUnits } from 'lib/units';
import { Link } from 'toolkit/chakra/link';
import { TruncatedText } from 'toolkit/components/truncation/TruncatedText';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import * as DetailedInfoItemBreakdown from 'ui/shared/DetailedInfo/DetailedInfoItemBreakdown';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import NativeCoinValue from 'ui/shared/value/NativeCoinValue';

interface Props {
  isLoading?: boolean;
  data: ExcludeNull<ExcludeUndefined<Address['celo']>['account']>;
}

const AddressCeloAccount = ({ isLoading, data }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <DetailedInfo.ItemLabel
        hint={ t('address.celoAccountHint') }
        isLoading={ isLoading }
      >
        { t('address.celoAccountLabel') }
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        { data.name && <TruncatedText text={ data.name } mr={ 3 }/> }
        <DetailedInfoItemBreakdown.Container loading={ isLoading }>
          <DetailedInfoItemBreakdown.Row
            label={ t('address.celoTypeLabel') }
            hint={ t('address.celoTypeHint') }
          >
            { upperFirst(data.type) }
          </DetailedInfoItemBreakdown.Row>

          { data.metadata_url && (
            <DetailedInfoItemBreakdown.Row
              label={ t('address.celoMetadataUrlLabel') }
              hint={ t('address.celoMetadataUrlHint') }
            >
              <Link href={ data.metadata_url } external>
                <TruncatedText text={ data.metadata_url }/>
              </Link>
            </DetailedInfoItemBreakdown.Row>
          ) }

          <DetailedInfoItemBreakdown.Row
            label={ t('address.celoLockedLabel', { ether: currencyUnits.ether }) }
            hint={ t('address.celoLockedHint') }
          >
            <NativeCoinValue amount={ data.locked_celo } noSymbol/>
          </DetailedInfoItemBreakdown.Row>

          <DetailedInfoItemBreakdown.Row
            label={ t('address.celoNonVotingLockedLabel', { ether: currencyUnits.ether }) }
            hint={ t('address.celoNonVotingLockedHint') }
          >
            <NativeCoinValue amount={ data.nonvoting_locked_celo } noSymbol/>
          </DetailedInfoItemBreakdown.Row>

          { data.vote_signer_address && (
            <DetailedInfoItemBreakdown.Row
              label={ t('address.celoVoteSignerLabel') }
              hint={ t('address.celoVoteSignerHint') }
            >
              <AddressEntity address={ data.vote_signer_address }/>
            </DetailedInfoItemBreakdown.Row>
          ) }

          { data.validator_signer_address && (
            <DetailedInfoItemBreakdown.Row
              label={ t('address.celoValidatorSignerLabel') }
              hint={ t('address.celoValidatorSignerHint') }
            >
              <AddressEntity address={ data.validator_signer_address }/>
            </DetailedInfoItemBreakdown.Row>
          ) }

          { data.attestation_signer_address && (
            <DetailedInfoItemBreakdown.Row
              label={ t('address.celoAttestationSignerLabel') }
              hint={ t('address.celoAttestationSignerHint') }
            >
              <AddressEntity address={ data.attestation_signer_address }/>
            </DetailedInfoItemBreakdown.Row>
          ) }
        </DetailedInfoItemBreakdown.Container>
      </DetailedInfo.ItemValue>
    </>
  );
};

export default React.memo(AddressCeloAccount);
