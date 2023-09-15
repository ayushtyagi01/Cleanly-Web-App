export interface MyBookingType {
    user_id: string;
    booking_data: {
      date: string;
      special_requirements: string;
      hours: number;
      address: string;
      extras: any[];
      cleaning_frequencies: {
        type: string;
        id: number;
      };
      time_slots: string;
      room_types: {
        bedroom: number;
        bathroom: number;
      };
      pin: string;
      phone: string;
      price: number;
      cleaning_types: {
        type: string;
        rate: number;
        id: number;
      };
      email: string;
    };
    booking_id: string;
  }
  