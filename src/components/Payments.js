import React, { useEffect, useState } from "react";
import "./Payments.css";
import Table from "./Table";

function Payments({ paymentData, setPaymentData, setPaymentsTotal }) {
  const [pendingPay, setPendingPay] = useState([]);
  const [completedPay, setCompletedPay] = useState([]);

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

  useEffect(() => {
    setPendingPay(paymentData.filter((payment) => payment.status === "Pending"));
    setCompletedPay(paymentData.filter((payment) => payment.status === "Complete"));
    fetchRatesAndCalculateSum();
  }, [paymentData]);

  useEffect(() => {
    setPaymentsTotal(Number(pendingSum) + Number(completedSum));
  }, [pendingSum, completedSum]);

  return (
    <div>
      <Table
        paymentData={pendingPay}
        allPaymentData={paymentData}
        Î
        sum={pendingSum}
        setPaymentData={setPaymentData}
      />
      <Table paymentData={completedPay} sum={completedSum} />
    </div>
  );
}
export default Payments;
