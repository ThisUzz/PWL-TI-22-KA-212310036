import React, { useState } from 'react'
import { FaceDetection } from './FaceDetection'
import { FaceLandmark } from './FaceLandmark'

export function FaceUI() {
    const faceapps = [{id:1, name:"Face Detection", component:<FaceDetection />},
                      {id:2, name:"Face Landmark", component:<FaceLandmark />}
    ]
    const [tabSelected, setTabSelected] = useState(0);

  return (
    <div className="face-detections">
        <ul className="nav nav-tabs" role='tablist'>
            {faceapps.map((v,index)=>(
                <li className="nav-item" role='presentation' key={index}>
                    <button className={"nav-link "+( tabSelected === index ? "active" : "")} id={'face-app-'+v.id} onClick={()=>setTabSelected(index)}>
                        {v.name}
                    </button>
                </li>    
            ))}
        </ul>

        <div className="tab-content border border-top-0">
            <div className="tab-pane fade show active" id='face-detect-tab-pane' role="tabpanel" aria-labelledby="face-detect-tab">
                {faceapps[tabSelected].component}
            </div>
        </div>
    </div>
  )
}
