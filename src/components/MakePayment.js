import React, { useState, useEffect } from "react";
import Button from "./Button";
import "./CalcPayment.css";

const MakePayment = ({ rates, paymentData, setPaymentData }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("GBP");
  const [amount, setAmount] = useState("0.00");
  const [description, setDescription] = useState("");

  const selectCurrency = (event) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);
  };

  const amountInput = (event) => {
    setAmount(event.target.value);
  };

  const descriptionInput = (event) => {
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
        <select onChange={selectCurrency} defaultValue={selectedCurrency}>
          <option>GBP</option>
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
        <input
          onChange={descriptionInput}
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
