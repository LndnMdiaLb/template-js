import styled, {css} from "styled-components";

/* mixins */

const center = css`
  display:flex;
  justify-content:center;
  align-items:center;
`;

/* containers */

export const FullWindow = styled.section`
  background-color: grey;
  width: 100vw;
  height: 100vh;
`;

export const ScaleWindow = styled.section`
  width: 100%;
  height: 100%;
`;

export const FullWindowCentered = styled(FullWindow)`
  ${center}
`;