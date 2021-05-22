import React from "react";
import pin from "./icon/pin.svg";
import phone from "./icon/phone.svg";
import email from "./icon/email.svg";
import google from "./icon/google.svg";
import facebook from "./icon/facebook.svg";
import instagram from "./icon/instagram.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__column">
        <div className="footer__column-title">
          <span>about us</span>
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur error sequi neque impedit
          aperiam nemo molestiae optio consectetur adipisicing elit. Distinctio sunt vero corrupti eaque suscipit iusto,
          repudiandae rerum vitae
        </p>
        <div className="footer__icon">
          <img src={facebook} alt="" />
          <img src={instagram} alt="" />
          <img src={google} alt="" />
        </div>
      </div>

      <div className="footer__column">
        <div className="footer__column-title">
          <span>address</span>
        </div>
        <div className="footer__column-location">
          <img src={pin} alt="" />
          <p>11, 72 street, Thu duc district, TP.HCM</p>
        </div>

        <div className="footer__column-location">
          <img src={phone} alt="" />
          <p>0987 789 789</p>
        </div>

        <div className="footer__column-location">
          <img src={email} alt="" />
          <p>phult@gmail.com</p>
        </div>
      </div>

      <div className="footer__column">
        <div className="footer__column-title">
          <span>Contact us</span>
        </div>
        <div className="footer__form">
          <div className="footer__form-row">
            <label htmlFor="">Email</label>
            <input type="text" name="" />
          </div>
          <div className="footer__form-row">
            <label>Message</label>
            <textarea rows="5"></textarea>
          </div>
          <button className="footer__form-btn">Send</button>
        </div>
      </div>

      <div className="footer__column" style={{ textAlign: "center" }}>
        @Copyright 2021 ABC-DEF-GHI-NML
      </div>
    </footer>
  );
};

export default Footer;
