import styled from "styled-components";

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
`;


export const LeftHeaderContainer = styled.div`
width: 40%;
height: 400px;
background-color: #dfb248;
.img-header{
    padding: 100px 120px 0px 120px;
    height: 100%;
 }
 .img-header-1{
  position: absolute;
  width: 25%;
  left: 18.5%;
 }
`;

export const RightHeaderContainer = styled.div` 
width: 40%;
margin-left: 150px;
`;

export const ElementProcess = styled.div` 
width: 33.3%;
padding: 30px;
`;

export const BodyProcess = styled.div` 
margin-top: 100px;
width: 100%;
display: flex;
background-color: #dfb248;
`;