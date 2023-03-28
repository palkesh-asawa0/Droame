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
import validator from "validator";

export default function EditCustomerCard({
  dispatch,
  email,
  name,
  phone,
  customerID,
  setCustomers,
  setOriginalCustomers,
}) {
  const [alert, setAlert] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`/customer`, {
        _id: customerID,
        name,
        email,
        contact: phone,
      })
      .then((res) => {
        setCustomers(res.data);
        setOriginalCustomers(res.data);
        dispatch({ type: "updateEditBackdrop", payload: false });
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
            Edit customer details
          </Typography>

          <IconButton
            sx={{ color: "primary.main", mb: 4 }}
            onClick={() =>
              dispatch({ type: "updateEditBackdrop", payload: false })
            }
          >
            <CloseIcon sx={{ color: "error.main" }} />
          </IconButton>
        </Box>
        <TextField
          disabled
          name="id"
          sx={{ width: "100%", mb: 2 }}
          value={customerID}
          variant="filled"
        />

        <TextField
          name="name"
          placeholder="Enter name"
          sx={{ width: "100%", mb: 2 }}
          value={name}
          onChange={(e) =>
            dispatch({ type: "updateName", payload: e.target.value })
          }
        />

        <TextField
          autoFocus
          name="email"
          placeholder="Enter email"
          sx={{ width: "100%", mb: 2 }}
          error={!validator.isEmail(email)}
          value={email}
          onChange={(e) =>
            dispatch({ type: "updateEmail", payload: e.target.value })
          }
        />

        <TextField
          name="phone"
          placeholder="Enter phone number"
          sx={{ width: "100%", mb: 2 }}
          value={phone}
          inputProps={{
            maxLength: 10,
          }}
          onChange={(e) =>
            dispatch({ type: "updatePhone", payload: e.target.value })
          }
        />

        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            color="info"
            onClick={handleUpdate}
            disabled={!validator.isEmail(email) || phone?.length !== 10}
          >
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}
