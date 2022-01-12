import * as React from "react";
import { forwardRef, ReactElement, Ref, useContext, useState } from "react";
// Context
import { AuthContext } from "../../../context/authContext";
// MUI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import LogoutIcon from "@mui/icons-material/Logout";
// Interfaces
import { IAuthContext } from "../../../interfaces/contextInterfaces";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LogoutAlert = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const authContext = useContext<IAuthContext>(AuthContext);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = (): void => {
    authContext.logout();
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ color: "white" }}
        onClick={handleClickOpen}
      >
        <LogoutIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogout}>Yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LogoutAlert;
