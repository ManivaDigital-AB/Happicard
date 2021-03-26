import styled from "styled-components";
import { device } from "../../components/common/device";

export const Nav = styled.nav`
  width: 100%;
  height: 75px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  color: black;
  font-size: 14px;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
  .logoImg {
    height: 40px;
    padding-bottom: 6px;
    margin-top: -4px;
  }
  .logo {
    padding-top: 28px;
    width: 114px;
    height: 60px;
    padding-bottom: 5px;
    padding-left: 104px;
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
