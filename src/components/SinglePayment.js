import React from "react";
import Button from "./Button";

const SinglePayment = ({ payment, index, setPaymentData, paymentData }) => {
  const { date, currency, amount, description, status } = payment;

  const cancelPendingPayment = (arr, index) => {
    arr.splice(index, 1);
    setPaymentData(arr);
  };

  return (
    <tr>
      <td>{date}</td>
      <td>{currency}</td>
      <td>{amount}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>
        {status === "Pending" && (
          <Button onClick={() => cancelPendingPayment(paymentData, index)}>Cancel</Button>
        )}
      </td>
    </tr>
  );
};

export default SinglePayment;
