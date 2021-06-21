import React from "react";
import Button from "./Button";

const SinglePayment = ({ payment, index, setPaymentData, paymentData, allPaymentData }) => {
  const { date, currency, amount, description, status } = payment;

  const cancelPendingPayment = () => {
    setPaymentData([...allPaymentData.slice(index + 1)]);
  };

  return (
    <tr>
      <td>{date}</td>
      <td>{currency}</td>
      <td>{amount}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>
        {status === "Pending" && <Button onClick={() => cancelPendingPayment()}>Cancel</Button>}
      </td>
    </tr>
  );
};

export default SinglePayment;
