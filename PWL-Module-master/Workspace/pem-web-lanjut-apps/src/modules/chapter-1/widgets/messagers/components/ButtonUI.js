const ButtonPrimary = ({ children, items, actions }) => {
  return (
    <button className={"btn btn-success " + items.btn_class} type={items.type ? items.type : "button"} title={items.title} onClick={actions}>
      { children }
    </button>
  )
}

const ButtonSecondary = ({ children, items, actions }) => {
  return (
    <button className={"btn btn-clear " + items.btn_class} type="button" title={items.title} onClick={actions}>
      { children }
    </button>
  )
}

export { ButtonPrimary, ButtonSecondary }
