import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import ChapterOne from './pages/ChapterOne';
import ChapterTwo from './pages/ChapterTwo';
import Error404 from './pages/Error404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-out" element={<Navigate to="/sign-in" />} />
        <Route path="/chapter-1" element={<ChapterOne />} />
        <Route path="/chapter-2" element={<ChapterTwo />} />
        <Route path="/home" element={<ChapterTwo />} />
        <Route path="/" element={<ChapterOne />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
