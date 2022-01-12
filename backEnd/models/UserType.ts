type UserType = {
  _id?: string;
  isAdmin?: boolean;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordVerify: string;
  phone: number;
  savedPets: string[];
  adoptedPets: string[];
  fosteredPets: string[];
};

export default UserType;
