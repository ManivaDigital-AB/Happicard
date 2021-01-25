import styled from "styled-components";
import { device } from "../../components/common/device";
export const BodyContainer = styled.div`
  width: 100%;
  a {
    text-decoration: none;
    position: absolute;
    left: 0.35%;
    top: 75%;

    color: black;
    font-size: 24px;
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    margin: 1em;
    padding: 5px 20px;

    border-radius: 28px;
    width: 140px;
    outline: none;
    white-space: nowrap;
  }

  @media ${device.laptop} {
  }
  @media ${device.tablet} {
    a {
      top: 35%;
      left: 10%;
    }
  }
  @media ${device.mobileS} {
    a {
      top: 25%;
      left: 1%;
    }
  }
  @media ${device.mobileM} {
    a {
      top: 25%;
      left: 1%;
    }
  }
  @media ${device.mobileL} {
    a {
      top: 25%;
      left: 1%;
    }
  }
`;
