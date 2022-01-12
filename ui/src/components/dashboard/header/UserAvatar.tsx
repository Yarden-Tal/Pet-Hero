import * as React from "react";
// Context
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";
// MUI
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
// Interfaces
import { IAuthContext } from "../../../interfaces/contextInterfaces";

const UserAvatar = (): JSX.Element => {
  const authContext = useContext<IAuthContext>(AuthContext);
  // Get user name from context:
  const firstName: string = authContext.getUser()!.firstName;
  const lastName: string = authContext.getUser()!.lastName;
  // Capitalize the user name:
  const capFirstName: string =
    firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const capLastName: string =
    lastName.charAt(0).toUpperCase() + lastName.slice(1);

  return (
    <Stack direction="row" spacing={2}>
      <Tooltip title={`${capFirstName} ${capLastName}`}>
        <Avatar {...stringAvatar(`${capFirstName} ${capLastName}`)} />
      </Tooltip>
    </Stack>
  );
};

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: "#FEDA8B",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

export default UserAvatar;
