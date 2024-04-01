import React, { useState } from 'react';
import DvtButton from 'src/components/DvtButton';
import { useHistory } from 'react-router-dom';
import { t } from '@superset-ui/core';
import DvtAddFormFields from 'src/components/DvtAddFormFields';
import { StyledButtons, StyledForms } from './dvt-users-list-add.module';

const DvtUsersListAdd = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    isActive: false,
    email: '',
    role: [],
    password: '',
    confirmPassword: '',
  });

  const handleBack = () => {
    formReset();
    history.push('/user/list/');
  };

  const formReset = () => {
    setValues({
      firstName: '',
      lastName: '',
      userName: '',
      isActive: false,
      email: '',
      role: [],
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <div>
      <StyledForms>
        <DvtAddFormFields
          forms={[
            {
              description: t('Write the user first name or names'),
              field: 'firstName',
              important: true,
              label: t('First Name'),
              placehoder: t('First Name'),
              status: 'input',
            },
            {
              description: t('Write the user first last name'),
              field: 'lastName',
              important: true,
              label: t('Last Name'),
              placehoder: t('Last Name'),
              status: 'input',
            },
            {
              description: t(
                'Username valid for authentication on DB or LDAP, unused for OID auth',
              ),
              field: 'userName',
              important: true,
              label: t('User Name'),
              placehoder: t('User Name'),
              status: 'input',
            },
            {
              description: t(
                'Username valid for authentication on DB or LDAP, unused for OID auth',
              ),
              field: 'isActive',
              label: t('Is Active?'),
              status: 'checkbox',
            },
            {
              description: t(
                'The user’s email, this will also be used for OID auth',
              ),
              field: 'email',
              important: true,
              label: t('Email'),
              placehoder: t('Email'),
              status: 'input',
            },
            {
              description: t(
                'The user role on the application, this will associate with a list of permissions',
              ),
              field: 'role',
              label: t('Role'),
              options: [
                {
                  label: 'Regular',
                  value: 1,
                },
                {
                  label: 'Base',
                  value: 2,
                },
              ],
              placehoder: t('Select Value'),
              status: 'select-multiple',
            },
            {
              description: t('The user’s password for authentication'),
              field: 'password',
              label: t('Password'),
              status: 'input',
            },
            {
              description: t('Please rewrite the user’s password to confirm'),
              field: 'confirmPassword',
              label: t('Confirm Password'),
              status: 'input',
            },
          ]}
          setValues={setValues}
          values={values}
        />
      </StyledForms>
      <StyledButtons>
        <DvtButton
          label={t('Back')}
          icon="dvt-arrow_forwardup"
          colour="grayscale"
          onClick={handleBack}
        />
        <DvtButton label={t('Save')} onClick={() => console.log(values)} />
      </StyledButtons>
    </div>
  );
};

export default DvtUsersListAdd;
