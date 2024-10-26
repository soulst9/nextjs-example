import React, { createContext, useState, useContext, useEffect } from "react";

const EnterpriseContext = createContext();

export const EnterpriseProvider = ({ children }) => {
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);

  useEffect(() => {
    try {
      const storedEnterprise = localStorage.getItem("selectedEnterprise");
      if (storedEnterprise) {
        const parsedEnterprise = JSON.parse(storedEnterprise);
        setSelectedEnterprise(parsedEnterprise);
        console.log("Loaded enterprise from storage:", parsedEnterprise);
      } else {
        console.log("No enterprise found in storage");
      }
    } catch (error) {
      console.error("Error loading enterprise from storage:", error);
    }
  }, []);

  const updateSelectedEnterprise = (enterprise) => {
    console.log("Updating selected enterprise:", enterprise);
    setSelectedEnterprise(enterprise);
    try {
      localStorage.setItem("selectedEnterprise", JSON.stringify(enterprise));
    } catch (error) {
      console.error("Error saving enterprise to storage:", error);
    }
  };

  return (
    <EnterpriseContext.Provider
      value={{
        selectedEnterprise,
        setSelectedEnterprise: updateSelectedEnterprise,
      }}
    >
      {children}
    </EnterpriseContext.Provider>
  );
};

export const useEnterpriseContext = () => {
  const context = useContext(EnterpriseContext);
  if (!context) {
    throw new Error(
      "useEnterpriseContext must be used within an EnterpriseProvider"
    );
  }
  return context;
};
