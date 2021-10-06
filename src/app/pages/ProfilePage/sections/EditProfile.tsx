import React, { useState } from 'react';
import { Profile, ProfileHero } from '../../../components/Image';

const profileSize = 130;

export default function UserProfile() {
  return (
    <>
      <ProfileHero className="d-flex ai-end ph-10">
        <Profile
          style={{
            height: profileSize,
            width: profileSize,
            borderRadius: profileSize / 2,
            marginBottom: profileSize / -2,
            boxShadow: '0 8px 16px rgba(0, 0, 0, .05)',
          }}
          className="d-flex ai-center jc-center bd-rs-20 of-h"
        />
      </ProfileHero>
      <div className="pl-10" style={{ marginTop: profileSize / 2 }}>
        <h6 className="ff-1-bd pt-10 pb-12 tc-medium">Profile</h6>
        <div className="pos-r"></div>
      </div>
    </>
  );
}
