import * as React from "react";
// MUI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// Enums
import { adoptionStatusEnum } from "../../../../enums";
// Interfaces
import { ISelectProps } from "../../../../interfaces/componentInterfaces";

const DEFAULT_VALUE: string = "";

const AdoptionStatusSelect = ({
  value,
  onSelect,
}: ISelectProps<adoptionStatusEnum>): JSX.Element => {
  const handleChange = (event: SelectChangeEvent): void => {
    onSelect(event.target.value as adoptionStatusEnum);
  };

  return (
    <span style={{ textAlign: "center", marginTop: "1em" }}>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value ?? DEFAULT_VALUE}
          onChange={handleChange}
          autoWidth
          label="Type"
          required={true}
        >
          <MenuItem value={"Available"}>Available</MenuItem>
          <MenuItem value={"Adopted"}>Adopted</MenuItem>
          <MenuItem value={"Fostered"}>Fostered</MenuItem>
        </Select>
      </FormControl>
    </span>
  );
};

export default AdoptionStatusSelect;
