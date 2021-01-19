import styled from "styled-components";
import { device } from "../../components/common/device";
export const BodyContainer = styled.div`
width: 100%;
   a{
       text-decoration: none;
       color:#fff;
       position: absolute;
        left: 20%;
        top: 70%;
        background: white;
        color: black;
        font-size: 1em;
        font-weight: bold;
        font-family: Helvetica Neue,Helvetica,sans-serif;
        margin: 1em;
        padding: 0.25em 1.25em;
        border: 2px solid #DFB248;
        border-radius: 28px;
        width: 140px;
        outline: none;
   }

   a:hover{
       outline: none;
       background-color: rgb(223, 178, 72);
       color: #fff;
   }
   @media ${device.laptop} { 
   
}
@media ${device.tablet} {
    a{
        top: 35%;
        left: 10%;
    }
}
@media ${device.mobileS} {
  a{
    top: 25%;
    left: 1%;
   }
}
@media ${device.mobileM} {
    a{
        top: 25%;
        left: 1%;
       }
}
@media ${device.mobileL} { 
    a{
        top: 25%;
        left: 1%;
       }
}
`;



