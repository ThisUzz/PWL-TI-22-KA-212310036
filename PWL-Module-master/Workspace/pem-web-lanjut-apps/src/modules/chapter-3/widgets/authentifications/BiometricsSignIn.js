import React from 'react'
import { ButtonPrimary } from '../components/ButtonUI'

export default function BiometricsSignIn() {
  return (
    <div className="card">
      <div className="card-body">
        <form autoComplete='off' method='post' className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'>
          <div className="text-center mb-11">
            <h1 className="text-gray-900 fw-bolder mb-3">Sign In with Biometrics</h1>
            <div className="text-gray-500 fw-semibold fs-6">Scanning your face</div>
          </div>

          <div className="text-center">
            <img src={require("../../../../media/img/y-1.png")} alt="human face" className='w-100' />
          </div>

          <div className="d-grid my-10">
            <ButtonPrimary
              items={{
                title: "Sign in",
                btn_class: "btn-light-primary",
                type: "submit",
              }}
              disabled={true} >
              <span className="d-block fs-1">Successfully recognize.</span>
              <span>Redirect to system...</span>
            </ButtonPrimary>
          </div>
        </form>
      </div>
    </div>
  )
}
