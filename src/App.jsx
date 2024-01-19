import React from "react";
import { Routes, Route } from "react-router-dom";

import { GlobalFonts } from "./assets/styles/fonts";
import { GlobalResetStyle } from "./assets/styles/cssReset";

import Course from "./pages/Course/Course";
import Home from "./pages/Home/Home";
import "./Library.scss";

function App() {
  return (
    <>
      <GlobalFonts />
      <GlobalResetStyle />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/course" element={<Course />} />
      </Routes>
    </>
  );
}

export default App;
