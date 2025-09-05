import { createContext, Dispatch, SetStateAction } from "react";

interface User {
  email: string;
  name: string;
  credits: number;
  weight?: string;
  height?: string;
}

export const UserContext = createContext<
  [User, Dispatch<SetStateAction<User>>]
>([{ email: "", name: "", credits: 0, weight: "" }, () => {}]);
