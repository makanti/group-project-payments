import React from "react";
import Button from "./Button";

const SinglePayment = ({ payment }) => {
  const { date, currency, amount, description, status } = payment;
  return (
    <tr>
      <td>{date}</td>
      <td>{currency}</td>
      <td>{amount}</td>
      <td>{description}</td>
      <td>{status}</td>
      <td>{status === "Pending" && <Button>Cancel</Button>}</td>
    </tr>
  );
};

export default SinglePayment;
