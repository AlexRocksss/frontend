import { Code } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { FormFields } from '../types';

import delay from 'lib/delay';
import useFetch from 'lib/hooks/useFetch';
import { Link } from 'toolkit/chakra/link';
import { FormFieldText } from 'toolkit/components/forms/fields/FormFieldText';

import ContractVerificationFormRow from '../ContractVerificationFormRow';
import { getGitHubOwnerAndRepo } from '../utils';

const COMMIT_HASH_PATTERN = /^([a-f0-9]{40}|[a-f0-9]{7})$/;

interface Props {
  latestCommitHash: string | undefined;
}

const ContractVerificationFieldCommit = ({ latestCommitHash }: Props) => {
  const { t } = useTranslation();
  const hashErrorRef = React.useRef<string | undefined>(undefined);
  const fetch = useFetch();
  const { getValues, trigger, setValue, getFieldState } = useFormContext<FormFields>();

  const handleUseLatestCommitClick = React.useCallback(() => {
    if (latestCommitHash) {
      setValue('commit_hash', latestCommitHash);
      trigger('commit_hash');
    }
  }, [ setValue, trigger, latestCommitHash ]);

  const handleBlur = React.useCallback(async() => {
    await delay(100); // have to wait to properly trigger subsequent validation
    const repositoryUrlValue = getValues('repository_url');
    const repositoryUrlState = getFieldState('repository_url');

    if (!repositoryUrlValue || repositoryUrlState.invalid) {
      return;
    }

    const { error } = getFieldState('commit_hash');

    if (error && error.type !== 'commitHash') {
      return;
    }

    const commitHash = getValues('commit_hash');

    if (!commitHash) {
      hashErrorRef.current = undefined;
      trigger('commit_hash');
      return;
    }

    const gitHubData = getGitHubOwnerAndRepo(repositoryUrlValue);

    if (gitHubData) {
      try {
        const response = await fetch<{ sha?: string }, unknown>(
          `https://api.github.com/repos/${ gitHubData.owner }/${ gitHubData.repo }/commits/${ commitHash }`,
        );

        if ('sha' in response) {
          hashErrorRef.current = undefined;
          trigger('commit_hash');
          return;
        }
      } catch (error) {}
    }

    hashErrorRef.current = t('contractVerification.commitHashNotFound');
    trigger('commit_hash');
  }, [ fetch, getValues, trigger, getFieldState, t ]);

  React.useEffect(() => {
    if (latestCommitHash) {
      // revalidate field every time the latest commit hash changes
      // because the repository url field has changed
      handleBlur();
    }
  }, [ handleBlur, latestCommitHash ]);

  const commitHashValidator = React.useCallback(() => {
    return hashErrorRef.current ? hashErrorRef.current : true;
  }, []);

  const rules = React.useMemo(() => {
    return {
      validate: {
        commitHash: commitHashValidator,
      },
      pattern: COMMIT_HASH_PATTERN,
    };
  }, [ commitHashValidator ]);

  return (
    <ContractVerificationFormRow>
      <FormFieldText<FormFields>
        name="commit_hash"
        placeholder={ t('contractVerification.commitHashPlaceholder') }
        required
        onBlur={ handleBlur }
        rules={ rules }
      />
      { latestCommitHash ? (
        <div>
          <span>{ t('contractVerification.latestCommitBefore') }</span>
          <Code color="text.secondary">{ latestCommitHash.slice(0, 7) }</Code>
          <span>{ t('contractVerification.latestCommitAfter') }</span>
          <Link onClick={ handleUseLatestCommitClick }>{ t('contractVerification.latestCommitLink') }</Link>
          <span>{ t('contractVerification.latestCommitEnd') }</span>
        </div>
      ) : null }
    </ContractVerificationFormRow>
  );
};

export default React.memo(ContractVerificationFieldCommit);
