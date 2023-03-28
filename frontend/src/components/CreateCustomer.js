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
import validator from "validator";

const initialState = {
  name: "",
  email: "",
  phone: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateName":
      return { ...state, name: action.payload };
    case "updateEmail":
      return { ...state, email: action.payload };
    case "updatePhone":
      return { ...state, phone: action.payload };
    default:
      throw new Error();
  }
}

export default function CreateCustomer({
  setCreateBdo,
  setCustomers,
  setOriginalCustomers,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [alert, setAlert] = useState(false);

  const handleCreate = (e) => {
    console.log(state.email, state.name);
    e.preventDefault();
    axios
      .post("/customer", {
        name: state.name,
        email: state.email,
        contact: state.phone,
      })
      .then((res) => {
        setCustomers(res.data);
        setOriginalCustomers(res.data);
        setCreateBdo(false);
        dispatch({ type: "updateEmail", payload: "" });
        dispatch({ type: "updateName", payload: "" });
        dispatch({ type: "updatePhone", payload: "" });
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
            Customer details
          </Typography>

          <IconButton
            sx={{ color: "primary.main", mb: 4 }}
            onClick={() => {
              setCreateBdo(false);
              dispatch({ type: "updateEmail", payload: "" });
              dispatch({ type: "updateName", payload: "" });
            }}
          >
            <CloseIcon sx={{ color: "error.main" }} />
          </IconButton>
        </Box>

        <TextField
          autoFocus
          name="name"
          placeholder="Enter name"
          sx={{ width: "100%", mb: 2 }}
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "updateName", payload: e.target.value })
          }
        />

        <TextField
          name="email"
          placeholder="Enter email"
          sx={{ width: "100%", mb: 2 }}
          error={state.email !== "" && !validator.isEmail(state.email)}
          value={state.email}
          onChange={(e) =>
            dispatch({ type: "updateEmail", payload: e.target.value })
          }
        />

        <TextField
          name="phone"
          placeholder="Enter phone number"
          sx={{ width: "100%", mb: 2 }}
          value={state.phone}
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
            onClick={handleCreate}
            disabled={
              !validator.isEmail(state.email) ||
              state.phone?.length !== 10 ||
              state.name === ""
            }
          >
            Create
          </Button>
        </Box>
      </Box>
    </>
  );
}
