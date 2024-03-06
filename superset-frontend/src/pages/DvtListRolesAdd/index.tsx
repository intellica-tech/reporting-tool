import React, { useState } from 'react';
import DvtButton from 'src/components/DvtButton';
import { useHistory } from 'react-router-dom';
import DvtAddFormFields from 'src/components/DvtAddFormFields';
import {
  StyledAddFormFields,
  StyledButtons,
  StyledForms,
  StyledHeader,
} from './dvt-list-roles-add.module';

const DvtListRolesAdd = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    name: '',
    permissions: [],
  });

  const handleBack = () => {
    formReset();
    history.push('/role/list/');
  };

  const formReset = () => {
    setValues({
      name: '',
      permissions: [],
    });
  };

  return (
    <StyledAddFormFields>
      <StyledHeader>Add Role</StyledHeader>
      <StyledForms>
        <DvtAddFormFields
          forms={[
            {
              description: 'Write the user first name or names',
              field: 'name',
              important: true,
              label: 'Name',
              placehoder: 'Name',
              status: 'input',
            },
            {
              description:
                'The user role on the application, this will associate with a list of permissions',
              field: 'permissions',
              label: 'Permissions',
              options: [
                {
                  label: 'can read on SavedQuery',
                  value: 1,
                },
                {
                  label: 'can write on SavedQuery',
                  value: 2,
                },
                {
                  label: 'can read on CssTemplate',
                  value: 3,
                },
                {
                  label: 'can write on CssTemplate',
                  value: 4,
                },
                {
                  label: 'can read on ReportSchedule',
                  value: 5,
                },
                {
                  label: 'can write on ReportSchedule',
                  value: 6,
                },
              ],
              placehoder: 'Select Value',
              status: 'select-multiple',
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
    </StyledAddFormFields>
  );
};

export default DvtListRolesAdd;
