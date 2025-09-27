import { createContext, Dispatch, SetStateAction } from "react";

interface User {
  _id: any;
  email: string;
  name: string;
  credits: number;
  weight?: string;
  height?: string;
}

export const UserContext = createContext<
  [User, Dispatch<SetStateAction<User>>]
>([
  {
    email: "",
    name: "",
    credits: 0,
    weight: "",
    _id: undefined,
  },
  () => {},
]);
