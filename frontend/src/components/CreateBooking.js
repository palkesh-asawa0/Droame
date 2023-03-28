import { useReducer, useState } from "react";
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

const initialState = {
  droneShotID: "",
  locationID: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateShotID":
      return { ...state, droneShotID: action.payload };
    case "updateLocation":
      return { ...state, locationID: action.payload };
    default:
      throw new Error();
  }
}

export default function CreateBooking({
  setCreateBdo,
  setBookings,
  setOriginalBookings,
  customer,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [alert, setAlert] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post("/booking", {
        customer,
        droneShotID: state.droneShotID,
        locationID: state.locationID,
      })
      .then((res) => {
        setBookings(res.data);
        setOriginalBookings(res.data);
        setCreateBdo(false);
        dispatch({ type: "updateShotID", payload: "" });
        dispatch({ type: "updateLocation", payload: "" });
      })
      .catch((e) => {
        setAlert(true);
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
          Cannot connect to server!
        </Alert>
      </Snackbar>
      <Box
        sx={{
          minWidth: "40vw",
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
            Booking details
          </Typography>

          <IconButton
            sx={{ color: "primary.main", mb: 4 }}
            onClick={() => {
              setCreateBdo(false);
              dispatch({ type: "updateShotID", payload: "" });
              dispatch({ type: "updateLocation", payload: "" });
            }}
          >
            <CloseIcon sx={{ color: "error.main" }} />
          </IconButton>
        </Box>

        <TextField
          autoFocus
          name="location"
          placeholder="Enter location"
          sx={{ width: "100%", mb: 2 }}
          value={state.locationID}
          onChange={(e) =>
            dispatch({ type: "updateLocation", payload: e.target.value })
          }
        />

        <TextField
          name="droneShotID"
          placeholder="Enter drone-shot ID"
          sx={{ width: "100%", mb: 2 }}
          value={state.droneShotID}
          onChange={(e) =>
            dispatch({ type: "updateShotID", payload: e.target.value })
          }
        />

        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            color="info"
            onClick={handleCreate}
            disabled={state.locationID === "" || state.droneShotID === ""}
          >
            Create
          </Button>
        </Box>
      </Box>
    </>
  );
}
