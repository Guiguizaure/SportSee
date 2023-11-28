// In ControlPage.tsx

import React from "react";
import { useDataSource } from "../../contexts/DataSourceContext";

const ControlPage: React.FC = () => {
  const { setDataSource, activeButton, setActiveButton } = useDataSource();

  const handleMockedData = () => {
    setDataSource("mocked");
    setActiveButton("mocked");
  };

  const handleApiData = () => {
    setDataSource("api");
    setActiveButton("api");
  };

  return (
    <div>
      <button
        onClick={handleMockedData}
        className={`px-4 py-2 border rounded mr-5 ${
          activeButton === "mocked" ? "bg-red" : "bg-grey"
        } text-white`}
      >
        Load Mocked Data
      </button>
      <button
        onClick={handleApiData}
        className={`px-4 py-2 border rounded ${
          activeButton === "api" ? "bg-red" : "bg-grey"
        } text-white`}
      >
        Load API Data
      </button>
    </div>
  );
};

export default ControlPage;
