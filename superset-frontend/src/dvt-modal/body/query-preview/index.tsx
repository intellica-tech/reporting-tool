/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { t } from '@superset-ui/core';
import { useToasts } from 'src/components/MessageToasts/withToasts';
import { dvtNavbarViewlistTabs } from 'src/dvt-redux/dvt-navbarReducer';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/light';
import xcode from 'react-syntax-highlighter/dist/cjs/styles/hljs/xcode';
import { ModalProps } from 'src/dvt-modal';
import Icon from 'src/components/Icons/Icon';
import DvtButton from 'src/components/DvtButton';
import DvtButtonTabs, {
  ButtonTabsDataProps,
} from 'src/components/DvtButtonTabs';
import sqlSyntax from 'react-syntax-highlighter/dist/cjs/languages/hljs/sql';
import {
  StyledQueryPreview,
  StyledQueryPreviewButtonContainer,
  SqlContainer,
  StyledSyntaxHighlighter,
  SqlCopyButton,
} from './query-preview.module';

SyntaxHighlighter.registerLanguage('sql', sqlSyntax);

const DvtQueryPreview = ({ meta, onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const { addDangerToast } = useToasts();
  const [onHover, setOnHover] = useState<boolean>(false);
  const [active, setActive] = useState<ButtonTabsDataProps>({
    label: t('User query'),
    value: 'user_query',
  });

  const handleOpenSqlhub = () => {
    onClose();
    dispatch(
      dvtNavbarViewlistTabs({
        value: {
          label: t('SQL Hub'),
          value: '/sqlhub/',
        },
        key: 'sqlhub',
      }),
    );
  };

  const handleCopyToClick = () => {
    addDangerToast(t('Sql Copied!'));
    navigator.clipboard.writeText(
      active.value === 'user_query' ? meta.sql : meta.executed_sql,
    );
  };

  return (
    <StyledQueryPreview>
      <DvtButtonTabs
        data={[
          { label: t('User query'), value: 'user_query' },
          { label: t('Executed query'), value: 'executed_query' },
        ]}
        active={active}
        setActive={setActive}
      />
      <SqlContainer
        onMouseLeave={() => setOnHover(false)}
        onMouseOver={() => setOnHover(true)}
      >
        <StyledSyntaxHighlighter language="sql" style={xcode}>
          {active.value === 'user_query' ? meta.sql : meta.executed_sql}
        </StyledSyntaxHighlighter>
        {onHover && (
          <SqlCopyButton>
            <Icon iconSize="xxl" fileName="copy" onClick={handleCopyToClick} />
          </SqlCopyButton>
        )}
      </SqlContainer>
      <StyledQueryPreviewButtonContainer>
        <DvtButton label={t('Open in sql lub')} onClick={handleOpenSqlhub} />
      </StyledQueryPreviewButtonContainer>
    </StyledQueryPreview>
  );
};

export default DvtQueryPreview;
