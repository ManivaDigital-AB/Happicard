import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";

import { css, styled, setup } from 'goober'
setup(React.createElement)

const Ol = styled('ol')`
  margin-left: 25;
  padding-bottom: 2.2rem;
  list-style-type: none;
`

const LiClass = props => css`
  display: inline-block;
  text-align: center;
  line-height: 4.5rem;
  padding: 0 0.7rem;
  cursor: pointer;

  color: ${props.state === 'todo' ? '#FFFF': '#118678'};
  border-bottom: 4px solid ${props.state === 'todo' ? '#FFFF' : '#118678'};

  &:before {
    position: relative;
    bottom: -3.99rem;
    float: left;
    left: 50%;

    ${props.state === 'todo' ? 'content: "\u039F";' : 
                       props.state === 'doing' ? 'content: "\u2022";' : 
                      'content: "\u2713";'}
    color: ${props.state === 'todo' ? 'silver' : 'white'};
    background-color: ${props.state === 'todo' ? 'white' : '#118678'};  
    width: 1.2em;
    line-height: ${props.state === 'todo' ? '1.2em' : '1.4em'};
    border-radius: ${props.state === 'todo' ? '0' : '1.2em'};
  }
  &:hover,
  &::before {
    color: #FFF;
  }
  &:after {
    content: "\\00a0\\00a0";
  }   
  span {
    padding: 0 1.5rem;
  }
`
const getTopNavStyles = (indx, length) => {
  let styles = []
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('done')
    } else if (i === indx) {
      styles.push('doing')
    } else {
      styles.push('todo')
    }
  }
  return styles
}

const getButtonsState = (indx, length) => {
  if (indx > 0 && indx < length - 1) {
    return {
      showPreviousBtn: indx == 1 ? false 
      : true,
      showNextBtn: true,
      showSubmitBtn: false

    }
  } else if (indx === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: false,
      showSubmitBtn: false
    }
  } else {
    return {
      showPreviousBtn: indx == 1 ? false : true,
      showNextBtn: false,
      showSubmitBtn: true
    }
  }
}

export default function MultiStep(props) {

  const dispatch = useDispatch();
  let showNav = true
  if (props.showNavigation) showNav = props.showNavigation

  let prevStyle = {}
  if (props.prevStyle) prevStyle = props.prevStyle

  let nextStyle = {}
  if (props.nextStyle) nextStyle = props.nextStyle

  const [stylesState, setStyles] = useState(getTopNavStyles(0, props.steps.length))
  const [compState, setComp] = useState(0)
  const [buttonsState, setButtons] = useState(getButtonsState(0, props.steps.length))
  const [displayError, setdisplayError] = useState(false);
  const [validationErrorMessage, setvalidationErrorMessage] = useState("");

  const setStepState = (indx) => {
    setStyles(getTopNavStyles(indx, props.steps.length))
    setComp(indx < props.steps.length ? indx : compState)
    setButtons(getButtonsState(indx , props.steps.length))
  }

  const next = () => {
    compState == 1 ? props.data.disableAmount = true : props.data.disableAmount = false;
    dispatch({ type: "GET_FRIEND_DETAILS", payload: props.data });
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if(props.data.happicard_recipient_email_choice)
    {
      if(props.data.happicard_recipient_email == "" || props.data.happicard_recipient_confirm_email == "")
      {
        setvalidationErrorMessage("Please enter and confirm friend's email");
        setdisplayError(true)
        return
      }

      if(props.data.happicard_recipient_email !== props.data.happicard_recipient_confirm_email )
      {
        setvalidationErrorMessage("Email and confirm email does not match!");
        setdisplayError(true)
        return
      }

      if(!pattern.test((props.data.happicard_recipient_email)))
      {
        setvalidationErrorMessage("Please enter a valid email");
        setdisplayError(true)
        return
      }
    }

    if(props.data.happicard_recipient_sms_choice)
    {
      if(props.data.happicard_recipient_number == "" || !(/^(([+]46)((70[{0-9}])|(72[{0-9})])|(73[{0-9}])|(76[{0-9}]))([\d]{6}))$/.test(props.data.happicard_recipient_number)))
      {
        setvalidationErrorMessage("Please enter friend's phone number in the format +46xxxxxxxxx");
        setdisplayError(true)
        return
      }
    }
    
    setdisplayError(false)
    setvalidationErrorMessage("");
    setStepState(compState + 1);
  }

  const previous = () => setStepState(compState > 0 ? compState - 1 : compState)

  const handleKeyDown = evt => evt.which === 13 ? next(props.steps.length) : {}

  const handleOnClick = evt => {
    if(evt.currentTarget.value === 0){return}
    if (
      evt.currentTarget.value === props.steps.length - 1 &&
      compState === props.steps.length - 1
    ) {
      setStepState(props.steps.length)
    } else {
      setStepState(evt.currentTarget.value)
    }
    if(evt.currentTarget.value === 1)
    {
      props.data.disableAmount = false
      dispatch({ type: "GET_FRIEND_DETAILS", payload: props.data });
    }
    if(evt.currentTarget.value === 2)
    {
      props.data.disableAmount = true
      dispatch({ type: "GET_FRIEND_DETAILS", payload: props.data });
    }
  }

  

  const renderSteps = () => (
    props.steps.map((s, i) => (
        <li
          className={LiClass({state: stylesState[i]})} 
          onClick={handleOnClick}
          key={i}
          value={i}
        >
         {i==0 && <span style={{fontSize: "12px", fontWeight: "700", color:"#4A4746"}}>PICK GIFT CARD</span>}
         {i==1 && <span style={{fontSize: "12px", fontWeight: "700", color:"#4A4746"}}>PERSONALIZE</span>}
         {i==2 && <span style={{fontSize: "12px", fontWeight: "700", color:"#4A4746"}}>CHECKOUT</span>}   
        </li>
    )))

  const renderNav = (show) =>
    show && (
      <div style={{textAlign: "center", marginBottom: "25px", backgroundColor: "#F0EEED", marginBottom: "15px"}}>
        {/* <button
          style={buttonsState.showPreviousBtn ? props.prevStyle : { display: 'none' }}
          onClick={previous}
        >
         Back to Checkout
        </button> */}

        <button
          style={buttonsState.showNextBtn ? props.nextStyle : { display: 'none' }}
          onClick={next} 
        >
          Proceed to payment
        </button>
      </div>
    )

    useEffect(() => {
      next();
    }, []);

  return (
    <div onKeyDown={handleKeyDown} >
      <Ol style={{textAlign: "center"}}>{renderSteps()}</Ol>
      <div>{props.steps[compState].component}</div>
      <div style={{textAlign: "center", backgroundColor: "rgb(240, 238, 237)", fontSize: "14px", color: "red", fontWeight: "600"}}>{displayError && (<><span>{validationErrorMessage}</span><br/></>)}</div>
      <div>{renderNav(showNav)}</div>
      </div>
  )
}
