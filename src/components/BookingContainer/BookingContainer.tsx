import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategories } from "../../redux/StaticDataSlice";
import { AppDispatch } from "../../redux/reduxStore";
import BookingForm from "../BookingForm/BookingForm";
import BookingSummary from "../BookingSummary/BookingSummary";
import "./BookingContainer.scss";
import Headers from "../Headers";

function BookingContainer() {
  const reduxDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    reduxDispatch(fetchAllCategories());
  }, [reduxDispatch]);

  return (
    <>
      <Headers />
      <div className="conatainer-heading">Book your Cleaning</div>
      <div className="container-content">
        Its time to book our cleaning for your home or apartment
      </div>
      <div className="booking-containers">
        <div className="booking-forms">
          <div className="booking-heading">Cleaning Preference</div>
          <BookingForm />
        </div>
        <div className="booking-summary">
          <div className="summary-heading">Booking Summary</div>
          <BookingSummary />
        </div>
      </div>
    </>
  );
}

export default BookingContainer;
