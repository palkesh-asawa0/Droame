import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "../utils/axios";
import { useState } from "react";


export default function EditBooking({
  dispatch,
  locationID,
  droneShotID,
  customer,
  setOriginalBookings,
  setBookings,
  booking
}) {
  const [alert, setAlert] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`/booking`, {
        _id: booking._id,
        customer,
        droneShotID,
        locationID,
      })
      .then((res) => {
        setBookings(res.data);
        setOriginalBookings(res.data);
        dispatch({ type: "updateEditBackdrop", payload: false });
        dispatch({ type: "updateShotID", payload: '' });
        dispatch({ type: "updateLocation", payload: '' });
      })
      .catch((e) => {
        setAlert(true);
        console.log(e);
      });
  };

  return (
    <>
      <Snackbar
        open={alert}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setAlert(false)}
      >
        <Alert severity="error" variant="filled">
          Cannot edit the information!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          minWidth: "30vw",
          backgroundColor: "#fff",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "text.primary",
              fontSize: 30,
              fontWeight: 700,
              pb: 4,
            }}
          >
            Edit booking details
          </Typography>

          <IconButton
            sx={{ color: "primary.main", mb: 4 }}
            onClick={() => {
              dispatch({ type: "updateEditBackdrop", payload: false })
              dispatch({ type: "updateShotID", payload: '' });
              dispatch({ type: "updateLocation", payload: '' });
            }
              
            }
          >
            <CloseIcon sx={{ color: "error.main" }} />
          </IconButton>
        </Box>
        <TextField
          disabled
          name="id"
          sx={{ width: "100%", mb: 2 }}
          value={booking._id}
          variant="standard"
        />

        <TextField
          autoFocus
          name="location"
          placeholder="Enter Location"
          sx={{ width: "100%", mb: 2 }}
          value={locationID}
          onChange={(e) =>
            dispatch({ type: "updateLocation", payload: e.target.value })
          }
        />

        <TextField
          name="drone-shot-id"
          placeholder="Enter drone-shot ID"
          sx={{ width: "100%", mb: 2 }}
          value={droneShotID}
          onChange={(e) =>
            dispatch({ type: "updateShotID", payload: e.target.value })
          }
        />

        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            color="info"
            onClick={handleUpdate}
            disabled={droneShotID === "" || locationID === ''}
          >
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}
