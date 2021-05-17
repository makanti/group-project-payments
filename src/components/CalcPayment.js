import React, { useState } from "react";
import Button from "./Button";
import "./CalcPayment.css";

const Payment = ({ rates }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState("0.00");
  const [convertedValue, setConvertedValue] = useState("0.00");

  const selectCurrency = (event) => setSelectedCurrency(event.target.value);

  const amountInput = (event) => setAmount(event.target.value);

  const handleChange = () => setConvertedValue((amount / rates[selectedCurrency]).toFixed(2));

  return (
    <div className="CalcPayment">
      <h2 className="CalcPayment-label">Calculate Payment in GBP</h2>
      <div className="CalcPayment-control">
        <select onChange={selectCurrency} defaultValue={selectedCurrency}>
          {Object.keys(rates).map((currency, index) => (
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
