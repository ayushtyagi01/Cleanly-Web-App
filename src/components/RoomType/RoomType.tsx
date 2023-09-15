import "./RoomType.scss";
import { AppDispatch, RootState } from "../../redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setBathRoom, setBedRoom, setPrice } from "../../redux/PostBookingData";

function CleaningType() {
  const staticData: any = useSelector(
    (state: RootState) => state.staticData.cleaning_data.room_types
  );
  const price = useSelector(
    (state: RootState) => state.postData.booking_data.price
  );

  const [roomCount, setroomCount] = useState<number[]>([0, 0]);
  const reduxDispatch = useDispatch<AppDispatch>();

  const handleAdd = (item: string, index: number) => {
    const newCount = [...roomCount];
    newCount[index] = newCount[index] + 1;
    setroomCount(newCount);
    index
      ? reduxDispatch(setBathRoom(newCount[index]))
      : reduxDispatch(setBedRoom(newCount[index]));
    reduxDispatch(setPrice(price + staticData[index].price));
  };

  const handleSub = (item: string, index: number) => {
    const newCount = [...roomCount];
    if (newCount[index] === 0) return;
    newCount[index] = newCount[index] - 1;
    setroomCount(newCount);
    index
      ? reduxDispatch(setBathRoom(newCount[index]))
      : reduxDispatch(setBedRoom(newCount[index]));
    reduxDispatch(setPrice(price - staticData[index].price));
  };
  const room_types = staticData.map((item: any, index: number) => {
    return (
      <>
        <div className="room-types">
          <div className="icon">
            <img src={item.image} alt="" />
          </div>
          <div className="type-name">{item.type}</div>
          <div className="add-room">
            <button
              className="btn-room"
              onClick={() => handleSub(item.type, index)}
            >
              -
            </button>
            <button className="btn-room">{roomCount[index]}</button>
            <button
              className="btn-room room-add"
              onClick={() => handleAdd(item.type, index)}
            >
              +
            </button>
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="room-type-container">{room_types}</div>
    </>
  );
}

export default CleaningType;
