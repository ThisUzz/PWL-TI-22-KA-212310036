import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  ChapterFive,
  ChapterFour,
  ChapterOne,
  ChapterSix,
  ChapterThree,
  ChapterTwo,
} from "../modules";
import { BiometricsSignIn, SignIn } from "../modules/chapter-4/widgets";
import LayoutInit from "../components/LayoutInit";
import {
  FaceUI,
  FireDetections,
  HandGestureDetection,
  ObjectDetections,
  TeachableMachine,
} from "../modules/chapter-5/widgets";
import { FaceAttd, QrCodeScanner, RecommendedFoods, RoomOccupancy, Scanners } from "../modules/chapter-6/widgets";

export default function BaseRoute({ basename }) {
  const is_auth = localStorage.getItem("user_account");
  return (
    <React.Suspense>
      <Routes>
        <Route path="/error/*" element={<Error404 />} />
        <Route path="/sign-out" element={<SignOut />} />

        {is_auth ? (
          <>
            <Route
              path="/*"
              element={
                <LayoutInit>
                  {" "}
                  <RoutePrivate />{" "}
                </LayoutInit>
              }
            />
            <Route index element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route
              path="/sign-in"
              element={
                <LayoutSignIn>
                  <SignIn />
                </LayoutSignIn>
              }
            />
            <Route
              path="/sign-in-biometric"
              element={
                <LayoutSignIn>
                  <BiometricsSignIn />
                </LayoutSignIn>
              }
            />
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </React.Suspense>
  );
}

const RoutePrivate = () => {
  return (
    <React.Suspense>
      <Routes>
        <Route index element={<Navigate to="/chapter-2" />} />
        <Route path="chapter-1" element={<ChapterOne />} />
        <Route path="chapter-2" element={<ChapterTwo />} />
        <Route path="chapter-3" element={<ChapterThree />} />
        <Route path="chapter-4" element={<ChapterFour />} />
        <Route path="chapter-5" element={<ChapterFive />}>
          <Route path="face-detection" element={<FaceUI />} />
          <Route path="hand-gesture" element={<HandGestureDetection />} />
          <Route path="object-detection" element={<ObjectDetections />} />
          <Route path="fire-detection" element={<FireDetections />} />
          <Route path="teachable-machine" element={<TeachableMachine />} />
        </Route>
        <Route path="chapter-6" element={<ChapterSix />}>
          <Route path="recommended-foods" element={<RecommendedFoods />} />
          <Route path="room-occupancy" element={<RoomOccupancy />} />
          <Route path="scanners" element={<Scanners />} />
          <Route path="scanners-qr" element={<QrCodeScanner />} />
          <Route path="face-attd" element={<FaceAttd />} />
          
        </Route>
        <Route path="home" element={<Home />} />
      </Routes>
    </React.Suspense>
  );
};

const LayoutSignIn = ({ children }) => {
  return <div className="w-400px m-auto mt-15">{children}</div>;
};

const SignOut = () => {
  localStorage.removeItem("user_account");
  window.location = "/sign-in";
};

const Home = () => {
  return (
    <div className="bg-body-tertiary p-5 rounded">
      <h3>Ini home looo…</h3>
    </div>
  );
};

const Error404 = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="text-center">Error 404</h1>
      </div>
    </div>
  );
};
