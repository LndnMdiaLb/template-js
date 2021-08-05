import { createGlobalStyle } from "styled-components";

/* JS colors */

const hotPink = "#f73f4f";
const lime = "#d1dd26";
const lightBlue = "#40c9ff";

const lightGrey = "#d7d7d7";
const midGrey = "#acacac";
const darkGrey = "#676767";

const charcoal = "#231f20";

/* css vars */

const Colours = createGlobalStyle`
  :root {  
      
    --hot-pink: ${hotPink};
    --lime: ${lime};
    --light-blue: ${lightBlue};

    --light-grey: ${lightGrey}
    --mid-grey: ${midGrey};
    --dark-grey: ${darkGrey};
    
    --charcoal: ${charcoal};
  }
`;

export const jscolors = {
  hotPink, 
  lime,
  lightBlue,
  lightGrey,
  midGrey,
  darkGrey,
  charcoal 
}

export default Colours;
