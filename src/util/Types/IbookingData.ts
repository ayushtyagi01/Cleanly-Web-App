import { CleaningType } from "./ICleaningType";
import { CleaningFrequency } from "./ICleaningFrequency";

export interface IBookingData {
  cleaning_types: CleaningType;
  cleaning_frequencies: CleaningFrequency;
  extras: string[];
  special_requirements: string;
  room_types: {
    bedroom: number;
    bathroom: number;
  };
  date: string;
  hours: number;
  time_slots: string;
  email: string;
  phone: string;
  address: string;
  pin: string;
  price: number;
}
