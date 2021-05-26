import { Typography } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import colors from "./colors";

export const Text = styled(Typography)`
  color: white;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  text-decoration: ${(props) => (props.deleted ? "line-through" : "unset")};
`;

export const BackgroundImageDiv = styled.div`
  color: white;
  height: 100%;
  background-image: ${(props) => props.src};
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const ContainerDiv = styled.div`
  padding-top: 64px;
  height: 100%;
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
