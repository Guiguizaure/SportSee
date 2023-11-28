// DataSourceContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import { getUserInfo } from "../services/ApiCall";
import mockedUserData from "../data/userMainData.json";
import { UserMainData } from "../data/types";

interface DataSourceContextValue {
  dataSource: "mocked" | "api";
  setDataSource: (source: "mocked" | "api") => void;
  userData: UserMainData | null;
  fetchUserData: (userId: number) => Promise<void>;
  activeButton: "mocked" | "api" | null;
  setActiveButton: (button: "mocked" | "api" | null) => void;
}

const DataSourceContext = createContext<DataSourceContextValue | undefined>(
  undefined
);

export const useDataSource = () => {
  const context = useContext(DataSourceContext);
  if (context === undefined) {
    throw new Error("useDataSource must be used within a DataSourceProvider");
  }
  return context;
};

export const DataSourceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dataSource, setDataSource] = useState<"mocked" | "api">("mocked");
  const [userData, setUserData] = useState<UserMainData | null>(null);

  const fetchUserData = async (userId: number) => {
    if (dataSource === "api") {
      try {
        const apiData = await getUserInfo(userId);
        console.log("Fetched from API:", apiData);
        setUserData(apiData);
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setUserData(null);
      }
    } else {
      const user = mockedUserData.USER_MAIN_DATA.find(
        (user) => user.id === userId
      );
      console.log("Fetched from Mocked Data:", user);
      setUserData(user ?? null); // Set to null if user is not found
    }
  };

  const [activeButton, setActiveButton] = useState<"mocked" | "api" | null>(
    null
  );

  return (
    <DataSourceContext.Provider
      value={{
        dataSource,
        setDataSource,
        userData,
        fetchUserData,
        activeButton,
        setActiveButton,
      }}
    >
      {children}
    </DataSourceContext.Provider>
  );
};
