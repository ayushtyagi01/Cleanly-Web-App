import "./App.scss";
import BookingContainer from "./components/BookingContainer/BookingContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookingConfirmation from "./components/BookingConfirmation/BookingConfirmation";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "./aws-exports";
import MyBooking from "./components/MyBooking/MyBooking";
Auth.configure(awsconfig);

Amplify.configure({
  Auth: {
    region: awsconfig.REGION,
    userPoolId: awsconfig.USER_POOL_ID,
    userPoolWebClientId: awsconfig.USER_POOL_APP_CLIENT_ID,
  },
});

function App() {
  return (
    <>
      {/* <Login/> */}
      <Router>
        <Routes>
          <Route path="/" element={<BookingContainer />} />
          <Route
            path="/booking-confirmation"
            element={
              <Authenticator>
                <BookingConfirmation />
              </Authenticator>
            }
          />
          <Route
            path="/my-booking"
            element={
              <Authenticator>
                <MyBooking />
              </Authenticator>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
