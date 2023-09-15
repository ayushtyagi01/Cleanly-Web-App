import { IBookingData } from "./Types/IbookingData";

export const checkRequiredData = (data: IBookingData) => {
  if (
    data.cleaning_types.type === "" ||
    data.cleaning_frequencies.type === "" ||
    (data.room_types.bathroom === 0 && data.room_types.bedroom === 0) ||
    data.date === "" ||
    data.time_slots === ""
  ) {
    return false;
  }
  return true;
};
