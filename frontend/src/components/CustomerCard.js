import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Backdrop,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useReducer, useEffect } from "react";
import EditCustomerCard from "./EditCustomerCard";
import DeleteCustomerCard from "./DeleteCustomerCard";

const initialState = {
  editBdo: false,
  deleteBdo: false,
  name: "",
  email: "",
  phone: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "updateEditBackdrop":
      return { ...state, editBdo: action.payload };
    case "updateDeleteBackdrop":
      return { ...state, deleteBdo: action.payload };
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

export default function CustomerCard({
  customer,
  setCustomers,
  setOriginalCustomers,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const handleBookings = (e) => {
    e.preventDefault();
    navigate(`/bookings/${customer._id}`, {
      state: customer,
    });
  };

  useEffect(() => {
    if (state.editBdo) {
      dispatch({ type: "updateName", payload: customer.name });
      dispatch({ type: "updateEmail", payload: customer.email });
      dispatch({ type: "updatePhone", payload: customer.contact });
    }
    // eslint-disable-next-line
  }, [state.editBdo]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 1, backdropFilter: "blur(5px)" }}
        open={state.editBdo}
      >
        <EditCustomerCard
          dispatch={dispatch}
          name={state.name}
          email={state.email}
          phone={state.phone}
          customerID={customer._id}
          setCustomers={setCustomers}
          setOriginalCustomers={setOriginalCustomers}
        />
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: 1, backdropFilter: "blur(5px)" }}
        open={state.deleteBdo}
      >
        <DeleteCustomerCard
          dispatch={dispatch}
          customerID={customer._id}
          setCustomers={setCustomers}
          setOriginalCustomers={setOriginalCustomers}
        />
      </Backdrop>
      <Card
        sx={{
          backgroundColor: "#99e4ee",
          display: "flex",
          justifyContent: "space-between",
          m: 1,
          mb: 2,
          boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.2)",
        }}
      >
        <CardContent>

          
        <Tooltip title="See details">
              <Typography sx={{ fontSize: 20, fontWeight: 700, textDecoration: 'underline', cursor:'pointer', color: 'blue' }} onClick={handleBookings} >
                  {customer.name} 
              </Typography>
          </Tooltip>    
          
          <Typography sx={{ fontSize: 15,mt:1 }}>
            <strong>CustomerID: </strong>{customer._id}
          </Typography>
          <Typography sx={{ fontSize: 13 }}>{customer.email}</Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Edit Customer" placement="top">
            <IconButton
              color="info"
              onClick={() =>
                dispatch({ type: "updateEditBackdrop", payload: true })
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Customer" placement="top">
            <IconButton
              color="error"
              onClick={() =>
                dispatch({ type: "updateDeleteBackdrop", payload: true })
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>         
        </CardActions>
      </Card>
    </>
  );
}
