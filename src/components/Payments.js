import React from "react";
import "./Payments.css";
import SinglePayment from "./SinglePayment";
import payments from "../data/payments";

function Payments({ rates, paymentData }) {
  const showTotal = () => {
    let total = 0;
    paymentData.map((element) => {
      if (element.currency === "GBP") {
        total += Number(element.amount);
      } else {
        total += Number(element.amount / rates[element.currency]);
      }
    });
    return total.toFixed(2);
  };
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
          <td> {showTotal()}</td>
          <td>Total (GBP)</td>
          <td />
          <td />
        </tr>
      </tfoot>
    </table>
  );
}

export default Payments;
