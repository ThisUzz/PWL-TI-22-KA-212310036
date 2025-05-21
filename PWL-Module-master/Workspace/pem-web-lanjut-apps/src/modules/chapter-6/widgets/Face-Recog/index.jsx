import React, { useEffect, useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const size_camera = { width: 300, height: 300 };

export function FaceAttd() {
  const [elligible, setElligible] = useState({ open: false, data: "" });
  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);
  const ListStudent = [
    { id: 1, npm: "212310043", status: "A", name: "Angga Parulian" },
    { id: 2, npm: "212310022", status: "A", name: "Raynaldy" },
    { id: 3, npm: "212310018", status: "A", name: "Fathurahman" },
  ]
  const [studentList, setStudentList] = useState(ListStudent);

  const loadModel = async () => {
    const modelURL =
      process.env.REACT_APP_BASE_URL + "/face-recog-data-model/model.json";
    const metadataURL =
      process.env.REACT_APP_BASE_URL + "/face-recog-data-model/metadata.json";

    try {
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
      setMaxPredictions(loadedModel.getTotalClasses());
      console.log("Model loaded successfully");
    } catch (error) {
      console.error("Error loading model: ", error);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  const setupWebcam = async () => {
    const flip = true;
    const webcam = new tmImage.Webcam(
      size_camera.width,
      size_camera.height,
      flip
    );
    await webcam.setup();
    await webcam.play();
    webcamRef.current = webcam;
    requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);

    for (let i = 0; i < maxPredictions; i++) {
      labelContainerRef.current.appendChild(document.createElement("div"));
    }
    setIsCameraOn(true);
  };

  const loop = async () => {
    if (webcamRef.current) {
      webcamRef.current.update();
      await predict();
      requestAnimationFrame(loop);
    }
  };

  const predict = async () => {
    if (model && webcamRef.current) {
      const prediction = await model.predict(webcamRef.current.canvas);
      setPredictions(prediction);
    }
  };

  const handleStart = async () => {
    if (!isCameraOn) {
      await setupWebcam();
    } else {
      window.location.reload();
    }
  };

  const updateStudentListStatus = (className, probability) => {
    if (probability > 0.6) {
      setStudentList((prevList) =>
        prevList.map((student) =>
          student.name === className ? { ...student, status: "P" } : student
        )
      );
    }
  };

  return (
    <div className="row">
      <div className="col-7">
        <div
          className="alert alert-info p-3 m-auto d-flex flex-column justify-content-between align-items-center"
          style={{ width: 400, height: 500 }}
        >
          <RenderScanners
            labelContainerRef={labelContainerRef}
            predictions={predictions}
            handleStart={handleStart}
            isCameraOn={isCameraOn}
            setElligible={setElligible}
            updateStudentListStatus={updateStudentListStatus}
            studentList={studentList}
          />
        </div>
      </div>
      <div className="col-5">
        <TableUserAttd data={studentList} />
      </div>
    </div>
  );
}

const TableUserAttd = ({data}) =>{
  return (
    <div className="table-responsive">
      <h3>Daftar Absensi</h3>
      <table className="table table-bordered table-striped align-middle">
        <thead>
          <tr>
            <th width="8%">No</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v,index)=>(
          <tr key={index}>
            <td>{index+1}</td>
            <td>
              <span className="d-block fw-bold">{v.name}</span>
              <span>{v.npm}</span>
            </td>
            <td>
              <span className={"fw-bold "+(v.status === "A" ? "text-danger":"text-primary")}>
                {v.status === "A" ? "Absent" : "Present" }
              </span>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const RenderScanners = (props) => {
  const {
    labelContainerRef,
    predictions,
    handleStart,
    isCameraOn,
    setElligible,
    updateStudentListStatus,
    studentList,
  } = props;
  return (
    <>
      <div className="scaner-face m-auto">
        <div
          id="webcam-container"
          className="text-center bg-light py-3 rounded m-auto"
          style={{
            width: size_camera.width + 20,
            height: size_camera.height + 20,
          }}
        ></div>
      </div>
      <div className="actions w-100 text-center">
        <div id="label-container" ref={labelContainerRef}>
          {Object.values(predictions).length > 0 && (
            <PredictionResult
              predictions={predictions}
              setElligible={setElligible}
              updateStudentListStatus={updateStudentListStatus}
              studentList={studentList}
            />
          )}
        </div>
        <button
          type="button"
          className={
            "btn btn-lg px-10 btn-" + (!isCameraOn ? "info" : "danger")
          }
          onClick={handleStart}
        >
          {!isCameraOn ? "Start" : "Stop"} Scaning
        </button>
      </div>
    </>
  );
};

const PredictionResult = ({
  predictions,
  setElligible,
  updateStudentListStatus,
  studentList,
}) => {
  const maxProbabilityObject = predictions.reduce((max, obj) => {
    return obj.probability > max.probability ? obj : max;
  }, predictions[0]);

  const threshold = 60; // 60% probability threshold
  const accuracy = maxProbabilityObject
    ? (maxProbabilityObject.probability * 100).toFixed(0)
    : 0;
  const userScan = maxProbabilityObject && maxProbabilityObject.className;
  if (accuracy > threshold) {
    const findUser = studentList.find((item) => item.name.includes(userScan));
    if (findUser) {
      updateStudentListStatus(userScan, maxProbabilityObject.probability);
      // alert(`Hi ${findUser.name}`);
      // window.location.reload();
    }
  }

  return (
    <div className="mb-5">
      <span className="text-primary fs-1 fw-bolder">
        {maxProbabilityObject.className} {accuracy}%
      </span>
      <div
        className="progress"
        role="progressbar"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-bar"
          style={{
            width: accuracy + "%",
          }}
        ></div>
      </div>
    </div>
  );
};
