import React, { useState } from "react";
import Button from "./Button";
import "./CalcPayment.css";

const MakePayment = ({ rates, paymentData, setPaymentData, balance, paymentsTotal }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("GBP");
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");
  const [enoughMoney, setEnoughMoney] = useState(true);

  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    setSelectedCurrency(currency);
  };

  const handleAmountChange = (event) => {
    const newAmount = Number(event.target.value);
    setAmount(newAmount);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePaymentChange = () => {
    if (amount > 0 && description && amount < balance - paymentsTotal) {
      const newPayment = {
        date: getCurrentDate(),
        currency: selectedCurrency,
        amount: amount,
        description: description,
        status: "Complete"
      };
      setPaymentData([newPayment, ...paymentData]);
    } else {
      setEnoughMoney(false);
    }
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
        <form>
          <select onChange={handleCurrencyChange} defaultValue={selectedCurrency}>
            <option>GBP</option>
            {Object.keys(rates).map((currency, index) => (
              <option key={index}>{currency}</option>
            ))}
          </select>
          <input
            onChange={handleAmountChange}
            className="CalcPayment-amount"
            type="number"
            step="any"
            value={amount}
            required="required"
          />
          <input
            onChange={handleDescriptionChange}
            className="CalcPayment-description"
            type="text"
            placeholder="Description"
            required="required"
          />
        </form>
        {!enoughMoney && (
          <h3 style={{ color: "red" }}>"Oops, not enough money for this payment..."</h3>
        )}

        <div className="CalcPayment-calculate">
          <Button onClick={handlePaymentChange}>Make Payment</Button>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
