import React from 'react'
import CVNavigations from './widgets/CVNavigations'
import { Outlet } from 'react-router-dom'

export function ChapterSix() {
  return (
    <div>
      <h1 className="text-white mb-5">
        Chapter Six: Sample TA
      </h1>
      <div className="px-5">
        <div className="row">
            <div className="col-12 col-lg-3 col-xxl-4 px-0 d-none d-lg-block">
                <div className="pe-5">
                    <CVNavigations />
                </div>
            </div>
            <div className="col-12 col-lg-9 col-xxl-8 px-0">
                <div className="card card-flush h-xl-100">
                    <div className="card-body">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
