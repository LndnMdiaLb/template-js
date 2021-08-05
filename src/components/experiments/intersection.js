import React, { useState } from "react";

import { FullWindow } from "../components/containers";
import { useInView } from "react-intersection-observer";

const THRESHOLD = [0.25, 0.5, 0.75]; // Store multiple thresholds in a constant

const Intersection = () => {
  const [ref, inView, entry] = useInView({ threshold: THRESHOLD });

  /* sert axis */
  const [axis, setAxis] = useState("h");
  return (
    <FullWindow ref={ref}>
      <div>content</div>
    </FullWindow>
  );
};

const Page = () => {
  return (
    <div>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
      <Intersection>copy</Intersection>
    </div>
  );
};

export default Page;
