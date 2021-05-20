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
      <div className="footer__about-us">
        <div className="about-us__title">
          <span>about us</span>
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus consequatur error sequi neque impedit
          aperiam nemo molestiae optio
        </p>
        <div className="about-us__icon">
          <img src={facebook} alt="" />
          <img src={instagram} alt="" />
          <img src={google} alt="" />
        </div>
      </div>

      <div className="footer__location">
        <div className="location__title">
          <span>address</span>
        </div>
        <div className="location__pin">
          <img src={pin} alt="" />
          <p>11, 72 street, Thu duc district, TP.HCM</p>
        </div>

        <div className="location__phone">
          <img src={phone} alt="" />
          <p>0987 789 789</p>
        </div>

        <div className="location__email">
          <img src={email} alt="" />
          <p>phult@gmail.com</p>
        </div>
      </div>

      <div className="footer__social-media">
        <div className="social-media__title">
          <span>Contact us</span>
        </div>
        <div className="social-media__form">
          <div className="form__row">
            <label htmlFor="">Email</label>
            <input type="text" name="" />
          </div>
          <div className="form__row">
            <label>Message</label>
            <textarea rows="5"></textarea>
          </div>
          <button className="form__btn">Send</button>
        </div>
      </div>
      <div>@Copyright 2020 ABC-DEF</div>
    </footer>
  );
};

export default Footer;
