import React, { useState } from 'react';
import DvtButton from 'src/components/DvtButton';
import { useHistory } from 'react-router-dom';
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
              description: 'Write the user first name or names',
              field: 'firstName',
              important: true,
              label: 'First Name',
              placehoder: 'First Name',
              status: 'input',
            },
            {
              description: 'Write the user first last name',
              field: 'lastName',
              important: true,
              label: 'Last Name',
              placehoder: 'First Name',
              status: 'input',
            },
            {
              description:
                'Username valid for authentication on DB or LDAP, unused for OID auth',
              field: 'userName',
              important: true,
              label: 'User Name',
              placehoder: 'User Name',
              status: 'input',
            },
            {
              description:
                'Username valid for authentication on DB or LDAP, unused for OID auth',
              field: 'isActive',
              label: 'Is Active?',
              status: 'checkbox',
            },
            {
              description:
                'The user’s email, this will also be used for OID auth',
              field: 'email',
              important: true,
              label: 'Email',
              placehoder: 'Email',
              status: 'input',
            },
            {
              description:
                'The user role on the application, this will associate with a list of permissions',
              field: 'role',
              label: 'Role',
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
              placehoder: 'Select Value',
              status: 'select-multiple',
            },
            {
              description: 'The user’s password for authentication',
              field: 'password',
              label: 'Password',
              status: 'input',
            },
            {
              description: 'Please rewrite the user’s password to confirm',
              field: 'confirmPassword',
              label: 'Confirm Password',
              status: 'input',
            },
          ]}
          setValues={setValues}
          values={values}
        />
      </StyledForms>
      <StyledButtons>
        <DvtButton
          label="Back"
          icon="dvt-arrow_forwardup"
          colour="grayscale"
          onClick={handleBack}
        />
        <DvtButton label="Save" onClick={() => console.log(values)} />
      </StyledButtons>
    </div>
  );
};

export default DvtUsersListAdd;
