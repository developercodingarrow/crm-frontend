"use client";
import React, { createContext, useEffect, useState } from "react";
export const FillterContext = createContext();

export default function FillterContextProvider({ children }) {
  const [visibleRows, setvisibleRows] = useState([]);
  const [isopenFillter, setisopenFillter] = useState(false);

  const handelCloseFillter = () => {
    setisopenFillter(false);
  };

  const handelopenFillter = () => {
    setisopenFillter(true);
  };
  return (
    <FillterContext.Provider
      value={{
        visibleRows,
        setvisibleRows,
        isopenFillter,
        setisopenFillter,
        handelCloseFillter,
        handelopenFillter,
      }}
    >
      {children}
    </FillterContext.Provider>
  );
}
