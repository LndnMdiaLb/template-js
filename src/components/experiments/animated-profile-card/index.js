// import "./index.scss"

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  animated,
  config,
  interpolate,
  useSpring
} from "react-spring";
import styled, {css} from "styled-components";

/* 
  styled components typography
*/

const lspacing = .15;
const lheight = 1.5;

const typography = css`
  color: #fefefe;
  font-family: JosefinSlab;
  font-size:${lheight}rem;
  letter-spacing: ${lspacing*3}rem;
  line-height: ${lheight}rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;


const ProfileCard = styled.div`

  ${typography};
  
  margin-right: 4rem;
  margin-bottom: 4rem;

  * {
    position: relative;
    transform: translate3d(0, 0, 0);
    text-rendering: optimizeSpeed;
    text-shadow: 0 0 5px rgba(255,0,0,0.5);
  }
`;

/* 
  react spring
*/

const CONFIG = {
  velocity:100, // init speed applied to object
  mass:5,
  tension:10,
  friction:26,
  precision:0.01,
};


const sectionCopy = [
  ["Andreas Dilaveris", "h1"],
  ["coder / tinkerer / explorer", "h2"],
  ["react * nodejs * explorer", "h3"],
  ["contact info:", "p"],
  ["projects", "p"],
  ["experiments", "p"]
];


const AnimatedProfileCard = () => {

  const [ { s }, set ] = useSpring(_ => ({ 
      from: { s: 0 },
      // immediate:true,
      config: CONFIG
  }));
  
  return (
    <ProfileCard 
      // onMouseEnter={()=>{ set({s:-10}) }}
      // onMouseLeave={()=>{ set({s:0}) }}
      > 
      { 
        sectionCopy.map(
          ([copy, el], i)=>{
            /* */
            const TextNode = animated[el];
            const mulitplier = (sectionCopy.length - i) * 5;
            const transform = s.to(s => `translate3d(0, ${s * mulitplier}px, 0)`);
          return (
            <animated.div
              style={{ transform }}
            >
              <TextNode
                onMouseEnter={()=>{ set({s:-10}) }}
                onMouseLeave={()=>{ set({s:0}) }}
                style={{ display: "inline" }}>
                {copy}
              </TextNode>
            </animated.div> )
        })
      }
    </ProfileCard>
  );
}

export default AnimatedProfileCard;