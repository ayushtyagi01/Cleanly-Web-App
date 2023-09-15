import "./Extras.scss";
import { AppDispatch, RootState } from "../../redux/reduxStore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setExtras, setPrice } from "../../redux/PostBookingData";

function CleaningType() {
  const staticData = useSelector(
    (state: RootState) => state.staticData.cleaning_data.extras
  );

  const price = useSelector(
    (state: RootState) => state.postData.booking_data.price
  );

  const reduxDispatch = useDispatch<AppDispatch>();

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [buttonColorClass, setButtonColorClass] = useState<string>("");

  useEffect(() => {
    setButtonColorClass("extras-selected");
  }, [selectedExtras]);

  const handleExtras = (type: string, item: any) => {
    const newExtras = [...selectedExtras];
    if (!newExtras.includes(type)) {
      newExtras.push(type);
      setSelectedExtras(newExtras);
      reduxDispatch(setExtras(item));
      reduxDispatch(setPrice(price + Number(item.price)));
    }
  };
  const extras = staticData.map((item: any, index: number) => {
    const className = selectedExtras.includes(item.type)
      ? buttonColorClass
      : "";
    return (
      <>
        <div
          className={`extras ${className}`}
          onClick={() => handleExtras(item.type, item)}
        >
          <div className="icon" onClick={() => handleExtras(item.type, item)}>
            <img
              className={`img-${className}`}
              src={item.image}
              alt=""
              onClick={() => handleExtras(item.type, item)}
            />
          </div>
          <div
            className="type-name"
            onClick={() => handleExtras(item.type, item)}
          >
            {item.type}
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="headings">Need any extras?</div>
      <div className="extras-container">{extras}</div>
    </>
  );
}

export default CleaningType;
