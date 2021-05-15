import React, { useState } from "react";
import Balance from "./components/Balance";
import CalcPayment from "./components/CalcPayment";
import Payments from "./components/Payments";
import currencies from "./data/currencies";
import "./App.css";

const App = () => {
  const [rates, setRates] = useState("");
  const balance = 87.43;

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Payments</h1>
      </header>
      <Balance total={balance} rates={rates} setRates={setRates} />
      <CalcPayment currencies={currencies} rates={rates} setRates={setRates} />
      <h2>Payments</h2>
      <Payments rates={rates} />
    </div>
  );
};

export default App;
