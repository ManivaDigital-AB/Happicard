import React from "react";
import { useStep } from "react-hooks-helper";
import useForm from "./../../pages/useForm";

import Contact from "./Contact";
import CompanyForm from "./CompanyForm";
import CompanyInfo from "./CompanyInfo";

const steps = [
  { id: "register"},
  { id: "companyform" },
  { id: "companyDetails" },
  { id: "contactInfo"}
];

const defaultData = {
  checked_Aktiebolag: false,
  checked_Ideella_föreningar: false,
  corporate_form: "",
  company_name: "",
  company_category: 0,
  company_address: "",
  company_website: "",
  first_name: "",
  last_name: "",
  company_role:"",
  phone_number:"",
  email:"",
  comments:""
};

const MultiStepForm = () => {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { formData, setForm, navigation };

  switch (id) {
    case "register":
      return <button style={{
        marginBottom: "20px",
        marginRight: "15px",
        width:"100px",
        height:  "30px",
        backgroundColor: "#ffc542",
        color: "#4A4746",
        border: "none",
        borderRadius: "15px",
        outline: "none",
        fontSize: "12px",
        fontWeight: "700" }} onClick={navigation.next}>Register</button>;
      case "companyform":
      return <CompanyForm {...props} />;
      case "companyDetails":
      return <CompanyInfo {...props} />;
      case "contactInfo":
      return <Contact {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;
