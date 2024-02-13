import React, { createContext, useState } from "react";

export const ModelContext = createContext({});

export const ModelProvider = ({ children,initialModel }) => {
  const [model, setModel] = useState(initialModel);
  const modelData = model.model
  return (
    <ModelContext.Provider value={modelData}>
      {children}
    </ModelContext.Provider>
  );
};