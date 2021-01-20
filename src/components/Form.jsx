import React, { useState } from "react";
import { FormFields } from "./FormFields.jsx";
import "../css/Form.css";
import axios from "axios";
export function Form() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [optin, setOptin] = useState(true);
  const [formNumber, setFormNumber] = useState(0);

  var form1Arguments = [
    {
      name: "First Name",
      value: firstName,
      setValue: setFirstName,
      type: "text",
      required: true,
    },
    {
      name: "Last Name",
      value: lastName,
      setValue: setLastName,
      type: "text",
      required: true,
    },
    {
      name: "Title",
      value: title,
      setValue: setTitle,
      type: "text",
      required: false,
    },
  ];
  var form2Arguments = [
    {
      name: "Country",
      value: country,
      setValue: setCountry,
      type: "text",
      required: true,
    },
    {
      name: "City",
      value: city,
      setValue: setCity,
      type: "text",
      required: false,
    },
    {
      name: "Street",
      value: street,
      setValue: setStreet,
      type: "text",
      required: false,
    },
  ];
  var form3Arguments = [
    {
      name: "Email",
      value: email,
      setValue: setEmail,
      type: "email",
      required: true,
    },
    {
      name: "Phone",
      value: phone,
      setValue: setPhone,
      type: "cell",
      required: false,
    },
    {
      name: "Optin",
      value: optin,
      setValue: setOptin,
      type: "checkbox",
      required: false,
    },
  ];

  var formsArguments = [form1Arguments, form2Arguments, form3Arguments];

  return (
    <table>
      <tr>
        <td className="languagePicker" colSpan={3}>
          <select id="country" name="country">
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <div className="progressBar">1</div>
        </td>
        <td>
          <div className="progressBar">2</div>
        </td>
        <td>
          <div className="progressBar">3</div>
        </td>
      </tr>
      <tr>
        <td className="center text">Personal</td>
        <td className="center text">Address</td>
        <td className="center text">Contactability</td>
      </tr>
      <FormFields args={formsArguments[formNumber]} />
      <tr>
        {formNumber > 0 ? (
          <td>
            <button
              className="PassButton text"
              onClick={() => {
                setFormNumber(formNumber - 1);
              }}
            >
              prev
            </button>
          </td>
        ) : null}
        {formNumber === formsArguments.length - 1 ? (
          <td>
            <button
              className="submitButton text"
              onClick={() => {
                axios
                  .post("http://localhost:5000/submit", {
                    data: formsArguments,
                  })
                  .then((response) => {
                    alert("Success!\nThank you.");
                  })
                  .catch((error) => {
                    alert(error);
                  });
              }}
            >
              Submit
            </button>
          </td>
        ) : null}
        {formNumber < formsArguments.length - 1 ? (
          <td>
            <button
              className="PassButton text"
              onClick={() => {
                if (checkValidity(formsArguments[formNumber])) {
                  setFormNumber(formNumber + 1);
                } else {
                  alert("error");
                }
              }}
            >
              next
            </button>
          </td>
        ) : null}
      </tr>
    </table>
  );
}
function checkValidity(form) {
  for (let i = 0; i < form.length; i++) {
    if (form[i].required === true && form[i].value === "") {
      return false;
    }
    if (form[i].type === "email" && !isValidEmail(form[i].value)) {
      return false;
    }
    if (form[i].type === "cell" && !isValidCellPhone(form[i].value)) {
      return false;
    }
    if (form[i].name === "Country" && form[i].value === "Choose a country") {
      return false;
    }
  }

  return true;
}
function isValidEmail(val) {
  let regEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  if (regEmail.test(val)) {
    return true;
  }
  return false;
}
function isValidCellPhone(val) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (val.match(phoneno)) {
    return true;
  } else {
    alert("message");
    return false;
  }
}
