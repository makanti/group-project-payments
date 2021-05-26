import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./CalcPayment.css";

const MakePayment = ({ rates, paymentData, setPaymentData }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("GBP");
  const [amount, setAmount] = useState("0.00");
  const [description, setDescription] = useState("");

  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);
  };

  const handleAmountChange = (event) => {
    const newAmount = event.target.value;
    if (!Number(newAmount)) {
      alert("The amount must be a number");
    }
    setAmount(newAmount);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePaymentChange = () => {
    const newPayment = {
      date: getCurrentDate(),
      currency: selectedCurrency,
      amount: amount,
      description: description,
      status: "Complete"
    };
    setPaymentData([newPayment, ...paymentData]);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    return date;
  };

  return (
    <div className="CalcPayment">
      <h2 className="CalcPayment-label">Make Payment</h2>
      <div className="CalcPayment-control">
        <select onChange={handleCurrencyChange} defaultValue={selectedCurrency}>
          <option>GBP</option>
          {Object.keys(rates).map((currency, index) => (
            <option key={index}>{currency}</option>
          ))}
        </select>
        <input
          onChange={handleAmountChange}
          className="CalcPayment-amount"
          type="text"
          value={amount}
          required
        />
        <input
          onChange={handleDescriptionChange}
          className="CalcPayment-description"
          type="text"
          placeholder="Description"
        />
        <div className="CalcPayment-calculate">
          <Button onClick={handlePaymentChange}>Make Payment</Button>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
