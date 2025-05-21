import React from "react";
import BaseRoute from "./BaseRoute";
import { BrowserRouter } from "react-router-dom";

function App({ basename }) {
  return (
    <BrowserRouter basename={basename}>
      <BaseRoute basename={basename} />
    </BrowserRouter>
  );
}

export default App;
