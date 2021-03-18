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
[["Anhörigstöd","Anhörigstöd"],
["Barn","Barn"],
["Mode herr","Mode herr"],
["Bevarande projekt","Bevarande projekt"],
["Fadderverksamhet","Fadderverksamhet"],
["Familjer","Familjer"],
["Flyktingar","Flyktingar"],
["Förebyggande arbete","Förebyggande arbete"],
["Föräldralösa barn","Föräldralösa barn"],
["Hemlösa","Hemlösa"],
["Föräldralösa barn","Föräldralösa barn"],
["Hjälp till enskilda","Hjälp till enskilda"],
["Föräldralösa barn","Föräldralösa barn"],
["Hjälp till självhjälp","Hjälp till självhjälp"],
["Jordbruk","Jordbruk"],
["Jämställdhet","Jämställdhet"],
["Jordbruk","Jordbruk"],
["Katastrofhjälp","Katastrofhjälp"],
["Kvinnor","Kvinnor"],
["Mikrolån/Mikrokrediter","Mikrolån/Mikrokrediter"],
["Personalutveckling","Personalutveckling"],
["Rehabilitering","Rehabilitering"],
["Rättshjälp","Rättshjälp"],
["Second hand","Second hand"],
["Sjukhus/Vårdhem/Äldreboende","Sjukhus/Vårdhem/Äldreboende"],
["Skyddat boende","Skyddat boende"],
["Telefonjour","Telefonjour"],
["Trafficking","Trafficking"],
["Ungdom","Ungdom"],
["Utbildning - grund","Utbildning - grund"],
["Utbildning - högre","Utbildning - högre"],
["Utbildning - yrkes","Utbildning - yrkes"],
["Vatten/Sanitets projekt","Vatten/Sanitets projekt"],
["Verksamhet för sjuka","Verksamhet för sjuka"],
["Volontärer","Volontärer"],
["Vuxna","Vuxna"],
["Äldre","Äldre"],
["Annat","Annat"],]

const storeCategories = 
[
["Mode","Mode"],
["Mode kvinna","Mode kvinna"],
["Mode herr","Mode herr"],
["Hus & Hem","Hus & Hem"],
["Livsmedel","Livsmedel"],
["Mat & Dryck","Mat & Dryck"],
["Musik, Böcker & Spel","Musik, Böcker & Spel"],
["Semester & Resor","Semester & Resor"],
["Underhållning & Upplevelser","Underhållning & Upplevelser"]]

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
