import * as React from 'react';
import './timeline.scoped.scss';

export function TimeLine() {
  const DataTimeLine = [
    {
      title1: 'Create Request Box',
      title2: '(Ahmad Sofian)',
      time: '23 September 2021, 10: 30 WIB',
      icon: 'fas fa-user-plus',
    },
    {
      title1: 'Pending Approval',
      title2: '',
      time: '23 September 2021, 10: 30 WIB',
      icon: 'fas fa-user-clock',
    },
    {
      title1: 'Approve Request Box',
      title2: 'Kirani Septiani (Admin CSR ) ',
      time: '23 September 2021, 10: 30 WIB',
      icon: 'fas fa-user-check',
    },
    {
      title1: 'Asign To Sukma Wijaya',
      title2: 'Ananda April (Admin RC)',
      date: '23 September 2021',
      time: '10:30 WIB',
      icon: 'fas fa-user-friends',
    },
    {
      title1: 'Administrasi Box',
      title2: 'Sukma Wijaya (Arsiparis)',
      time: '23 September 2021, 10: 30 WIB',
      icon: 'fas fa-people-carry',
    },
    {
      title1: 'Tiba di Staging Area',
      title2: 'Sukma Wijaya (Arsiparis)',
      date: '23 September 2021',
      time: '10:30 WIB',
      icon: 'fas fa-warehouse-alt',
    },
    {
      title1: 'Tiba di Lokasi',
      title2: '',
      date: '23 September 2021',
      time: '10:30 WIB',
      icon: 'fas fa-check-circle',
    },
    {
      title1: 'Sukma Wijaya',
      title2: 'Arsiparis (Tiba di Staging Area)',
      date: '23 September 2021',
      time: '10:30 WIB',
      icon: 'fas fa-times-circle',
    },
  ];
  return (
    <div className="pos-r p-8">
      <h4>This Week</h4>
      <div className="mt-10">
        {DataTimeLine.map((val, key) => {
          return (
            <div className="d-flex ai-center timeline mb-12 timeline-cancel">
              <div className="w-14 h-14 pos-r bd-rs-2 fz-h6 d-flex jc-center ai-center mr-5 icon">
                <i className={val.icon}></i>
              </div>
              <div>
                <p className="p-lg d-flex ai-center">
                  {val.title1}
                  <span className="tc-medium-shade ml-2">{val.title2}</span>
                </p>
                <p className="p-sm tc-medium-shade">
                  {val.date}
                  {val.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
