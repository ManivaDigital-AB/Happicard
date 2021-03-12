import React, { useState } from "react";
import { Field, FieldInput, FieldTextArea } from "./Createorder.styles";
import DatePicker from "react-datepicker";
import moment from "moment";

export default ({ setForm, formData }) => {
  const [startDate, setStartDate] = useState(new Date());
  const {
    happicard_recipient_name,
    happicard_recipient_email_choice,
    happicard_recipient_email,
    happicard_recipient_confirm_email,
    happicard_recipient_sms_choice,
    happicard_recipient_number,
    happicard_personal_message,
    happicard_delivery_date
  } = formData;

  return (
    <div
      className="row justify-content-md-center"
      style={{
        padding: "15px 15px 15px 15px",
        backgroundColor: "#F0EEED",
        borderTopLeftRadius: "100px",
        borderTopRightRadius: "100px",
      }}
    >
      <div className="col-md-6">
        <div
          className="row justify-content-md-center"
          style={{
            backgroundColor: "#F0EEED",
            padding: "15px 15px 15px 15px",
          }}
        >
          <div
            className=""
            style={{
              backgroundColor: "#F0EEED",
              fontSize: "12px",
              lineHeight: "20px",
              letterSpacing: "0.49px",
            }}
          >
            <form>
              <div className="form-group">
                
                <Field className="form-group col-sm">
                <label>Delivery Date</label>
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
              </div>
              <div className="form-group">
                <Field className="form-group col-sm">
                  <label> Friend's name </label>
                  <FieldInput
                    name="happicard_recipient_name"
                    value={happicard_recipient_name}
                    onChange={setForm}
                    placeholder="Friends name"
                    className="form-control"
                  />
                </Field>
              </div>
              <div className="form-group">
                <div className="custom-control custom-switch" style={{marginLeft: "15px"}}>
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
                </div>
                {happicard_recipient_email_choice && (
                  <>
                    <Field
                      className="form-group col-sm"
                      style={{ marginTop: "25px" }}
                    >
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
                      className="form-group col-sm"
                      style={{ marginTop: "25px" }}
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
              </div>
              <div className="form-group">
                <div className="custom-control custom-switch" style={{marginLeft: "15px"}}>
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
                    SMS
                  </label>
                </div>

                {happicard_recipient_sms_choice && (
                  <>
                    <Field
                      className="form-group col-sm "
                      style={{ marginTop: "25px" }}
                    >
                      <label htmlFor="lastname"> Friends number </label>
                      <FieldInput
                        name="happicard_recipient_number"
                        value={happicard_recipient_number}
                        onChange={setForm}
                        placeholder="Phone number"
                        className="form-control"
                      />
                    </Field>
                  </>
                )}
              </div>
              <Field className="form-group col-sm" style={{marginTop: "30px"}}>
                <label htmlFor="message">Message</label>
                <FieldTextArea
                  name="happicard_personal_message"
                  value={happicard_personal_message}
                  placeholder="send happicard!"
                  className="form-control"
                  onChange={setForm}
                  rows="3"
                />
              </Field>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
