import React, { useState } from "react";
import "./Payments.css";
import SinglePayment from "./SinglePayment";
import payments from "../data/payments";

function Payments() {
  const [total, setTotal] = useState(0);
  const calculateTotal = (payment, data) => {
    differentTotal += Number(payment.amount / data.rates[payment.currency]);
  };
  let differentTotal = 0;
  const forLoop = async () => {
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].currency !== "GBP") {
        await fetch(`https://api.frankfurter.app/${payments[i].date}?from=GBP`)
          .then((res) => res.json())
          .then((data) => calculateTotal(payments[i], data))
          .catch((error) => console.error(error));
      } else {
        differentTotal += Number(payments[i].amount);
      }
    }
    setTotal(differentTotal.toFixed(2));
  };

  forLoop();

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
        {payments.map((payment, index) => {
          // for each payment object of payments array => return <SinglePayment /> and pass payment object as a prop
          return <SinglePayment payment={payment} key={index} />;
        })}
      </tbody>

      <tfoot>
        <tr>
          <td />
          <td />
          <td>{total > 0 ? total : "Loading..."}</td>
          <td>Total (GBP)</td>
          <td />
          <td />
        </tr>
      </tfoot>
    </table>
  );
}

export default Payments;
