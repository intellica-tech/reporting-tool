import { t } from '@superset-ui/core';

const connectionCreateValidation = {
  host: (value: string) => {
    const ipAddressRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!value) {
      return t('This is a required field');
    }
    if (!ipAddressRegex.test(value)) {
      return t('is not a valid IP address.');
    }
    return undefined;
  },
  port: (value: string) => {
    const portNumber = parseInt(value, 10);
    const onlyNumber = /^[0-9]+$/.test(value);
    if (!value) {
      return t('This is a required field');
    }
    if (!onlyNumber) {
      return t('There should be no letters');
    }
    if (portNumber < 0 || portNumber > 65535) {
      return t('Port must be between 0 and 65535');
    }
    return undefined;
  },
  database_name: (value: string) => {
    if (!value) {
      return t('This is a required field');
    }
    return undefined;
  },
  user_name: (value: string) => {
    if (!value) {
      return t('This is a required field');
    }
    return undefined;
  },
  display_name: (value: string) => {
    if (!(value.length >= 1 && value.length <= 250)) {
      return t('Length must be between 1 and 250.');
    }
    return undefined;
  },
};

export default connectionCreateValidation;
