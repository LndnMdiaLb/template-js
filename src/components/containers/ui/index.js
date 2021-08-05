import AnimatedProfileCard from "../../experiments/animated-profile-card"
import NervousMatrix from "../../experiments/nervous-matrix"
import React from "react";
import styled from "styled-components"

const height = 5;

const Section = styled.div`
  width:100vw;
  height:100vh;
  /* */
  display:flex;
  justify-content:flex-end;
  align-items:flex-end;
  position:relative;
  height:${height}vh;
`;

/* bg colors */

const About = styled(Section)`
  background-color: var(--lime);
`;

const Projects = styled(Section)`
  background-color: var(--hot-pink);
`;

const Experiments = styled(Section)`
  background-color: var(--light-blue);  
`;

const Contact = styled(Section)`
  height: calc(100vh - (${height}vh *3));
  background-color: var(--charcoal);
`;

const UI = () => {   
  return (
    <div>
      <About />
      <Projects />
      <Experiments>
        <NervousMatrix/>
      </Experiments>
      <Contact>
        <AnimatedProfileCard />
      </Contact>
    </div> ) 
  }

  export default UI;