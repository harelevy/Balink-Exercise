import React, { useState } from "react";
import axios from "axios";
var countries = [];
//ES6 stateless component
const GetCountriesOptions = () => {
  axios
    .get("http://localhost:5000/getCountries")
    .then((response) => {
      for (let i = 0; i < response.data.countries.length; i++) {
        countries.push(response.data.countries[i]);
      }
    })
    .catch((error) => {});
  console.log(countries);
  return countries.map((country) => (
    <option value={country.name}>{country.name}</option>
  ));
};

export function FormFields(props) {
  return props.args.map((field, index) => {
    return (
      <tr>
        <td className="center text" colSpan="3">
          <label>{field.name}</label>
          {field.name === "Country" ? (
            <select
              className="text"
              id="country"
              name="country"
              type={field.type}
              value={field.value}
              onChange={(e) => {
                field.setValue(e.target.value);
              }}
            >
              <GetCountriesOptions />
            </select>
          ) : (
            <input
              className="text"
              type={field.type}
              value={field.value}
              onChange={(e) => {
                field.setValue(e.target.value);
              }}
            />
          )}
        </td>
      </tr>
    );
  });
}
