import React, { useState } from "react";
import Balance from "./components/Balance";
import CalcPayment from "./components/CalcPayment";
import MakePayment from "./components/MakePayment";
import Payments from "./components/Payments";
import currencies from "./data/currencies";
import "./App.css";
import payments from "./data/payments";

const App = () => {
  const [rates, setRates] = useState("");
  const [paymentData, setPaymentData] = useState(payments);

  const balance = 87.43;

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Payments</h1>
      </header>
      <Balance total={balance} rates={rates} setRates={setRates} />
      <CalcPayment rates={rates} />
      <MakePayment rates={rates} paymentData={paymentData} setPaymentData={setPaymentData} />
      <h2>Payments</h2>
      <Payments rates={rates} paymentData={paymentData} />
    </div>
  );
};

export default App;
