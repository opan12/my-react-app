import { useState } from "react";
import { MusteriContext } from "./MusteriContext";

export const MusteriProvider = ({ children }) => {
  const [musteriNo, setMusteriNo] = useState("");
  return (
    <MusteriContext.Provider value={{ musteriNo, setMusteriNo }}>
      {children}
    </MusteriContext.Provider>
  );
};
