import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Headers() {
    return (
        <div className="card mb-10">
            <div className="card-body py-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="titles">
                        <h3> IBI Kesatuan </h3>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-1">
                            <li className="breadcrumb-item">
                                <i className="bi bi-house"></i>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item">
                                PWL
                            </li>
                        </ul>
                    </div>
                    <ul className="nav nav-pills justify-content-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/chapter-1"} >Chapter-One</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/chapter-2"} >Chapter-Two</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/chapter-3"} >Chapter-Three</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/chapter-4"} >Chapter-Four</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/chapter-5"} >Chapter-Five</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={"/chapter-6"} >Chapter-Six</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
