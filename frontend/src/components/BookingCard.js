import {
  IconButton,
  Paper,
  Typography,
  Box,
  Backdrop,
  Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useReducer, useEffect } from "react";
import DeleteBooking from "./DeleteBooking";
import EditBooking from "./EditBooking";

const initialState = {
  editBdo: false,
  deleteBdo: false,
  droneShotID: "",
  locationID: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateEditBackdrop":
      return { ...state, editBdo: action.payload };
    case "updateDeleteBackdrop":
      return { ...state, deleteBdo: action.payload };
    case "updateShotID":
      return { ...state, droneShotID: action.payload };
    case "updateLocation":
      return { ...state, locationID: action.payload };
    default:
      throw new Error();
  }
}


export default function BookingCard({
  booking,
  customer,
  setOriginalBookings,
  setBookings,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const date = new Date(booking.createdAt);


  useEffect(() => {
    if (state.editBdo) {
      dispatch({ type: "updateShotID", payload: booking.droneShotID });
      dispatch({ type: "updateLocation", payload: booking.locationID });
    }
    // eslint-disable-next-line
  }, [state.editBdo]);

  return (
    <>
      <Backdrop
        sx={{ color: "#99e4ee", zIndex: 1, backdropFilter: "blur(5px)" }}
        open={state.editBdo}
      >
        <EditBooking 
        dispatch={dispatch} 
        locationID={state.locationID} 
        droneShotID={state.droneShotID} 
        customer={customer}
        setOriginalBookings={setOriginalBookings}
        setBookings={setBookings}
        booking={booking}
        />
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: 1, backdropFilter: "blur(5px)" }}
        open={state.deleteBdo}
      >
        <DeleteBooking
          dispatch={dispatch}
          bookingID={booking._id}
          setBookings={setBookings}
          setOriginalBookings={setOriginalBookings}
        />
      </Backdrop>
      <Paper
        elevation={4}
        sx={{
          backgroundColor: "#99e4ee",
          m: 1,
          mb : 2,
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography>
            <strong>Booking ID:</strong> {booking._id}
          </Typography>
          <Typography>
            <strong>Location: </strong> {booking.locationID}
          </Typography>
          <Typography>
            <strong>Drone-shot ID: </strong> {booking.droneShotID}
          </Typography>
          <Typography>
            <strong>Created On: </strong> {date.toDateString()}
          </Typography>
        </Box>

        <Box>
        <Tooltip title="Edit Booking" placement="top">
          <IconButton
            color="info"
            onClick={() =>
              dispatch({ type: "updateEditBackdrop", payload: true })
            }
          >
            <EditIcon />
          </IconButton>
          </Tooltip>


          <Tooltip title="Delete Booking" placement="top"> 
          <IconButton
            color="error"
            onClick={() =>
              dispatch({ type: "updateDeleteBackdrop", payload: true })
            }
          >
            <DeleteIcon />
          </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </>
  );
}
