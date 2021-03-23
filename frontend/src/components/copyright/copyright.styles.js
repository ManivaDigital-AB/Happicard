import styled from "styled-components";
import { device } from "../../components/common/device";
export const BodyContainer = styled.div`
    .copyrightMobile{
        display: none;
    }
    .copyrightDesktop {
        display: flex;
    }
  @media ${device.laptop}  {
    .copyrightDesktop {
        display: flex;
    }
  }
  @media ${device.tablet}  {
    .copyrightDesktop {
        display: flex;
    }
  }
  @media ${device.mobileS} {
    .copyrightMobile{
        display: block;
    }
    .copyrightDesktop {
        display: none;
    }
  }
  @media ${device.mobileM} {
    .copyrightMobile{
        display: block;
    }
    .copyrightDesktop {
        display: none;
    }
  }
  @media ${device.mobileL} {
    .copyrightMobile{
        display: block;
    }
    .copyrightDesktop {
        display: none;
    }
  }
`;
