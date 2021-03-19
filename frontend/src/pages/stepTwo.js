import React, { useState } from "react";
import { Field, FieldInput, FieldTextArea } from "./Createorder.styles";
import DatePicker from "react-datepicker";
import moment from "moment";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';


export default ({ setForm, formData }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [characterCount, setCharacterCount] = useState(0);
  const {
    happicard_recipient_name,
    happicard_recipient_email_choice,
    happicard_recipient_email,
    happicard_recipient_confirm_email,
    happicard_recipient_sms_choice,
    happicard_recipient_number,
    happicard_personal_message,
    happicard_recipient_email_error,
    happicard_delivery_date
  } = formData;

  return (
    <div
    className="row justify-content-md-center"
    style={{
      paddingTop:"50px",
      backgroundColor: "#F0EEED",
      borderTopLeftRadius: "100px",
      borderTopRightRadius: "100px",
    }}
  >
    <div className="col-md-6">
      <h4 style={{paddingBottom: "25px", textAlign: "center", fontSize: "18"}}>PERSONALIZE</h4>
      <form>
      <div className="form-row">
                  <Field className="form-group col-md-6">
                    <label> Delivery Date </label>
                    <DatePicker
                    name="happicard_delivery_date"
                    className="form-control"
                    selected={happicard_delivery_date == "" ? startDate : happicard_delivery_date}
                    onChange={(value, event) => {
                      console.log(value);
                      setStartDate(value);
                      event.target = {type:"text", value: value , name: "happicard_delivery_date"}
                      setForm(event)
                      }}
                     minDate={moment().toDate()}
                    style={{
                      border: "1px solid #ffc541",
                      backgroundColor: "#f0eeed",
                    }}
                  /> 
                  </Field>
                  <Field className="form-group col-md-6">
                    <label > Friend's name </label>
                    <FieldInput
                    name="happicard_recipient_name"
                    value={happicard_recipient_name}
                    onChange={setForm}
                    placeholder="Friends name"
                    className="form-control"
                  />
                  </Field>
                  <div className="col-md-12">
                  <h5 style={{paddingBottom: "25px", textAlign: "center", fontSize: "18"}}>NOTIFICATION</h5>
                  </div>
                  <Field className="form-group col-md-6" style={{ marginTop: "5px" }} >
                    <div className="custom-control custom-switch" style={{marginLeft: "-6px"}}>
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="Email"
                      name="happicard_recipient_email_choice"
                      value={happicard_recipient_email_choice}
                      checked={happicard_recipient_email_choice}
                      onChange={setForm}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="Email"
                    >
                      Email
                    </label>
                    </div></Field>
                  <Field className="form-group col-md-6" ></Field>
                  {happicard_recipient_email_choice && (
                  <><Field className="form-group col-md-6">
                      <label> Friends email </label>
                      <FieldInput
                        name="happicard_recipient_email"
                        value={happicard_recipient_email}
                        onChange={setForm}
                        placeholder="Friend's email"
                        className="form-control"
                      />
                  </Field>
                    <Field
                      className="form-group col-md-6"
                    >
                      <label> Confirm friend's email </label>
                      <FieldInput
                        name="happicard_recipient_confirm_email"
                        value={happicard_recipient_confirm_email}
                        onChange={setForm}
                        placeholder="Confirm Friend's email"
                        className="form-control"
                      />
                    </Field>
                    </>
                )}
                  
                  <Field className="form-group col-md-6" style={{ marginTop: "5px" }} >
                  <div className="custom-control custom-switch" style={{marginLeft: "-6px"}}>
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="SMS"
                    name="happicard_recipient_sms_choice"
                    value={happicard_recipient_sms_choice}
                    checked={happicard_recipient_sms_choice}
                    onChange={setForm}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="SMS"
                  >
                    SMS - Carrier charges will apply
                  </label>
                </div></Field>
                <Field className="form-group col-md-6" ></Field>
                  {happicard_recipient_sms_choice && (
                  <>
                  <Field className="form-group col-md-6">
                       <label htmlFor="lastname"> Friends number </label>
                      <FieldInput
                        name="happicard_recipient_number"
                        value={happicard_recipient_number}
                        onChange={setForm}
                        placeholder="Phone number"
                        className="form-control"
                      />
                  </Field>
                  <Field className="form-group col-md-6" ></Field>
                  </>
                )}
                <Field className="form-group col-sm" style={{marginTop: "15px"}}>
                <label htmlFor="message">Message</label>
                <FieldTextArea
                  name="happicard_personal_message"
                  value={happicard_personal_message}
                  placeholder="Send Happicard!"
                  className="form-control"
                  onChange={(event) => {
                    setCharacterCount(event.target.value.length)
                    setForm(event)
                    }}
                  rows="4"
                  maxLength={140}
                />
                <p style={{fontSize:"12px", fontWeight: "600", float: "right"}}>{characterCount}/140</p>
              </Field>
        </div></form></div>
   
    </div>
     
  );
};
