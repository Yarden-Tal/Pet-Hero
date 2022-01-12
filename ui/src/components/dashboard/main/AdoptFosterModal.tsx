import * as React from "react";
import { ChangeEvent, useContext, useState } from "react";
// MUI
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
// Interfaces
import { IPetProps } from "../../../interfaces/componentInterfaces";
import { IAuthContext } from "../../../interfaces/contextInterfaces";
// Context
import { AuthContext } from "../../../context/authContext";
// Service
import petsService from "../../../services/petsService";
import { adoptionStatusEnum } from "../../../enums";

const AdoptFosterModal = ({ pet }: IPetProps): JSX.Element => {
  const [radioBtnValue, setRadioBtnValue] = useState<adoptionStatusEnum>(
    adoptionStatusEnum.ADOPTED
  );
  const [open, setOpen] = useState<boolean>(false);
  const authContext = useContext<IAuthContext>(AuthContext);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setRadioBtnValue(adoptionStatusEnum.ADOPTED);
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRadioBtnValue(
      (e.target as HTMLInputElement).value as adoptionStatusEnum
    );
  };

  const handleClick = (): void => {
    const handleAdopt = async (radioBtnValue: string) => {
      const user = authContext.getUser()!;
      const result = await petsService.adoptOrFosterPet(
        pet._id as string,
        radioBtnValue!
      );
      console.log("RESULT::", result);
      // if result adopt = push to user.adopted
      // else push to user fostered
    };
    handleAdopt(radioBtnValue);
  };

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        <HelpOutlineRoundedIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <span style={{ color: "#608BD5", fontFamily: "Pushster" }}>
            {pet.name}
          </span>
          ,{" "}
          <span style={{ color: "grey", fontSize: "15px" }}>
            {pet.breed} {pet.type}
          </span>
        </DialogTitle>
        <DialogContent>
          <span>Weight: {pet.weight} lbs, </span>
          <span>Height: {pet.height} inches</span>
          <DialogContentText style={{ fontFamily: "Pushster" }}>
            <br />
            {pet.name}, {pet.bio}
          </DialogContentText>
        </DialogContent>
        <FormControl component="fieldset" sx={{ m: 2 }}>
          <FormLabel component="legend">
            Take a new friend home! Pick an option:
          </FormLabel>
          <RadioGroup
            aria-label="adoption-type"
            name="controlled-radio-buttons-group"
            value={radioBtnValue}
            onChange={handleChange}
          >
            <FormControlLabel
              value="Adopted"
              control={<Radio />}
              label="Adopt"
            />
            <FormControlLabel
              value="Fostered"
              control={<Radio />}
              label="Foster"
            />
          </RadioGroup>
        </FormControl>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            style={{ color: "green", fontWeight: "bold" }}
            onClick={handleClick}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdoptFosterModal;
