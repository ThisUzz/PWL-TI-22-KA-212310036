import React, { useEffect, useRef, useState } from "react";
import * as tmImage from "@teachablemachine/image";

export function TSFireDetections() {
  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);

  const loadModel = async () => {
    const modelURL =
      process.env.REACT_APP_BASE_URL + "/tm-my-image-model/model.json";
    const metadataURL =
      process.env.REACT_APP_BASE_URL + "/tm-my-image-model/metadata.json";

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
    const webcam = new tmImage.Webcam(640, 480, flip);
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
    }
  };

  return (
    <div className="m-auto">
      <div className="card mb-5 bg-light-primary">
        <div className="card-body">
          <div className="row">
            <div className="col-2">
              <div className="mb-5">
                <button
                  type="button"
                  className={"btn btn-lg px-10 btn-"+(!isCameraOn ? "success":"danger")}
                  onClick={handleStart}
                >
                  {!isCameraOn ? "Start":"Stop"}
                </button>
              </div>
            </div>
            <div className="col-10">
              <div className="m-auto">
                <div id="label-container" ref={labelContainerRef}>
                  {predictions.map((prediction, index) => (
                    <div key={index}>
                      {prediction.className}:{" "}
                      {prediction.probability.toFixed(2) * 100}%
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
                            width:
                              prediction.probability.toFixed(2) * 100 + "%",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="webcam-container" className="text-center"></div>
    </div>
  );
}
