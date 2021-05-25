import React from "react";
import "./Payments.css";
import SinglePayment from "./SinglePayment";
import payments from "../data/payments";
import Table from "./Table";

function Payments({ rates }) {
  const pendingPayments = () => payments.filter((element) => element.status === "Pending");
  const completedPayments = () => payments.filter((element) => element.status === "Complete");

  const showTotal = (arr) => {
    let total = 0;
    arr.map((element) => {
      if (element.currency === "GBP") {
        total += Number(element.amount);
      } else {
        total += Number(element.amount / rates[element.currency]);
      }
    });
    return total.toFixed(2);
  };
  return (
    <div>
      <Table
        payments={payments.filter((element) => element.status === "Pending")}
        rates={rates}
        showTotal={showTotal}
      />
      <Table
        payments={payments.filter((element) => element.status === "Complete")}
        rates={rates}
        showTotal={showTotal}
      />
    </div>
  );
}

export default Payments;
