import React from "react";
import { BrowserRouter, Routes, Route, Outlet, NavLink, Link, useParams, Navigate } from "react-router-dom";

function AppModule({ basename }) {
  return (
    <BrowserRouter basename={basename}>
      <React.Suspense>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path='profile' element={<Profile />} >
            <Route path="identity" element={<Identity />} />
            <Route path="config" element={<Config />} />
          </Route>
          <Route path="user/:user_id" element={<User />} />
          <Route path="detail" element={<Navigate to="/error" />} />
          <Route path="error" element={<ErrorPage />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default AppModule;

const ErrorPage = () => {
  return (
    <div className="card my-5 mx-10">
      <div className="card-body">
        <h1>Error 404</h1>
      </div>
    </div>
  )
}

const User = () => {
  let params = useParams();
  return (
    <div className="card my-5 mx-10">
      <div className="card-body">
        <h1>User ID : {params.user_id}</h1>
      </div>
    </div>
  )
}

const Profile = () => {
  return (
    <div className="card my-5 mx-10">
      <div className="card-header">
        <h3 className="card-title">Profile Page</h3>
        <div className="card-toolbar">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink className="nav-link" to={"identity"} >
                Identity
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"config"} >
                Config
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body">
        <Outlet />
      </div>
    </div>
  )
}

const Identity = () => {
  return (
    <div>
      <h1>Identity page</h1>
      <Link to={"home"}>Go To Home Page</Link>
    </div>
  )
}

const Config = () => {
  return <h1>Config page</h1>
}

const Home = () => {
  return (
    <div className="card my-5 mx-10">
      <div className="card-body">
        <h1>This is home page</h1>
      </div>
    </div>
  )
}

