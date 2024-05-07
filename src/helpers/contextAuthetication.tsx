import React from "react";
import { claim } from "../models/claim";

// Definir el contexto "ContextAuthetication" utilizando la función "createContext" de React
const ContextAuthetication = React.createContext<{
    claims: claim[];
    update(claims: claim[]): void;
}>({claims: [], update: () => {}});

export default ContextAuthetication;