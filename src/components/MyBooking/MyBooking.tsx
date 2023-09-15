import { AppDispatch } from "../../redux/reduxStore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getBookingData } from "../../redux/GetBookingData";
import BookingDataGrid from "../BookingDataGrid/BookingDataGrid";
import Header from "../Header/Header";
import { Authenticator } from "@aws-amplify/ui-react";

function MyBooking() {
  const reduxDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function fetchData() {
      await reduxDispatch(getBookingData());
    }
    fetchData();
  }, [reduxDispatch]);

  return (
    <Authenticator signUpAttributes={["email", "name"]}>
      {({ signOut, user }) => (
        <>
          <Header signOut={signOut} />
          <BookingDataGrid />
        </>
      )}
    </Authenticator>
  );
}

export default MyBooking;
