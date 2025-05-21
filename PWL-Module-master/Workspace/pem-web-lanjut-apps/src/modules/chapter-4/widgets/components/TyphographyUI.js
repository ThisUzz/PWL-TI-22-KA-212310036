const Label = ({name}) =>{
    return (
        <label>{name}</label>
    )
}
const Heading1 = ({name}) =>{
    return (
        <h1 className="fw-bolder">{name}</h1>
    )
}
const Heading2 = ({name}) =>{
    return (
        <h2 className="fw-bolder">{name}</h2>
    )
}

export {Label, Heading1, Heading2}

