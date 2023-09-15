import "./CleaningFrequency.scss";
import { AppDispatch, RootState } from "../../redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCleaningFrequency } from "../../redux/PostBookingData";

function CleaningType() {
  const staticData = useSelector(
    (state: RootState) => state.staticData.cleaning_data.cleaning_frequencies
  );

  const reduxDispatch = useDispatch<AppDispatch>();

  const [selectedType, setSelectedType] = useState<string>("");
  const [buttonColorClass, setButtonColorClass] = useState<string>("");

  useEffect(() => {
    setButtonColorClass("btn-selected");
  }, [selectedType]);

  const handleCleaningFreq = (type: string, item: any) => {
    if (type !== selectedType) {
      setSelectedType(type);
      setButtonColorClass("");
      reduxDispatch(setCleaningFrequency(item));
    }
  };
  const cleaning_frequencies = staticData.map((item: any) => {
    const className = item.type === selectedType ? buttonColorClass : "btn";
    return (
      <button
        className={className}
        onClick={() => handleCleaningFreq(item.type, item)}
      >
        {item.type}
      </button>
    );
  });

  return (
    <>
      <div className="heading-frequency">
        How often would you like cleaning?
      </div>
      <div className="btn-container">{cleaning_frequencies}</div>
    </>
  );
}

export default CleaningType;
