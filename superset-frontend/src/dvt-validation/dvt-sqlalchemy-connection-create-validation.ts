import { t } from '@superset-ui/core';

const connectionCreateValidationForSQLAlchemyURI = {
  display_name: (value: string) => {
    if (!value) {
      return t('This is a required field');
    }
    return undefined;
  },
  sqlalchemy_uri: (value: string) => {
    if (!value) {
      return t('This is a required field');
    }
    return undefined;
  },
};

export default connectionCreateValidationForSQLAlchemyURI;
