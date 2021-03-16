import styled from "styled-components";
import { device } from "../../components/common/device";

export const BodyContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 100px;
  @media ${device.laptop} {
  }
  @media ${device.tablet} {
    padding: 30px;
  }
  @media ${device.mobileS} {
    padding: 30px;
  }
  @media ${device.mobileM} {
    padding: 30px;
  }
  @media ${device.mobileL} {
    padding: 30px;
  }
`;

export const LeftContainer = styled.div`
  // width: 40%;
  display: grid;

  label {
    display: relative;
    padding-left: 5px;
    padding-right: 5px;
    position: relative;
    bottom: -25px;
    left: 20px;
    background-color: white;
  }
  input,
  textarea,
  input:focus,
  input:active,
  textarea:focus {
    border: 2px solid  rgb(255, 197, 65);
    border-radius: 5px;
    padding: 10px;
    margin: 5px;
    width: 100%;
    outline: none;
  }
  button {
    text-decoration: none;
    background-color: #ffc541;
    color: black;
    font-size: 1em;
    font-weight: bold;
    font-family: Helvetica Neue, Helvetica, sans-serif;
    padding: 10px 40px;
    border: 2px solid #ffc541;
    border-radius: 28px;
    width: 240px;
    outline: none;
  }
  @media ${device.laptop} {
  }
  @media ${device.tablet} {
  }
  @media ${device.mobileS} {
    width: 100%;
    padding: 30px;
  }
  @media ${device.mobileM} {
    width: 100%;
    padding: 30px;
  }
  @media ${device.mobileL} {
    width: 100%;
    padding: 30px;
  }
`;

export const RightContainer = styled.div`
  // width: 40%;
  margin-left: 150px;
  img {
    margin-right: 20px;
  }
  span {
  }
  .form-group {
    display: block;
    margin: 40px 0px;
  }
  @media ${device.laptop} {
  }
  @media ${device.tablet} {
    padding: 0px;
  }
  @media ${device.mobileS} {
    width: 100%;
    margin-left: 0px;
    padding: 30px;
  }
  @media ${device.mobileM} {
    width: 100%;
    margin-left: 0px;
    padding: 30px;
  }
  @media ${device.mobileL} {
    width: 100%;
    margin-left: 0px;
    padding: 30px;
  }
`;
