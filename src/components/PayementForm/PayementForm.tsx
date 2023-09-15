import "./PayementForm.scss";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { checkRequiredData } from "../../util/CheckRequiredData";
import { useNavigate } from "react-router-dom";
import {
  setAddress,
  setEmail,
  setPhone,
  setPin,
} from "../../redux/PostBookingData";

function PayementForm() {
  const reduxDispatch = useDispatch<AppDispatch>();

  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const postData = useSelector(
    (state: RootState) => state.postData.booking_data
  );

  interface CardDetailsState {
    cardno: string;
    expirydt: string;
  }
  const [card, setCard] = useState<CardDetailsState>({
    cardno: "",
    expirydt: "",
  });

  const expriy_format = (value: string) => {
    const expdate = value;
    const expDateFormatter =
      expdate.replace(/\//g, "").substring(0, 2) +
      (expdate.length > 2 ? "/" : "") +
      expdate.replace(/\//g, "").substring(2, 4);

    return expDateFormatter;
  };

  const onChangeExp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard({
      ...card,
      expirydt: e.target.value,
    });
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    reduxDispatch(setEmail(e.target.value));
  };

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    reduxDispatch(setAddress(e.target.value));
  };
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    reduxDispatch(setPhone(e.target.value));
  };
  const onChangePin = (e: React.ChangeEvent<HTMLInputElement>) => {
    reduxDispatch(setPin(e.target.value));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (disabled === false) {
      navigate("/booking-confirmation");
    }
  };

  useEffect(() => {
    const isRequired = checkRequiredData(postData);
    isRequired ? setDisabled(false) : setDisabled(true);
  }, [postData]);

  return (
    <>
      <div className="carddetails-head">Credit Card Details</div>
      <form onSubmit={handleSubmit}>
        <div className="card-number">
          <input
            type="tel"
            className="cardetails-input"
            placeholder="Card number"
            minLength={16}
            maxLength={16}
            pattern="[0-9]{16}"
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            required
          />
        </div>

        <div className="other-card-detail">
          <input
            type="text"
            name="expiry-data"
            className="cardetails-input"
            placeholder="MM / YY"
            onChange={onChangeExp}
            value={expriy_format(card.expirydt)}
            required
          />
          <input
            type="password"
            className="cardetails-input"
            data-mask="000"
            placeholder="CVV"
            minLength={3}
            maxLength={3}
            pattern="[0-9][0-9][0-9]"
            onKeyPress={(event: any) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            required
          />
          <input
            type="text"
            className="cardetails-input"
            placeholder="Name on Card"
            required
          />
        </div>

        <div className="personal-head">Personal Details</div>
        <div className="personal-detail">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={onChangeEmail}
            required
          />
          <input
            type="number"
            placeholder="Phone Number"
            minLength={10}
            maxLength={10}
            onChange={onChangePhone}
            required
          />
        </div>
        <div className="personal-detail">
          <input
            type="text"
            name="address"
            className="address-input"
            placeholder="Your Full Address"
            onChange={onChangeAddress}
            required
          />
          <input
            type="number"
            className="pin-input"
            placeholder="Pin Code"
            minLength={6}
            maxLength={6}
            onChange={onChangePin}
            required
          />
        </div>
        <input
          type="checkbox"
          id="custom"
          name="custom"
          value="custom"
          required
        />
        <label htmlFor="custom"> Check this custom checkbox</label>
        <br />
        <input type="checkbox" id="terms" name="terms" value="terms" required />
        <label htmlFor="terms"> I read and agree to terms & conditions</label>
        <br />

        {disabled ? (
          <button className="btn">Complete booking via Secure Server</button>
        ) : (
          <button className="submit-btn">
            Complete booking via Secure Server
          </button>
        )}
      </form>
    </>
  );
}

export default PayementForm;
