import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './profile.scoped.scss';
// import ProfileBg from 'assets/images/user-bg.jpg';
import { Profile, ProfileHero } from '../../components/Image';

const profileSize = 130;

export function UserProfile() {
  return (
    <>
      <Helmet>
        <title>Dox - Login</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>
      <div className="pos-r d-flex" style={{ minHeight: 'calc(100% - 80px' }}>
        {/* <ProfileHero className="d-flex ai-end ph-10">
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
        </ProfileHero> */}

        <div
          className="pos-r d-flex w-100% profile-wrapper"
          style={{ minHeight: 'calc(100% - 80px' }}
        >
          <div
            className="col col-3 ph-0"
            style={{ minHeight: 'calc(100% - 80px' }}
          >
            <div className="ph-10 pv-4 tc-medium">
              <span className="icon mr-4">
                <i className="far fa-user-circle p-xl"></i>
              </span>
              <span className="text p-lg ff-1-bd tc-medium-shade">Profile</span>
            </div>
            <div className="d-block w-100% h-2px bg-medium op-10%"></div>
            <div className="ph-10 pv-4 tc-medium">
              <span className="icon mr-4">
                <i className="far fa-user-edit p-xl"></i>
              </span>
              <span className="text p-lg ff-1-bd tc-medium-shade">
                Edit Profile
              </span>
            </div>
            <div className="d-block w-100% h-2px bg-medium op-10%"></div>
            <div className="ph-10 pv-4 tc-medium">
              <span className="icon mr-4">
                <i className="far fa-lock p-xl"></i>
              </span>
              <span className="text p-lg ff-1-bd tc-medium-shade">
                Privacy & Password
              </span>
            </div>
            <div className="d-block w-100% h-2px bg-medium op-10%"></div>
            <div className="pos-a r-0 t-0 h-100% w-2px bg-medium op-10%"></div>
          </div>
          {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
          <div className="col col-9 ph-0">
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
          </div>
        </div>
      </div>
    </>
  );
}
