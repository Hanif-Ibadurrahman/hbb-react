import DynamicFont from 'react-dynamic-font';

export const Card = props => {
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

export const CardHeader = props => {
  return (
    <Card>
      <div className="d-flex ai-center">
        <div className="icon mr-6">
          <i className={'fas fa-' + props.icon}></i>
        </div>
        <div
          className="ff-1-bd h3 of-h"
          style={{ height: 48, maxWidth: 'calc(70% - 64px - 1.5rem' }}
        >
          <DynamicFont smooth content={props.total} />
        </div>
        <div className="d-flex fd-col max-w-30%">
          <p className="p-lg ml-3">{props.text}</p>
        </div>
      </div>
      <i className={'icon-accent fas fa-' + props.icon}></i>
    </Card>
  );
};

export default {
  Card,
  CardHeader,
};
