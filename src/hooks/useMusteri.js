import { useContext } from "react";
import { MusteriContext } from "../context/MusteriContext";

const useMusteri = () => useContext(MusteriContext);
export default useMusteri;
