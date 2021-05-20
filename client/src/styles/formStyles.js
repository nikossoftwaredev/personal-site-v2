import styled from "styled-components";
import colors from "./colors";

export const StyledCard = styled.div`
  padding: 24px;
  border-radius: 20px;
  height: 100%;
  width: 280px;
  backdrop-filter: blur(23px);
  background: transparent;
  color: white;
`;

export const BackgroundImageDiv = styled.div`
  color: white;
  height: 100%;
  background-image: ${(props) => props.src};
  background-position-y: -228px;
  background-size: cover;
`;
