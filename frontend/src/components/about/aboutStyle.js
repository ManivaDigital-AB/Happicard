import styled from "styled-components";
import { device } from "../../components/common/device";

export const BodyContainer = styled.div`
  width: 100%;
  h2 {
    font-weight: 700;
  }

  .process-body {
    background-color: #ffc541;
    text-align: center;

    width: 100%;
    margin: 20px 0px;
    padding-right: 250px;
    padding-left: 250px;
  }

  .header-container {
    padding: 100px;
  }

  .happicard-img {
    width: 160px;
    padding-top: 10px;
  }
  @media ${device.laptop} {
  }
  @media ${device.tablet} {
    .header-container {
      padding: 100px 20px;
    }
  }
  @media ${device.mobileS} {
    .header-container {
      padding: 0px;
    }
    .process-body {
      text-align: center;
      padding: 10px;
      width: 100%;
      margin: 10px 0px;
    }
  }
  @media ${device.mobileM} {
    .header-container {
      padding: 0px;
    }
    .process-body {
      text-align: center;
      padding: 10px;
      width: 100%;
      margin: 10px 0px;
    }
  }
  @media ${device.mobileL} {
    .header-container {
      padding: 0px;
    }
    .process-body {
      text-align: center;
      padding: 10px;
      width: 100%;
      margin: 10px 0px;
    }
  }
`;

export const LeftHeaderContainer = styled.div`
  width: 40%;
  background-color: #ffc541;
  .img-header {
    width: 100%;
    height: 100%;
  }

  @media ${device.laptop} {
  }
  @media ${device.tablet} {
    width: 50%;
  }
  @media ${device.mobileS} {
    width: 100%;
  }
  @media ${device.mobileM} {
    width: 100%;
  }
  @media ${device.mobileL} {
    width: 100%;
  }
`;

export const RightHeaderContainer = styled.div`
  width: 40%;
  margin-left: 150px;
  @media ${device.laptop} {
  }
  @media ${device.tablet} {
    width: 45%;
    margin-left: 30px;
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

export const ElementProcess = styled.div`
  width: 33.3%;
  padding: 30px;
  img {
    width: 100%;
  }
  h4 {
    margin: 10px;
    font-weight: 200;
  }
  @media ${device.laptop} {
  }
  @media ${device.tablet} {
    padding: 0px;
  }
  @media ${device.mobileS} {
    width: 100%;
    padding: 0px;
  }
  @media ${device.mobileM} {
    width: 100%;
    padding: 0px;
  }
  @media ${device.mobileL} {
    width: 100%;
    padding: 0px;
  }
`;

export const BodyProcess = styled.div`
  width: 100%;
  display: flex;
  background-color: #ffc541;
  @media ${device.laptop} {
  }
  @media ${device.tablet} {
  }
  @media ${device.mobileS} {
    display: block;
  }
  @media ${device.mobileM} {
    display: block;
  }
  @media ${device.mobileL} {
    display: block;
  }
`;

export const BodyProcessImg = styled.div`
  width: 100%;
  padding: 100px;
  img {
    width: 100%;
  }
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
