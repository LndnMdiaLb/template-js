import JosefinSlab from "../../assets/fonts/JosefinSlab-VariableFont_wght.ttf"
import { createGlobalStyle } from "styled-components";

const Typography = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Ballet&display=swap');

  @font-face {
    font-family: 'Ballet', cursive;
  }
  
  @font-face {
    font-family: JosefinSlab;
    src: url(${JosefinSlab});
  }
`;

export default Typography