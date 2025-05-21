import React from 'react'
import { NavLink } from 'react-router-dom'

export default function CVNavigations() {
    const navCV = [{id:1, name:"Angga", desc:"Recommendation Food Street", path:"recommended-foods",icon:'bi-cup-straw'},
                   {id:2, name:"Alfan", desc:"Single Gesture", path:"hand-gesture", icon:'bi-hand-index'},
                   {id:3, name:"Frila", desc:"Room Occupancy", path:"room-occupancy", icon:'bi-door-open-fill'},
                   {id:4, name:"Agus", desc:"Scanner Barcode", path:"scanners", icon:'bi-upc-scan'},
                   {id:5, name:"Angga P", desc:"Face Attendance", path:"face-attd", icon:'bi-person-bounding-box'} ]

  return (
    <div className='card'>
        <div className="card-header">
            <div className="card-title">
                <h3>Sample Project</h3>
            </div>
        </div>
        <div className="card-body">
            <ul className="nav nav-pills">
            {navCV.map((v,index)=>(
                <li className="nav-item  w-100" key={index}>
                <NavLink to={v.path} className="d-flex align-items-center justify-content-between nav-link" key={index}>
                    <div className="symbol symbol-40px me-2">
                        <div className="symbol-label fw-semibold bg-info text-inverse-danger">
                            <i className={"fs-2x text-white bi "+v.icon}></i>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <div className="me-2">
                            <span className="text-gray-800 text-hover-primary fs-6 fw-bold">{v.name}</span>
                            <span className="text-muted fw-semibold d-block fs-7">{v.desc}</span>
                        </div>
                        <button className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px">
                            <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </NavLink>
                </li>
            ))}
            </ul>
        </div>
    </div>
  )
}
