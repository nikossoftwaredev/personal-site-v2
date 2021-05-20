import { Typography } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "./colors";

export const Text = styled(Typography)`
  color: white;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
`;

export const BackgroundImageDiv = styled.div`
  color: white;
  height: 100%;
  background-image: ${(props) => props.src};
  background-position-y: -228px;
  background-size: cover;
`;

export const BodyWithPadding = styled.div`
  padding: ${(props) => props.padding};
`;

export const LinkStyled = styled(Link)`
  color: ${colors.green};

  &:hover {
    color: ${colors.green};
  }
`;
