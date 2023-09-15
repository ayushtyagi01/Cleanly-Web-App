import { useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faCalendar,
  faClock,
  faRepeat,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { getDate } from "../../util/getDate";
import "./BookingSummary.scss";

function BookingSummary() {
  const bookingSummary = useSelector(
    (state: RootState) => state.postData.booking_data
  );

  const day = getDate(bookingSummary.date);

  return (
    <>
      <div className="booking-summary">
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
                {day} {bookingSummary.date} @ {bookingSummary.time_slots}
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
          {!(bookingSummary.address === "" && bookingSummary.pin === null) ? (
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
    </>
  );
}
export default BookingSummary;
