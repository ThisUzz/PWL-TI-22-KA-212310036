import React, { useState } from 'react'
import { AlertNotif } from '../components/AlertUI';
import { ButtonPrimary, ButtonSecondary } from '../components/ButtonUI';
import { Link, useNavigate } from 'react-router-dom';
import { POST_SIGN_IN } from '../api/APIs';

export function SignIn() {
    const navigate = useNavigate();
    const uname = "febry.fairuz"; const pWd = "test123";
    const [username, setUsername] = useState(uname);
    const [password, setPassword] = useState(pWd);

    const [signin, setSignIn] = useState({ loading: false, data: [], message: "" });

    const HandlerSignIn = (e) => {
        e.preventDefault();
        setSignIn({ loading: true, data: [], message: "" });
        if (username && password) {
            POST_SIGN_IN({ username: username, password: password }, setSignIn);
        } else {
            alert("Please fill up the field with correctly");
        }
    }
    const HandlerARSignIn = () => {
        alert("Comming Soon");
    }
    return (
        <div className="card">
            <div className="card-body">
                <form autoComplete='off' method='post' className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework' onSubmit={(e) => HandlerSignIn(e)}>
                    <div className="text-center mb-11">
                        <h1 className="text-gray-900 fw-bolder mb-3">Sign In</h1>
                        <div className="text-gray-500 fw-semibold fs-6">Enter using your IBIK Account</div>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" required value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label className="required">Username</label>
                        {!username ? <small className="text-danger">Username is required</small> : ""}
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label className="required">Password</label>
                        {!password ? <small className="text-danger">Password is required</small> : ""}
                    </div>

                    <div className="d-grid my-10">
                        <ButtonPrimary
                            items={{
                                title: "Sign in",
                                btn_class: "btn-primary",
                                type: "submit",
                            }}
                            disabled={signin.loading} >
                            Sign In
                        </ButtonPrimary>
                    </div>

                    {signin.message ? <AlertNotif message={signin.message} color={Object.values(signin.data).length > 0 ? "info" : "danger"} /> : ""}

                    <div className="separator separator-content my-14">
                        <span className="w-125px text-gray-500 fw-semibold fs-7">Or with AR</span>
                    </div>

                    <div className="d-grid">
                        <Link to={"/sign-in-biometric"} className='btn btn-lg btn-light'>
                            <i className="bi bi-fingerprint fs-2x"></i>
                            <span className="ms-3">Sign in with Biometrics</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
