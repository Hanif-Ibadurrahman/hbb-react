import * as React from 'react';
import './timeline.css';

export function TimeLine() {
  const DataTimeLine = [
    {
      title1: 'Ahmad Sofian',
      title2: 'Create Request Box',
      time: '23 September 2021, 10: 30 WIB',
      icon: 'fas fa-user-check',
    },
    {
      title1: 'Pending Approval',
      title2: '',
      time: '23 September 2021, 10: 30 WIB',
      icon: 'fas fa-user-clock',
    },
    {
      title1: 'Kirani Septiani',
      title2: 'Admin CSR (Approve Request Box)',
      time: '23 September 2021, 10: 30 WIB',
      icon: 'fas fa-user-check',
    },
    {
      title1: 'Ananda April',
      title2: 'Admin RC (Asign To)',
      date: '23 September 2021',
      time: '10:30 WIB',
      icon: 'fas fa-user-check',
    },
  ];
  return (
    <div className="pos-r p-8">
      <h4>This Week</h4>
      <div className="mt-10">
        {DataTimeLine.map((val, key) => {
          return (
            <div className="d-flex ai-center timeline mb-16">
              <div className="w-14 h-14 pos-r bg-success-6 bd-rs-2 fz-h6 d-flex jc-center ai-center mr-5 icon">
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
