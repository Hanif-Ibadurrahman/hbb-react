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
        <h3 className="ff-1-bd flex-1 mb-0">{props.total}</h3>
        <div className="d-flex fd-col">
          <p className="p-lg ml-3">{props.text}</p>
        </div>
      </div>
      <i className={'icon-accent fas fa-' + props.icon}></i>
    </Card>
  );
};
