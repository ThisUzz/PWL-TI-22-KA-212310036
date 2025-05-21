import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";

export function ObjectDetections() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [net, setNet] = useState(null);

  const runCoco = async () => {
    const objectModel = await cocossd.load();
    setNet(objectModel);
  };

  const detect = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);

      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  useEffect(() => {
    let intervalId;
    if (isDetecting && net && isCameraOn) {
      intervalId = setInterval(() => {
        detect();
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isDetecting, net, isCameraOn]);

  const handlePlay = () => {
    setIsDetecting(true);
    setIsCameraOn(true);
  };

  const handleStop = () => {
    setIsDetecting(false);
    setIsCameraOn(false);
  };

  return (
    <div className="m-auto">
      <div className="text-center">
        <div className="btn-group">
          {isDetecting ? (
            <button
              className="btn btn-lg px-10 btn-danger"
              onClick={handleStop}
            >
              Stop
            </button>
          ) : (
            <button
              className="btn btn-lg px-10 btn-success"
              onClick={handlePlay}
            >
              Play
            </button>
          )}
        </div>
      </div>
      <div
        className="m-auto"
        style={{ position: "relative", width: "640px", height: "480px" }}
      >
        {isCameraOn && (
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        /> )}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </div>

      
    </div>
  );
}
