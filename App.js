import * as React from "react";

import AuthContext, { AuthContextProvider } from "./context/AuthContext";
import Routes from "./Routes";
export default function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
