import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

const Orderhistory = (props) => {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", { headers: { Authorization: token } });

          setHistory(res.data.payment);
        } else {
          const res = await axios.get("/user/history", { headers: { Authorization: token } });
          console.log({ res });
          setHistory(res.data.history);
        }
      };

      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  return (
    <div className="history-page">
      <h2>History</h2>
      <h4>You have {history.length} ordered</h4>

      <table>
        <thead>
          <tr>
            <th>PaymentID</th>
            <th>Date of Purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.map((items) => {
            return (
              <tr key={items._id}>
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/history/${items._id}`}>Details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orderhistory;
