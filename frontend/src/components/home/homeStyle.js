import styled from "styled-components";
import { device } from "../../components/common/device";

export const BodyContainer = styled.div`
background-color: #dfb248;
width: 100%;

img{
    width: 100%;
}
   
      @media ${device.laptop} { 
   
      }
      @media ${device.tablet} {
      
        
      }
      @media ${device.mobileS} {
        
        padding: 50px;
      }
      @media ${device.mobileM} {
        
        padding: 50px;
      }
      @media ${device.mobileL} { 
        padding: 50px;
       
      }
`;


export const LeftHeaderContainer = styled.div`
padding: 100px;
width: 50%;
background-color: #dfb248;
.img-header{
    width: 100%;
    height: 100%;
 }

h5{
    color: #222;
    font-weight: bold;
    font-size: 28px;
    white-space: nowrap;
}

p{
    color: #fff;
    font-weight: bold;
    font-size: 28px;
}

 a{
    text-decoration: none;
    background: white;
    color: black;
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, sans-serif;
    padding: 5px 20px;
    border: 2px solid rgb(223, 178, 72);
    border-radius: 28px;
    width: 140px;
    outline: none;
    white-space: nowrap;
   }

   a:hover{
       outline: none;
       background-color: rgb(223, 178, 72);
       color: #fff;
   }

@media ${device.tablet} {
    h5{

        font-size: 21px;
    }
    
    p{

        font-size: 21px;
    }
}
@media ${device.mobileS} {
    width: 100%;
    h5{

        font-size: 15px;
    }
    
    p{

        font-size: 15px;
    }
    padding: 10px;
}
@media ${device.mobileM} {
    width: 100%;
    padding: 10px;
    h5{

        font-size: 18px;
    }
    
    p{

        font-size: 18px;
    }
}
@media ${device.mobileL} { 
    width: 100%;
    padding: 10px;
    h5{

        font-size: 18px;
    }
    
    p{

        font-size: 18px;
    }
}
`;

export const RightHeaderContainer = styled.div` 
width: 50%;
padding: 100px;
img{
width: 100%;
}


@media ${device.tablet} {
    padding: 50px;
}
@media ${device.mobileS} {
    width: 100%;
    margin-top: 0px;
    padding: 10px;
}
@media ${device.mobileM} {
    width: 100%;
    margin-top: 0px;
    padding: 10px;
}
@media ${device.mobileL} { 
    width: 100%;
    margin-top: 0px;
    padding: 10px;
}
`;

