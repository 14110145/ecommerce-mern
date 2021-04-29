import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { GlobalState } from "../../../GlobalState";

const OrderDetails = (props) => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;

  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) {
          setOrderDetails(item);
        }
      });
    }
  }, [orderDetails]);

  console.log({ orderDetails });
  if (orderDetails.length === 0) return null;

  return (
    <>
      <div className="history-page" style={{ margin: "30px 0" }}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Postal Code</th>
              <th>Country Code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orderDetails.address.recipient_name}</td>
              <td>{orderDetails.address.line1 + "-" + orderDetails.address.city}</td>
              <td>{orderDetails.address.postal_code}</td>
              <td>{orderDetails.address.country_code}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="history-page" style={{ margin: "30px 0" }}>
        <table>
          <thead>
            <tr>
              <th>Product_id</th>
              <th>Products</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.cart.map((item) => {
              return (
                <tr>
                  <td>
                    <img src={item.images.url} alt="" />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderDetails;
