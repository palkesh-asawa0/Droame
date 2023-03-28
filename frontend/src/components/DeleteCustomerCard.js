import { Box, Button, Typography, Alert, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../utils/axios";
import { useState } from "react";

export default function DeleteCustomerCard({
  dispatch,
  customerID,
  setCustomers,
  setOriginalCustomers,
}) {
  const [alert, setAlert] = useState(false);
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`/customer/${customerID}`)
      .then((res) => {
        setCustomers(res.data);
        setOriginalCustomers(res.data);
        dispatch({ type: "updateDeleteBackdrop", payload: false });
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
              Cannot delete the customer!
            </Alert>
          </Snackbar>
    <Box
      sx={{
        width: "25vw",
        backgroundColor: "#fff",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "text.primary",
          fontSize: 30,
          fontWeight: 700,
          pb: 4,
          textAlign: "center",
        }}
      >
        Are you sure you want to delete this customer?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ mr: 2 }}
            onClick={handleDelete}
          >
            Delete
          </Button>

          <Box sx={{ display: "flex" }}>
            <Button
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={() =>
                dispatch({ type: "updateDeleteBackdrop", payload: false })
              }
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
}
