import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../dashboard.scoped.scss';
import { DataTable } from '../Components/Datatables';

export function DashboardSuperadmin() {
  const Card = props => {
    return (
      <div
        className={
          'card p-4 bd-rs-2 bx-sh-4 dashboard-card bd-n' + props.className
        }
        style={props.style}
      >
        {props.children}
      </div>
    );
  };

  const CardHeader = props => {
    return (
      <Card>
        <div className="d-flex ai-center">
          <div className="icon mr-6">
            <i className={'fas fa-' + props.icon}></i>
          </div>
          <h3 className="ff-1-bd flex-1 mb-0">{props.total}</h3>
          <div className="d-flex fd-col">
            <p className="p-lg ml-3">{props.text}</p>
          </div>
        </div>
        <i className={'icon-accent fas fa-' + props.icon}></i>
      </Card>
    );
  };
  return (
    <>
      <Helmet>
        <title>Dox - Dashboard Superadmin</title>
        <meta
          name="description"
          content="A React Boilerplate application homepage"
        />
      </Helmet>

      <div className="pos-r p-8 bg-primary-5">
        <h3 className="tc-dark-contrast mb-12 ff-1-bd">
          <span className="ff-1">Selamat Datang,</span> Superadmin
        </h3>
        <h6 className="mb-3 tc-dark-contrast">Today Summary</h6>
        <div className="row w-100% mh-0 row-summary">
          <div className="col col-4 ph-0">
            <CardHeader
              icon="archive"
              total="28"
              text={['Entry', <br />, 'Baru.']}
            />
          </div>
          <div className="col col-4 ph-0 mh-4">
            <CardHeader
              icon="boxes"
              total="44"
              text={['Box', <br />, 'Requested.']}
            />
          </div>
          <div className="col col-4 ph-0">
            <CardHeader
              icon="truck-loading"
              total="10"
              text={['On-Going', <br />, 'Delivery.']}
            />
          </div>
        </div>
      </div>
      <div className="pos-r p-8 pt-0 mt-20">
        <h6 className="mb-3 pt-3">Today's Notifications.</h6>
        <div className="row w-100% mh-0">
          <div className="col col-12 ph-0 mr-2">
            <Card style={{ border: '1px solid rgba(0,0,0,.05)' }}>
              <DataTable />
            </Card>
          </div>
          {/* <div className="col col-4 ph-0 ml-2">
            <Card style={{ border: '1px solid rgba(0,0,0,.05)' }}></Card>
          </div> */}
        </div>
      </div>
    </>
  );
}
