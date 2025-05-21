import { useState } from "react"
import { Label } from "./TyphographyUI"
import { ButtonPrimary } from "./ButtonUI"

const InputText = ({ actions }) => {
    return (
        <input type="text" className="form-control" {...actions} />
    )
}

const InputPassword = ({ actions }) => {
    return (
        <input type="password" className="form-control" {...actions} />
    )
}

const InputEmail = ({ actions }) => {
    return (
        <input type="email" className="form-control" {...actions} />
    )
}

const FormEmail = () => {
    const [username, setUsername] = useState("");
    return (
        <>
            <Label name={"Username"} />
            <InputEmail defaultValue={username} onChange={(e)=>setUsername(e.target.value)} />
        </>
    )
}

const FormPassword = () => {
    const [password, setPassword] = useState("");
    return (
        <>
            <Label name={"Password"} />
            <InputEmail defaultValue={password} onChange={(e)=>setPassword(e.target.value)} />
        </>
    )
}

const FormTemps = ({children}) =>{
    return (
        <>
            <FormEmail />
            <FormPassword />
            <ButtonPrimary type={"submit"}>
                Sign In
            </ButtonPrimary>
        </>
    )
}

export { InputEmail, InputText, InputPassword, FormEmail, FormPassword, FormAuth }
