import Colours from './colours'
import React from "react";
import Resets from './resets'
import ResetsCustom from './resets-custom'
import Typography from './typography'

const GlobalStyles = () =>
    <>
        <Resets/>
        <ResetsCustom/>
        <Typography/>
        <Colours/>
    </>

export default GlobalStyles