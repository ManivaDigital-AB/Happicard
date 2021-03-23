import styled from "styled-components";
import { device } from "../../components/common/device";
export const BodyContainer = styled.div`
 .footerMobile {
    display: none;
  }
  .footerDesktop {
    display: block;
  }
  .accordion-button {
    margin: 25px;
    height: 50px;
    padding: 25px;
    font-weight: 600;
    color: #4A4746;
  }
  .list-group-item {
    padding-left: 52px;
    font-size: 16px;
    font-weight: 500;
    color: #4A4746;
    border-bottom: 3px solid #118678;
  }
  .accordion-item
  {
      border-bottom: 3px solid #FFFF;
  }
  @media ${device.laptop}  {
    .footerMobile {
        display: none;
      }
  }
  @media ${device.tablet}  {
    .footerMobile {
        display: none;
      }
  }
  @media ${device.mobileS} {
    .footerMobile {
        display: block;
      }

    .footerDesktop {
        display: none;
    }
  }
  @media ${device.mobileM} {
    .footerMobile {
        display: block;
      }
      .footerDesktop {
        display: none;
    }
  }
  @media ${device.mobileL} {
    .footerMobile {
        display: block;
      }
      .footerDesktop {
        display: none;
    }
  }
`;
