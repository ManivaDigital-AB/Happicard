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

export const TopContainer = styled.div`
  background-color: #ffc542
  
  @media ${device.laptop} {
  }
  @media ${device.tablet} {
    padding: 30px;
  }
  @media ${device.mobileS} {
    padding: 30px;
    img
    {
         
    }
  }
  @media ${device.mobileM} {
    padding: 30px;
  }
  @media ${device.mobileL} {
    padding: 30px;
  }
`;

export const InnerContainer = styled.div`
  text-align: center;
  h4 {
    padding-right: 75px;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 16px;
    color: #4A4746;
    font-weight: 700;
  }

  img
  {
    width: 450px;
    height: 400px;

    padding-bottom: 25px;
    margin-right: 60px;
  }
  
  @media ${device.laptop} {
  }
  @media ${device.tablet} {
    padding: 30px;
  }
  @media ${device.mobileS} {
    padding: 30px;
    img
    {
      width: 250px;
      height: 240px;
      padding-right: 50px;
    }
  }
  @media ${device.mobileM} {
    
    h4
    {
      padding-left: 60px;
    }
    img
    {
    width: 350px;
    height: 250px;
    padding-bottom: 25px;
    margin-right: 60px;
    padding-right: 85px;
    }
  }
  @media ${device.mobileL} {
    padding: 30px;
  }
`;

export const MiddleContainer = styled.div`
  padding-top: 25px;
  background-color: #FFFF;
  border-radius: 2px;

  div {
    text-align: center;
    padding: 25px;
  }

  img {
    width: 350px;
    height: 400px;
  }

  h4
  {
    text-align: left;
    color: #0F0F0F;
  }
  p
  {
    padding-top: 25px;
    text-align: left;
  }

  @media ${device.laptop} {
  }
  @media ${device.tablet} {

  }
  @media ${device.mobileS} {
    div {
      
      padding: 2px;
    }
    img{
      padding: 25px;
    }
    h4
  {
    text-align: left;
    color: #0F0F0F;
  }
  p
  {
    padding-top: 25px;
    text-align: left;
  }
  }
  @media ${device.mobileM} {
    div {
      text-align: center;
      padding: 2px;
    }
    img{
      padding: 10px;
    }
  }
  @media ${device.mobileL} {
   
  }
`;