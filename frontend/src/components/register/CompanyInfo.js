import React, {useState} from "react";

import ItemForm from "./ItemForm";
import CompanyFormDrop from "./CompanyFormDrop";

const CompanyInfo = ({ setForm, formData, navigation }) => {
  const { company_name, company_category, company_address, company_website, corporate_form, checked_Aktiebolag   } = formData;
  const [ nameError, setnameError] = useState(false);
  const [ categoryError, setcategoryError] = useState(false);
  const { next, previous } = navigation;

  const ValidateCompanyInfo = () => {
    company_name == "" ? setnameError(true) : setnameError(false);
    company_category == 0 ? setcategoryError(true) : setcategoryError(false);
    if(company_name != "" && company_category != 0){next()}
  }

  const handleNameOnChange = (e) => {
    e.target.name == "company_name" && e.target.value == "" ? setnameError(true) : setnameError(false);
    setForm(e);
  }

  const handleCategoryOnChange = (e) => {
    e.target.name == "company_category" && e.target.value == 0 ? setcategoryError(true) : setcategoryError(false);
    setForm(e);
  }

const ngoCategories = 
[["0","Alla verksamhetsområden"],
["1","Anhörigstöd"],
["2","Barn"],
["3","Mode herr"],
["4","Bevarande projekt"],
["5","Fadderverksamhet"],
["6","Familjer"],
["7","Flyktingar"],
["8","Förebyggande arbete"],
["9","Föräldralösa barn"],
["10","Hemlösa"],
["9","Föräldralösa barn"],
["10","Hjälp till enskilda"],
["11","Föräldralösa barn"],
["12","Hjälp till självhjälp"],
["13","Jordbruk"],
["14","Jämställdhet"],
["15","Jordbruk"],
["16","Katastrofhjälp"],
["17","Kvinnor"],
["18","Mikrolån/Mikrokrediter"],
["19","Personalutveckling"],
["20","Rehabilitering"],
["21","Rättshjälp"],
["22","Second hand"],
["23","Sjukhus/Vårdhem/Äldreboende"],
["24","Skyddat boende"],
["25","Telefonjour"],
["26","Trafficking"],
["27","Ungdom"],
["28","Utbildning - grund"],
["29","Utbildning - högre"],
["30","Utbildning - yrkes"],
["31","Vatten/Sanitets projekt"],
["32","Verksamhet för sjuka"],
["33","Volontärer"],
["34","Vuxna"],
["35","Äldre"],
["36","Annat"],]

const storeCategories = 
[["0","Alla kategorier"],
["1","Mode"],
["2","Mode kvinna"],
["3","Mode herr"],
["4","Hus & Hem"],
["5","Livsmedel"],
["6","Mat & Dryck"],
["7","Musik, Böcker & Spel"],
["8","Semester & Resor"],
["9","Underhållning & Upplevelser"]]

return (
    <>
    <div className="row justify-content-md-center">
      <h4 style={{fontSize: "14px", paddingBottom: "15px", fontWeight: "700"}}>ORGANISATION INFO</h4></div>
    <div className="form">
      <ItemForm
        label="Company Name"
        name="company_name"
        value={company_name}
        isMandatory={true}
        onChange={handleNameOnChange}
        placeholder="Name of your company"
        error={nameError}
        errorMessage={"company name is mandatory"}
      />
      <CompanyFormDrop label="Company Form" name="company_category" value={company_category} onChange={handleCategoryOnChange} error={categoryError} errorMessage={"company category is mandatory!"} options={checked_Aktiebolag ? storeCategories : ngoCategories }/>
      <ItemForm
        label="Company Address"
        name="company_address"
        value={company_address}
        isMandatory={false}
        onChange={setForm}
        placeholder="Your company address"
      />
      <ItemForm
        label="Company Website"
        name="company_website"
        value={company_website}
        isMandatory={false}
        onChange={setForm}
        placeholder="Your company web url"
      />
      <div>
        <button style={{
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
          fontWeight: "700" }} onClick={previous}>Previous</button>
        <button style={{
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
          fontWeight: "700" }} onClick={ValidateCompanyInfo}>Next</button>
      </div>
      </div>
      </>
  );
};

export default CompanyInfo;
