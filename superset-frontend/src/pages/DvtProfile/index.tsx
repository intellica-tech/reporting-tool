import React from 'react';
import DvtProfileInformation from 'src/components/DvtProfileInformation';
import { useAppSelector } from 'src/hooks/useAppSelector';

function DvtProfile() {
  const profileSelector = useAppSelector(state => state.dvtSidebar.profile);

  const joinedDate = new Date('2024-02-13T00:00:00');
  return (
    <div>
      <DvtProfileInformation
        header={profileSelector.header}
        location={profileSelector.location}
        title={profileSelector.title}
        test={profileSelector.test}
        image={profileSelector.image}
        joinedDate={joinedDate}
      />
    </div>
  );
}

export default DvtProfile;
