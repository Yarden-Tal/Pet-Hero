import { Dispatch, SetStateAction } from "react";
import PetType from "../types/petType";

export interface ILabelType {
  name: string;
  dbName: string;
  value: string;
  color: string;
  description?: string;
}

export interface ISearchParams {
  type: string;
  name: string;
  adoptionStatus: string;
  height: number[];
  weight: number[];
  search?: boolean;
}

export interface IPopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

export interface IBottomNavLinkConfig {
  label: string;
  icon: React.ReactNode;
}

export interface IAdvSearchProps {
  setShowClearBtn: Dispatch<SetStateAction<boolean>>;
  handleCloseModal?: () => void;
  petsList: PetType[];
  setPetsList: (petsList: PetType[]) => void;
  showAdvSearch: boolean;
}

export interface IDashboardProps {
  petsList: PetType[];
  setPetsList: (petsList: PetType[]) => void;
  setLoading: (isLoading: boolean) => void;
}

export interface ISearchBarProps {
  petsList: PetType[];
  setPetsList: (petsList: PetType[]) => void;
  showAdvSearch: boolean;
  handleChange: (e: any) => void;
  setShowClearBtn: Dispatch<SetStateAction<boolean>>;
}

export interface IPetProps extends IDashboardProps {
  pet: PetType;
  setLoading: (isLoading: boolean) => void;
}

export interface IUploadPicProps {
  pictureFile: File | undefined;
  setPictureFile: (file: File) => void;
}

export interface ICheckBoxProps {
  checked: boolean;
  onCheck: (checked: boolean) => void;
}

export interface ISelectProps<T> {
  onSelect: (selctionValue: T) => void;
  value?: T;
}

export interface IAddPetBtnProps {
  onAdd: (petData: Omit<PetType, "_id">) => void;
}

export interface IEditPetBtnProps {
  petId: string;
  onEdit: (petData: PetType) => void;
}

export interface IPetModalProps {
  petId?: string;
  editble?: boolean;
  onAction: (petData: any) => void;
  onClose: () => void;
}
