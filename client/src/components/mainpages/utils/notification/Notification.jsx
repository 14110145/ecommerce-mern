import React from "react";
import { ToastContainer, toast } from "react-toastify";

const Notification = ({ message, onClick }) => {
  toast(message);
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Notification;
