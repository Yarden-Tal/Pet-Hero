import * as React from "react";
// MUI
import Checkbox from "@mui/material/Checkbox";
// Interfaces
import { ICheckBoxProps } from "../../../../interfaces/componentInterfaces";

const HypoAllergCheckbox = ({
  checked,
  onCheck,
}: ICheckBoxProps): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheck(e.target.checked);
  };
  return (
    <span>
      <label htmlFor="hypoallergenic">Hypoallergenic</label>
      <Checkbox
        value="hypoallergenic"
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    </span>
  );
};

export default HypoAllergCheckbox;
