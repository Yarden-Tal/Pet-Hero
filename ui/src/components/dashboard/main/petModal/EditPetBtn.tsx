import * as React from "react";
import { useState } from "react";
import { Tooltip, Button } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PetModal from "./PetModal";
// Interfaces
import { IEditPetBtnProps } from "../../../../interfaces/componentInterfaces";

const EditPetBtn = ({ petId, onEdit }: IEditPetBtnProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Tooltip title="Edit a pet (Admin)">
        <Button onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}>
          <AdminPanelSettingsIcon style={{ color: "#1976D2" }} />
        </Button>
      </Tooltip>
      {isModalOpen && (
        <PetModal
          petId={petId}
          onClose={() => setIsModalOpen(false)}
          onAction={onEdit}
        />
      )}
    </>
  );
};

export default EditPetBtn;
