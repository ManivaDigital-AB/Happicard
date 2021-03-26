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
  
  .mobileLogo
  {
    display: none;
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
  .mobileLogo
  {
    display: block;
  }
  }
  @media ${device.mobileM} {
    a {
      top: 25%;
      left: 1%;
    }
  .mobileLogo
  {
    display: block;
  }
  }
  @media ${device.mobileL} {
    a {
      top: 25%;
      left: 1%;
    }
  .mobileLogo
  {
    display: block;
  }
  }
`;

export const SeeMore = styled.div`
  h1
  {
    position: absolute;
    top: 40%;
    left: 75%;
    transform: translate(-50%, -50%);
    color: #FFF;
    font-style: italic;
    letter-spacing :1px;
    font-size: 60px;
  }
  button {
    position: absolute;
    top: 58%;
    left: 69%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    border: 3px solid #fff;
    border-radius: 25px;
    outline: none;
    font-size: 18px;
    font-weight:500;
    width: 200px;
    height: 45px;
    color: #FFF;
  }
  @media ${device.laptop} {
  }
  @media ${device.tablet} {
   
  }
  @media ${device.mobileS} {
    display: none;
  }
  @media ${device.mobileM} {
    display: none;
  }
  @media ${device.mobileL} {
    display: none;
  }
`;
