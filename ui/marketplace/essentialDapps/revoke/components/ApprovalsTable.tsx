import { useTranslation } from 'next-i18next';
import React from 'react';

import type { EssentialDappsChainConfig } from 'types/client/marketplace';
import type { AllowanceType } from 'types/client/revoke';

import { TableBody, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import TimeFormatToggle from 'ui/shared/time/TimeFormatToggle';

import ApprovalsTableItem from './ApprovalsTableItem';

type Props = {
  selectedChain: EssentialDappsChainConfig | undefined;
  approvals: Array<AllowanceType>;
  isLoading?: boolean;
  isAddressMatch?: boolean;
  hideApproval: (approval: AllowanceType) => void;
};

export default function ApprovalsTable({
  selectedChain,
  approvals,
  isLoading,
  isAddressMatch,
  hideApproval,
}: Props) {
  const { t } = useTranslation();

  return (
    <TableRoot>
      <TableHeaderSticky top={ 136 }>
        <TableRow>
          <TableColumnHeader w="30%">{ t('marketplace.revokeTokenHeader') }</TableColumnHeader>
          <TableColumnHeader w="15%">{ t('marketplace.revokeApprovedSpenderHeader') }</TableColumnHeader>
          <TableColumnHeader w="20%" isNumeric>
            { t('marketplace.revokeApprovedAmountHeader') }
          </TableColumnHeader>
          <TableColumnHeader w="17%" isNumeric>
            { t('marketplace.revokeValueAtRiskHeader') }
          </TableColumnHeader>
          <TableColumnHeader w={ isAddressMatch ? '30px' : '50px' }/>
          <TableColumnHeader w="18%">
            { t('marketplace.revokeLastUpdatedHeader') }
            <TimeFormatToggle/>
          </TableColumnHeader>
          { isAddressMatch && <TableColumnHeader w="95px" isNumeric/> }
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { approvals.map((approval, index) => (
          <ApprovalsTableItem
            key={ index }
            selectedChain={ selectedChain }
            approval={ approval }
            isLoading={ isLoading }
            isAddressMatch={ isAddressMatch }
            hideApproval={ hideApproval }
          />
        )) }
      </TableBody>
    </TableRoot>
  );
}
