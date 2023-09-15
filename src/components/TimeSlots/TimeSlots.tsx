import "./TimeSlots.scss";
import { AppDispatch, RootState } from "../../redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setDate, setHour, setTimeSlot } from "../../redux/PostBookingData";

function TimeSlots() {
  const reduxDispatch = useDispatch<AppDispatch>();

  const staticData = useSelector(
    (state: RootState) => state.staticData.cleaning_data.time_slots
  );

  const [selectedType, setSelectedType] = useState<string>("");
  const [buttonColorClass, setButtonColorClass] = useState<string>("");

  const [hourCount, sethourCount] = useState<number>(0);

  useEffect(() => {
    setButtonColorClass("btn-selected");
  }, [selectedType]);

  const handleSlot = (type: string, item: any) => {
    if (type !== selectedType) {
      setSelectedType(type);
      setButtonColorClass("");
      reduxDispatch(setTimeSlot(type));
    }
  };

  const handleAdd = () => {
    sethourCount(hourCount + 1);
    reduxDispatch(setHour(hourCount + 1));
  };

  const handleSub = () => {
    if (hourCount > 0) {
      sethourCount(hourCount - 1);
      reduxDispatch(setHour(hourCount - 1));
    }
  };

  const timesSlots = staticData.map((item: any) => {
    const className = item.time === selectedType ? buttonColorClass : "btn";

    return (
      <button className={className} onClick={() => handleSlot(item.time, item)}>
        {item.time}
      </button>
    );
  });

  const handleDate = (e: any) => {
    reduxDispatch(setDate(e.target.value));
  };

  return (
    <>
      <div className="slot-container">
        <div className="slot-item">
          <div className="heading">How many hours?</div>
          <div className="add-hour">
            <button className="btn-room" onClick={handleSub}>
              -
            </button>
            <button className="btn-room">{hourCount}</button>
            <button className="btn-room" onClick={handleAdd}>
              +
            </button>
          </div>
        </div>
        <div className="slot-item">
          <div className="heading">Choose a date?</div>
          <div className="add-hour">
            <input
              type="date"
              className="date"
              name="date"
              onChange={handleDate}
            />
          </div>
        </div>
      </div>
      <div className="heading">When do you like to start?</div>
      <div className="time-container">{timesSlots}</div>
    </>
  );
}

export default TimeSlots;
