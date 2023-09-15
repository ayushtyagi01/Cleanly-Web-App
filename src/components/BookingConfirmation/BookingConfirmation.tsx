import React, { useEffect } from "react";
import "./BookingConfirmation.scss";
import { Authenticator } from "@aws-amplify/ui-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { Amplify, Auth } from "aws-amplify";
import axiosInstance from "../../util/axios_auth";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "../../aws-exports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationPin,
  faBroom,
  faCalendar,
  faClock,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import { checkRequiredData } from "../../util/CheckRequiredData";
Auth.configure(awsconfig);

Amplify.configure({
  Auth: {
    region: awsconfig.REGION,
    userPoolId: awsconfig.USER_POOL_ID,
    userPoolWebClientId: awsconfig.USER_POOL_APP_CLIENT_ID,
  },
});
export default function BookingConfirmation(): JSX.Element {
  const bookingSummary = useSelector(
    (state: RootState) => state.postData.booking_data
  );

  useEffect(() => {
    setTimeout(async () => {
      const bookingObject = {
        user_id: (await Auth.currentUserInfo()).attributes.sub,
        booking_data: bookingSummary,
      };
      if (checkRequiredData(bookingSummary)) {
        await axiosInstance.post("/booking", bookingObject);
      }
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingSummary]);

  return (
    <Authenticator signUpAttributes={["email", "name"]}>
      {({ signOut, user }) => (
        <>
          <Header signOut={signOut} />
          <div className="booking-summary">
            <div className="booking-summary-heading">Booking Summary</div>
            <div className="services-section">
              {!(bookingSummary.cleaning_types.type === "") ? (
                <div className="cleaning-type">
                  <div className="icon">
                    <FontAwesomeIcon icon={faBroom} />
                  </div>
                  <div className="cleaning-type-text">
                    {bookingSummary.cleaning_types.type} Cleaning
                  </div>
                </div>
              ) : (
                <></>
              )}
              {!(bookingSummary.date === "") ||
              !(bookingSummary.time_slots === "") ? (
                <div className="date-time">
                  <div className="icon">
                    <FontAwesomeIcon icon={faCalendar} />
                  </div>
                  <div className="date-time-text">
                    {bookingSummary.date} @ {bookingSummary.time_slots}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {!(bookingSummary.hours === 0) ? (
                <div className="number-of-hours">
                  <div className="icon">
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div className="hours-text">{bookingSummary.hours} hours</div>
                </div>
              ) : (
                <></>
              )}
              {!(bookingSummary.cleaning_frequencies.type === "") ? (
                <div className="frequency-section">
                  <div className="icon">
                    <FontAwesomeIcon icon={faRepeat} />
                  </div>
                  <div className="frequency-text">
                    {bookingSummary.cleaning_frequencies.type}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {!(
                bookingSummary.address === "" && bookingSummary.pin === null
              ) ? (
                <div className="address">
                  <div className="icon">
                    <FontAwesomeIcon icon={faLocationPin} />
                  </div>
                  <div className="address-text">
                    {bookingSummary.address} {bookingSummary.pin}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <hr className="horizontal-rule"></hr>
            <div className="cost-section">
              <div className="text-section">Total Cost</div>
              <div className="cost-section">$ {bookingSummary.price}</div>
            </div>
          </div>
          );
        </>
      )}
    </Authenticator>
  );
}
