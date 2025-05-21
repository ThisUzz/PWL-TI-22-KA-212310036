import React from 'react'
import { NavLink } from 'react-router-dom'

export function CVNavigations() {
    const navCV = [{id:1, name:"Face Detection", desc:"Face landmark", path:"face-detection",icon:'bi-emoji-grin'},
                   {id:2, name:"Hand Gesture", desc:"Single Gesture", path:"hand-gesture", icon:'bi-hand-index'},
                   {id:3, name:"Object Detection", desc:"Scaning Object", path:"object-detection", icon:"bi-heptagon"},
                   {id:4, name:"Fire Detection", desc:"Volume Fire", path:"fire-detection", icon:"bi-fire"},
                   {id:5, name:"Audio Detection", desc:"Detect Audio", path:"sound-detection", icon:"bi-soundwave"},
                   {id:6, name:"Pose Detection", desc:"Motion detection", path:"motion-detection", icon:"bi-person-arms-up"},
                   {id:7, name:"Sample Teachable Machine", desc:"Recognition", path:"teachable-machine", icon:"bi-heptagon"}]
  return (
    <div className='card'>
        <div className="card-header">
            <div className="card-title">
                <h3>Sample Computer Vision</h3>
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
