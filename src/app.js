// import "./index.scss"

import React, { useCallback, useEffect, useRef, useState } from "react";

import Gallery from "./components/containers/gallery"
import GlobalStyles from './components/global-styles'
import ReactDom from "react-dom";
import UI from "./components/containers/ui"

const App = () => {
  const a = <div />

  return (
    <>
      <GlobalStyles />
      <Gallery />
    </>
  );
}

/* document already exists : js bundle executed clientside */
const shell = document.getElementById("app");
ReactDom.render( <App />, shell );