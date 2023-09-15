import "./CleaningType.scss";
import { AppDispatch, RootState } from "../../redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCleaningType, setPrice } from "../../redux/PostBookingData";

function CleaningType() {
  const staticData = useSelector(
    (state: RootState) => state.staticData.cleaning_data.cleaning_types
  );

  const price = useSelector(
    (state: RootState) => state.postData.booking_data.price
  );

  const reduxDispatch = useDispatch<AppDispatch>();

  const [selectedType, setSelectedType] = useState<string>("");
  const [buttonColorClass, setButtonColorClass] = useState<string>("");

  useEffect(() => {
    setButtonColorClass("btn-selected");
  }, [selectedType]);

  const handleCleaningType = (type: string, item: any) => {
    if (type !== selectedType) {
      setSelectedType(type);
      setButtonColorClass("");
      reduxDispatch(setCleaningType(item));
      reduxDispatch(setPrice(price + item.rate));
    }
  };
  const cleaning_type = staticData.map((item: any) => {
    const className = item.type === selectedType ? buttonColorClass : "btn";
    return (
      <button
        className={className}
        onClick={() => handleCleaningType(item.type, item)}
      >
        {item.type}
      </button>
    );
  });

  return (
    <>
      <div className="heading-type">What type of cleaning?</div>
      <div className="btn-container">{cleaning_type}</div>
    </>
  );
}

export default CleaningType;
