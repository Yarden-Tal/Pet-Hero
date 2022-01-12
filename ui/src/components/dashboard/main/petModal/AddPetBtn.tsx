import * as React from "react";
import { useState } from "react";
import { Tooltip, Button } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PetModal from "./PetModal";
// Interfaces
import { IAddPetBtnProps } from "../../../../interfaces/componentInterfaces";

const AddPetBtn = ({ onAdd }: IAddPetBtnProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip title="Add a pet (Admin)">
        <Button onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}>
          <AdminPanelSettingsIcon style={{ color: "#fff" }} />
        </Button>
      </Tooltip>
      {isModalOpen && (
        <PetModal onClose={() => setIsModalOpen(false)} onAction={onAdd} />
      )}
    </>
  );
};

export default AddPetBtn;
