import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RootState } from "../../redux/reduxStore";

const BookingDataGrid = () => {
  const bookings = useSelector(
    (state: RootState) => state.getData.booking_data
  );

  const columns: GridColDef[] = [
    { field: "booking_id", headerName: "Booking ID", flex: 1 },
    { field: "cleaning_type_name", headerName: "Cleaning Type", flex: 1 },
    { field: "total_cost", headerName: "Bill Amount ($)", flex: 1 },
    { field: "booking_date", headerName: "Scheduled On", flex: 1 },
    { field: "house_address", headerName: "Property Address", flex: 1 },
  ];

  const rows: any = Array.isArray(bookings)
    ? bookings.map((booking: any) => ({
        id: booking.booking_id,
        booking_id: booking.booking_id,
        cleaning_type_name:
          booking.booking_data.cleaning_types.type.toUpperCase(),
        total_cost: booking.booking_data.price,
        booking_date: `${booking.booking_data.date} @ ${booking.booking_data.time_slots}`,
        house_address: `${booking.booking_data.address}`,
      }))
    : "";

  return (
    <div className="booking-data-grid" style={{ height: 400, width: "100%" }}>
      {rows ? (
        <DataGrid  rows={rows} columns={columns} />
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default BookingDataGrid;
