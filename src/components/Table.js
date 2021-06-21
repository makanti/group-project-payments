import React from "react";
import SinglePayment from "./SinglePayment";

const Table = ({ paymentData, sum, setPaymentData, allPaymentData }) => {
  return paymentData.length > 0 ? (
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
          return (
            <SinglePayment
              payment={payment}
              key={index}
              index={index}
              setPaymentData={setPaymentData}
              paymentData={paymentData}
              allPaymentData={allPaymentData}
            />
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td />
          <td />
          <td>{sum ? sum : "Loading..."}</td>
          <td>Total (GBP)</td>
          <td />
          <td />
        </tr>
      </tfoot>
    </table>
  ) : (
    <h3>"No pending payments"</h3>
  );
};
export default Table;
