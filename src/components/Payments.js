import React, { useState } from "react";
import "./Payments.css";
import SinglePayment from "./SinglePayment";

function Payments({ paymentData }) {
  const [sum, setSum] = useState(0);

  const calculateSum = (payment, data) => {
    sumOfPayments += Number(payment.amount / data.rates[payment.currency]);
  };

  let sumOfPayments = 0;

  const fetchRatesAndCalculateSum = async () => {
    for (let i = 0; i < paymentData.length; i++) {
      if (paymentData[i].currency !== "GBP") {
        await fetch(`https://api.frankfurter.app/${paymentData[i].date}?from=GBP`)
          .then((res) => res.json())
          .then((data) => calculateSum(paymentData[i], data))
          .catch((error) => console.error(error));
      } else {
        sumOfPayments += Number(paymentData[i].amount);
      }
    }
    setSum(sumOfPayments.toFixed(2));
  };

  fetchRatesAndCalculateSum();

  return (
    <table className="Payments">
      <thead>
        <tr>
          <th>Date</th>
          <th>Cur</th>
          <th>Amount</th>
          <th className="Payments-description">Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {paymentData.map((payment, index) => {
          // for each payment object of payments array => return <SinglePayment /> and pass payment object as a prop
          return <SinglePayment payment={payment} key={index} />;
        })}
      </tbody>

      <tfoot>
        <tr>
          <td />
          <td />
          <td>{sum > 0 ? sum : "Loading..."}</td>
          <td>Total (GBP)</td>
          <td />
          <td />
        </tr>
      </tfoot>
    </table>
  );
}

export default Payments;
