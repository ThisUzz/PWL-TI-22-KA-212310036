import React from "react";

export default function MyContact({profile}) {

  return (
    <div className="my-profile d-flex align-items-center">
      <div className="text-dark fw-bolder fs-7 me-3 text-right">
        <span className="d-block">{profile.name}</span>
        <span className="text-muted">{profile.id}</span>
      </div>
      <div className="d-flex flex-stack">
        <div className="symbol symbol-40px me-4">
          <div className="symbol-label fs-2 fw-bold bg-danger text-inverse-danger">
            {profile.name.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
}
