import { Flex } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React from 'react';

import * as bens from '@blockscout/bens-types';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { Tooltip } from 'toolkit/chakra/tooltip';
import { stripTrailingSlash } from 'toolkit/utils/url';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import DetailedInfoTimestamp from 'ui/shared/DetailedInfo/DetailedInfoTimestamp';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import NftEntity from 'ui/shared/entities/nft/NftEntity';
import IconSvg from 'ui/shared/IconSvg';
import TextSeparator from 'ui/shared/TextSeparator';

import NameDomainDetailsAlert from './details/NameDomainDetailsAlert';
import NameDomainExpiryStatus from './NameDomainExpiryStatus';

interface Props {
  query: UseQueryResult<bens.DetailedDomain, ResourceError<unknown>>;
}

const NameDomainDetails = ({ query }: Props) => {
  const { t } = useTranslation();
  const isLoading = query.isPlaceholderData;

  const otherAddresses = Object.entries(query.data?.other_addresses ?? {});

  return (
    <>
      <NameDomainDetailsAlert data={ query.data }/>
      <DetailedInfo.Container>
        { query.data?.registration_date && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('nameDomain.registrationDateHint') }
              isLoading={ isLoading }
            >
              { t('nameDomain.registrationDate') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <DetailedInfoTimestamp timestamp={ query.data.registration_date } isLoading={ isLoading }/>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.expiry_date && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('nameDomain.expirationDateHint') }
              isLoading={ isLoading }
            >
              { t('nameDomain.expirationDate') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue>
              <DetailedInfoTimestamp timestamp={ query.data?.expiry_date } isLoading={ isLoading } noRelativeTime/>
              <TextSeparator/>
              <Skeleton loading={ isLoading } color="text.secondary" display="inline">
                <NameDomainExpiryStatus date={ query.data?.expiry_date }/>
              </Skeleton>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.resolver_address && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('nameDomain.resolverHint') }
              isLoading={ isLoading }
            >
              { t('nameDomain.resolver') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
            >
              <AddressEntity
                address={ query.data.resolver_address }
                isLoading={ isLoading }
              />
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.registrant && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('nameDomain.registrantHint') }
              isLoading={ isLoading }
            >
              { t('nameDomain.registrant') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              columnGap={ 2 }
              flexWrap="nowrap"
            >
              <AddressEntity
                address={ query.data.registrant }
                isLoading={ isLoading }
              />
              <Tooltip content={ t('pages.lookupRelatedDomains') }>
                <Link
                  flexShrink={ 0 }
                  display="inline-flex"
                  href={ route({
                    pathname: '/name-services',
                    query: { tab: 'domains', owned_by: 'true', resolved_to: 'true', address: query.data.registrant.hash },
                  }) }
                >
                  <IconSvg name="search" boxSize={ 5 } isLoading={ isLoading }/>
                </Link>
              </Tooltip>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.owner && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('nameDomain.ownerHint') }
              isLoading={ isLoading }
            >
              { t('nameDomain.owner') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              columnGap={ 2 }
              flexWrap="nowrap"
            >
              <AddressEntity
                address={ query.data.owner }
                isLoading={ isLoading }
              />
              <Tooltip content={ t('pages.lookupRelatedDomains') }>
                <Link
                  flexShrink={ 0 }
                  display="inline-flex"
                  href={ route({
                    pathname: '/name-services',
                    query: { tab: 'domains', owned_by: 'true', resolved_to: 'true', address: query.data.owner.hash },
                  }) }
                >
                  <IconSvg name="search" boxSize={ 5 } isLoading={ isLoading }/>
                </Link>
              </Tooltip>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.wrapped_owner && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('nameDomain.managerHint') }
              isLoading={ isLoading }
            >
              { t('nameDomain.manager') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              columnGap={ 2 }
              flexWrap="nowrap"
            >
              <AddressEntity
                address={ query.data.wrapped_owner }
                isLoading={ isLoading }
              />
              <Tooltip content={ t('pages.lookupRelatedDomains') }>
                <Link
                  flexShrink={ 0 }
                  display="inline-flex"
                  href={ route({
                    pathname: '/name-services',
                    query: { tab: 'domains', owned_by: 'true', resolved_to: 'true', address: query.data.wrapped_owner.hash },
                  }) }
                >
                  <IconSvg name="search" boxSize={ 5 } isLoading={ isLoading }/>
                </Link>
              </Tooltip>
            </DetailedInfo.ItemValue>
          </>
        ) }

        { query.data?.tokens.map((token) => {
          const isProtocolBaseChain = stripTrailingSlash(query.data.protocol?.deployment_blockscout_base_url ?? '') === config.app.baseUrl;
          const entityProps = {
            link: { external: !isProtocolBaseChain ? true : false },
            href: !isProtocolBaseChain ? (
              stripTrailingSlash(query.data.protocol?.deployment_blockscout_base_url ?? '') +
            route({ pathname: '/token/[hash]/instance/[id]', query: { hash: token.contract_hash, id: token.id } })
            ) : undefined,
          };

          return (
            <React.Fragment key={ token.type }>
              <DetailedInfo.ItemLabel
                hint={ token.type === bens.TokenType.WRAPPED_DOMAIN_TOKEN ? t('nameDomain.wrappedTokenIdHint') : t('nameDomain.tokenIdHint') }
                isLoading={ isLoading }
              >
                { token.type === bens.TokenType.WRAPPED_DOMAIN_TOKEN ? t('nameDomain.wrappedTokenId') : t('nameDomain.tokenId') }
              </DetailedInfo.ItemLabel>
              <DetailedInfo.ItemValue
                wordBreak="break-all"
                whiteSpace="pre-wrap"
              >
                <NftEntity { ...entityProps } hash={ token.contract_hash } id={ token.id } isLoading={ isLoading } noIcon/>
              </DetailedInfo.ItemValue>
            </React.Fragment>
          );
        }) }

        { otherAddresses.length > 0 && (
          <>
            <DetailedInfo.ItemLabel
              hint={ t('nameDomain.otherAddressesHint') }
              isLoading={ isLoading }
            >
              { t('nameDomain.otherAddresses') }
            </DetailedInfo.ItemLabel>
            <DetailedInfo.ItemValue
              flexDir="column"
              alignItems="flex-start"
              multiRow
            >
              { otherAddresses.map(([ type, address ]) => (
                <Flex key={ type } columnGap={ 2 } minW="0" w="100%" overflow="hidden">
                  <Skeleton loading={ isLoading }>{ type }</Skeleton>
                  <AddressEntity
                    address={{ hash: address }}
                    isLoading={ isLoading }
                    noLink
                    noIcon
                  />
                </Flex>
              )) }
            </DetailedInfo.ItemValue>
          </>
        ) }
      </DetailedInfo.Container>
    </>
  );
};

export default React.memo(NameDomainDetails);
