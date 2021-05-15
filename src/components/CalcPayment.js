import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./CalcPayment.css";

const Payment = ({ currencies, rates, setRates }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState("0.00");
  const [convertedValue, setConvertedValue] = useState("0.00");

  const selectCurrency = (event) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);
  };

  const amountInput = (event) => {
    setAmount(event.target.value);
  };

  const handleChange = () => {
    setConvertedValue((amount * rates["GBP"]).toFixed(2));
  };

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?from=${selectedCurrency}`)
      .then((res) => res.json())
      .then((data) => {
        setRates(data.rates);
      })
      .catch((err) => console.error(err));
  }, [selectedCurrency]);

  return (
    <div className="CalcPayment">
      <h2 className="CalcPayment-label">Calculate Payment in GBP</h2>
      <div className="CalcPayment-control">
        <select onChange={selectCurrency} defaultValue={selectedCurrency}>
          {currencies.map((currency, index) => (
            <option key={index}>{currency}</option>
          ))}
        </select>
        <input
          onChange={amountInput}
          className="CalcPayment-amount"
          type="text"
          defaultValue="0.00"
        />
        is worth <span className="CalcPayment-result"> {convertedValue} </span> in GBP.
        <div className="CalcPayment-calculate">
          <Button onClick={handleChange}>Calculate</Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
