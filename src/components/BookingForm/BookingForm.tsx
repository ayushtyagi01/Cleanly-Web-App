import PayementForm from "../PayementForm/PayementForm";
import "./BookingForm.scss";
import CleaningType from "../CleaningType/CleaningType";
import CleaningFrequency from "../CleaningFrequency/CleaningFrequency";
import RoomType from "../RoomType/RoomType";
import Extras from "../Extras/Extras";
import TimeSlots from "../TimeSlots/TimeSlots";
import { AppDispatch } from "../../redux/reduxStore";
import { useDispatch } from "react-redux";
import { setSpecialRequirements } from "../../redux/PostBookingData";
import { ChangeEvent } from "react";

function BookingForm() {
  const reduxDispatch = useDispatch<AppDispatch>();

  const handleSpecialRequirenments = (e: ChangeEvent<HTMLTextAreaElement>) => {
    reduxDispatch(setSpecialRequirements(e.target.value));
  };
  return (
    <>
      <div className="booking-form">
        <CleaningType />
        <CleaningFrequency />
        <div className="room-type-heading">Tell us about your home</div>
        <RoomType />
        <Extras />
        <div className="heading">Do you have any special requirements?</div>
        <textarea onChange={handleSpecialRequirenments} />
        <div className="room-type-heading">Choose hours and date</div>
        <TimeSlots />
        <PayementForm />
      </div>
    </>
  );
}

export default BookingForm;
