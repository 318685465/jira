import { ReactNode } from "react";
import { AuthProvider } from "./auth-context";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  console.log(children);

  return <AuthProvider>{children}</AuthProvider>;
};
