import { OverlayTrigger, Tooltip } from "react-bootstrap"

const ButtonIcon = ({ children, color, title, position="top", onAction }) => {
    return (
        <OverlayTrigger delay={{ show: 250, hide: 400 }} placement={position} overlay={renderTooltip({ title: title })}>
            <button className={"btn btn-icon " + color} type="button" onClick={onAction}>
                {children}
            </button>
        </OverlayTrigger>
    )
}

const renderTooltip = (props) => {
    return (
        <Tooltip id="button-tooltip" {...props}>
            {props.title}
        </Tooltip>
    );
};

const ButtonPrimary = ({ children, items, actions, disabled=false }) => {
  return (
    <button className={"btn " + items.btn_class} type={items.type ? items.type : "button"} disabled={disabled} title={items.title} onClick={actions}>
      {children}
    </button>
  )
}

const ButtonSecondary = ({ children, items, actions }) => {
  return (
    <button className={"btn btn-clear " + items.btn_class} type="button" title={items.title} onClick={actions}>
      {children}
    </button>
  )
}

const ButtonSearch = ({ children, setSearch }) => {
  return (
    <div className="w-100 d-flex align-items-center mb-3 mb-lg-0 bg-white border rounded">
      <input type="text" className='form-control form-control-sm form-control-flush' placeholder='Search here' onChange={(e) => setSearch(e.target.value)} />
      {children}
    </div>
  )
}

export { ButtonPrimary, ButtonSecondary, ButtonSearch, ButtonIcon }
