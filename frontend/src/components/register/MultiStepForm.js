import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import Contact from "./Contact";
import CompanyForm from "./CompanyForm";
import CompanyInfo from "./CompanyInfo";

const steps = [
  { id: "companyform" },
  { id: "companyDetails" },
  {id: "contactInfo"}
];

const defaultData = {
  corporate_form: "",
  company_name: "",
  company_category: "",
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
