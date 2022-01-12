import * as React from "react";
// MUI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// Interfaces
import { ISelectProps } from "../../../../interfaces/componentInterfaces";
// Enums
import { petTypesEnum } from "../../../../enums";

const DEFAULT_VALUE = "";

const DogOrCatSelect = ({
  onSelect,
  value,
}: ISelectProps<petTypesEnum>): JSX.Element => {
  const handleChange = (e: SelectChangeEvent): void => {
    const chosenType = e.target.value as petTypesEnum;
    onSelect(chosenType);
  };

  return (
    <span style={{ textAlign: "center", marginTop: "1em" }}>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value ?? DEFAULT_VALUE}
          onChange={handleChange}
          autoWidth
          label="Type"
          required={true}
        >
          <MenuItem value={petTypesEnum.CAT}>Cat</MenuItem>
          <MenuItem value={petTypesEnum.DOG}>Dog</MenuItem>
        </Select>
      </FormControl>
    </span>
  );
};

export default DogOrCatSelect;
