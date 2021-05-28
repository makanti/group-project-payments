import React, { useState } from "react";
import "./Payments.css";
import Table from "./Table";

function Payments({ paymentData }) {
  const pendingPayments = paymentData.filter((payment) => payment.status === "Pending");
  const completedPayments = paymentData.filter((payment) => payment.status === "Complete");

  const [pendingSum, setPendingSum] = useState(0);
  const [completedSum, setCompletedSum] = useState(0);

  const calculateSum = (payment, data) => {
    if (payment.status === "Pending") {
      sumOfPendingPayments += Number(payment.amount / data.rates[payment.currency]);
    } else {
      sumOfCompletedPayments += Number(payment.amount / data.rates[payment.currency]);
    }
  };

  let sumOfPendingPayments = 0;
  let sumOfCompletedPayments = 0;

  const fetchRatesAndCalculateSum = async () => {
    for (let i = 0; i < paymentData.length; i++) {
      if (paymentData[i].currency !== "GBP") {
        await fetch(`https://api.frankfurter.app/${paymentData[i].date}?from=GBP`)
          .then((res) => res.json())
          .then((data) => calculateSum(paymentData[i], data))
          .catch((error) => console.error(error));
      } else {
        if (paymentData[i].status === "Pending") {
          sumOfPendingPayments += Number(paymentData[i].amount);
        } else {
          sumOfCompletedPayments += Number(paymentData[i].amount);
        }
      }
    }
    setPendingSum(sumOfPendingPayments.toFixed(2));
    setCompletedSum(sumOfCompletedPayments.toFixed(2));
  };

  fetchRatesAndCalculateSum();

  return (
    <div>
      <Table paymentData={pendingPayments} sum={pendingSum} />
      <Table paymentData={completedPayments} sum={completedSum} />
    </div>
  );
}
export default Payments;
