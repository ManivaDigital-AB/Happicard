import styled from "styled-components";
import { device } from "../../components/common/device";

export const BodyContainer = styled.div`
width: 100%;
    h2{
    font-weight: 700;
    }

   
    .process-body{
        background-color: #dfb248;
        text-align: center;
        padding: 100px;
        width: 100%;
        margin: 20px 0px;
      }
      
      .header-container{
        padding: 100px; 
      }
     
      .happicard-img{
        width: 160px;
        padding-top: 10px;
      }
      @media ${device.laptop} { 
   
      }
      @media ${device.tablet} {
        padding: 0px;
      }
      @media ${device.mobileS} {
        
      }
      @media ${device.mobileM} {
        
      }
      @media ${device.mobileL} { 
          
      }
`;


export const LeftHeaderContainer = styled.div`
width: 40%;
height: 400px;
background-color: #dfb248;
.img-header{
    width: 100%;
    height: 100%;
 }

 @media ${device.laptop} { 
   
}
@media ${device.tablet} {
  padding: 0px;
}
@media ${device.mobileS} {
  
}
@media ${device.mobileM} {
  
}
@media ${device.mobileL} { 
    
}
`;

export const RightHeaderContainer = styled.div` 
width: 40%;
margin-left: 150px;
@media ${device.laptop} { 
   
}
@media ${device.tablet} {
  padding: 0px;
}
@media ${device.mobileS} {
  
}
@media ${device.mobileM} {
  
}
@media ${device.mobileL} { 
    
}
`;

export const ElementProcess = styled.div` 
width: 33.3%;
padding: 30px;
img{
  width: 100%;
}
h4{
  margin: 10px;
  font-weight: 200;
}
@media ${device.laptop} { 
   
}
@media ${device.tablet} {
 
}
@media ${device.mobileS} {
  
}
@media ${device.mobileM} {
  
}
@media ${device.mobileL} { 
    
}
`;

export const BodyProcess = styled.div` 
width: 100%;
display: flex;
background-color: #dfb248;
@media ${device.laptop} { 
   
}
@media ${device.tablet} {

}
@media ${device.mobileS} {
  
}
@media ${device.mobileM} {
  
}
@media ${device.mobileL} { 
    
}
`;

export const BodyProcessImg = styled.div` 
width: 100%;
padding: 100px;
 img{
   width: 100%
 }
 @media ${device.laptop} { 
   
}
@media ${device.tablet} {
  
}
@media ${device.mobileS} {
  
}
@media ${device.mobileM} {
  
}
@media ${device.mobileL} { 
    
}
`;