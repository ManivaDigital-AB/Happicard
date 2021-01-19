import React, { Component } from 'react';
import {BodyContainer, LeftContainer,RightContainer } from "../contact/contactStyle";
import MapIcon from '../../assets/images/about/Map.PNG'
import TelIcon from '../../assets/images/about/Telephone.PNG'
import EmailIcon from '../../assets/images/about/Email.PNG'
class contact extends Component {  
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){  
    }  

  render() {
    return (
    <>
        <BodyContainer>
           <LeftContainer>
               <h4>Contact Us</h4>
               <div className="form-group">
                  <label>Name</label>
                  <input placeholder="John"/>              
               </div>
     
               <div className="form-group">
                  <label>Email Address</label>
               <input placeholder="example@email.com" />
               </div>
               <div className="form-group">
                  <label>Subject</label>
               <input placeholder="Reason for contacting" />
               </div>
               <div className="form-group">
                  <label>Message</label>
               <textarea placeholder="Message"></textarea>
               </div>
               <div className="form-group">
                   <button>Send Request</button>
               </div>
           </LeftContainer>
           <RightContainer>
           <h4>Get in Touch</h4>
           <div className="form-group form-row">
               <img src={MapIcon}/>
              <span>Address</span>
           </div>
           <div className="form-group">
               <img src={TelIcon}/>
               <span>+46 1234 567 98</span>
           </div>
           <div className="form-group">
               <img src={EmailIcon}/>
              <span>help@happicard.se</span>
           </div>
           </RightContainer>
          
        </BodyContainer>
    </>
    );
  }
}


export default contact;