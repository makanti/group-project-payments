import React, { useState, useEffect } from "react";
import "./Balance.css";

const Balance = ({ total, rates, setRates }) => {
  const [convertTo, setConvertTo] = useState("USD");
  const [convertedValue, setConvertedValue] = useState("");
  const convertFrom = "GBP";

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?from=${convertFrom}`)
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
        setConvertedValue((total * data.rates["AUD"]).toFixed(2));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (currency) => {
    setConvertTo(currency);
    setConvertedValue((total * rates[convertTo]).toFixed(2));
  };

  return (
    <div className="total">
      <h2 className="Balance-title">
        Your account balance is
        <span className="Balance-total">£{total}</span>
      </h2>
      <div className="Balance-alt">
        {convertedValue !== "" && `Your balance is ${convertedValue}`}
        <select onChange={(event) => handleChange(event.target.value)}>
          {Object.keys(rates).map((currency, index) => (
            <option key={index}>{currency}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Balance;
